# FlexPay

FlexPay is a full-stack e-commerce app that lets users browse phones, pick a variant (RAM/storage/color/finish), and choose a monthly EMI (installment) payment plan for it. The backend is an Express + PostgreSQL REST API; the frontend is a React (Vite) app that consumes it.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup and Run Instructions](#setup-and-run-instructions)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)

## Tech Stack

**Backend**
- Node.js (ES Modules) + [Express 5](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/) via the `pg` driver (connection pooling)
- `cors`, `dotenv`
- `nodemon` for local dev

**Frontend**
- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) for product routes (e.g. `/products/iphone-16-pro`)
- [Tailwind CSS 4](https://tailwindcss.com/) for styling
- `fetch`-based API service layer (`src/services/api.js`)

**Database:** PostgreSQL (3 tables: `products`, `product_variants`, `emi_plans`)

## Project Structure

```
FlexPay/
├── Backend/
│   ├── server.js                 # Entry point, starts Express server
│   ├── src/
│   │   ├── app.js                # Express app + route mounting
│   │   ├── config/db.js          # PostgreSQL connection pool
│   │   ├── routes/                # Route definitions
│   │   ├── controllers/           # Request/response handling
│   │   ├── services/              # DB queries
│   │   └── db/
│   │       ├── schema.sql        # Table definitions
│   │       └── seed.sql          # Sample data
│   └── .env                      # DB + server config (not committed)
└── Frontend/
    ├── src/
    │   ├── pages/                 # ProductsPage, ProductDetailsPage
    │   ├── components/            # ProductCard, VariantSelector, EmiPlanCard, etc.
    │   └── services/api.js        # Calls to the backend API
    └── vite.config.js
```

## Setup and Run Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL running locally (or accessible remotely)

### 1. Clone and install dependencies

```bash
git clone <repo-url>
cd FlexPay

cd Backend && npm install
cd ../Frontend && npm install
```

### 2. Set up the database

Create a database (name it whatever you like, e.g. `emi_products`):

```bash
createdb emi_products
```

Run the schema, then the seed data:

```bash
psql -d emi_products -f Backend/src/db/schema.sql
psql -d emi_products -f Backend/src/db/seed.sql
```

This creates the `products`, `product_variants`, and `emi_plans` tables and populates them with sample phones (iPhone 16 series, Galaxy S25, etc.), their variants, and EMI plans.

### 3. Configure environment variables

In `Backend/`, create a `.env` file (already gitignored) with:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=emi_products
DB_USER=<your_postgres_user>
DB_PASSWORD=<your_postgres_password>
```

### 4. Run the backend

```bash
cd Backend
npm run dev
```

The API starts on `http://localhost:5000`. Verify it's up:

```bash
curl http://localhost:5000/api/health
```

### 5. Run the frontend

```bash
cd Frontend
npm run dev
```

The app runs on Vite's default dev port (`http://localhost:5173`) and talks to the API at `http://localhost:5000/api` (hardcoded in `src/services/api.js` — update `API_BASE_URL` there if your backend runs elsewhere).

### 6. Build for production (frontend)

```bash
cd Frontend
npm run build   # outputs to Frontend/dist
npm run preview # preview the production build locally
```

## Database Schema

Three tables, in a `products → product_variants → emi_plans` hierarchy, each cascading on delete.

### `products`

| Column          | Type          | Notes                              |
|-----------------|---------------|-------------------------------------|
| id              | BIGSERIAL PK  |                                      |
| name            | VARCHAR(150)  | NOT NULL                            |
| slug            | VARCHAR(180)  | NOT NULL, UNIQUE — used in URLs     |
| description     | TEXT          |                                      |
| brand           | VARCHAR(100)  | NOT NULL                            |
| rating          | DECIMAL(2,1)  | 0–5, checked by constraint          |
| sold_count      | INTEGER       | ≥ 0                                  |
| seller_name     | VARCHAR(150)  |                                      |
| shipping_info   | TEXT          |                                      |
| created_at / updated_at | TIMESTAMPTZ | auto-managed via trigger    |

### `product_variants`

| Column        | Type          | Notes                                             |
|---------------|---------------|-----------------------------------------------------|
| id            | BIGSERIAL PK  |                                                       |
| product_id    | BIGINT FK     | → `products.id`, `ON DELETE CASCADE`                |
| ram           | VARCHAR(20)   |                                                       |
| storage       | VARCHAR(50)   |                                                       |
| color         | VARCHAR(50)   |                                                       |
| finish        | VARCHAR(50)   |                                                       |
| mrp           | DECIMAL(10,2) | ≥ 0                                                   |
| price         | DECIMAL(10,2) | ≥ 0, and `price <= mrp` (checked)                    |
| image_urls    | JSONB         | must be a JSON array (checked)                       |
| is_available  | BOOLEAN       | default TRUE                                          |
| created_at / updated_at | TIMESTAMPTZ | auto-managed via trigger                    |

`UNIQUE (product_id, ram, storage, color, finish)` prevents duplicate variants.

### `emi_plans`

| Column           | Type          | Notes                                       |
|------------------|---------------|-----------------------------------------------|
| id               | BIGSERIAL PK  |                                                 |
| variant_id       | BIGINT FK     | → `product_variants.id`, `ON DELETE CASCADE`  |
| tenure_months    | INTEGER       | > 0                                             |
| monthly_payment  | DECIMAL(10,2) | ≥ 0                                             |
| interest_rate    | DECIMAL(5,2)  | ≥ 0                                             |
| cashback_amount  | DECIMAL(10,2) | default 0, ≥ 0                                  |
| upfront_payment  | DECIMAL(10,2) | default 0, ≥ 0                                  |
| emi_start_date   | DATE          |                                                  |
| backing_type     | VARCHAR(50)   | default `'mutual_fund'`                         |
| is_available     | BOOLEAN       | default TRUE                                    |
| created_at       | TIMESTAMPTZ   |                                                  |

`UNIQUE (variant_id, tenure_months)` — one plan per tenure length per variant.

**Indexes:** on `products.slug`, `product_variants.product_id`, `product_variants.is_available`, `emi_plans.variant_id`, and `emi_plans.is_available`, for fast lookups on the columns the API filters/joins on.

## API Endpoints

Base URL: `http://localhost:5000/api`

All responses follow a consistent shape:

```json
{ "success": true, "count": 2, "data": [...] }
```

or, on error:

```json
{ "success": false, "message": "..." }
```

---

### `GET /api/health`

Health check.

**Example response — `200 OK`**
```json
{
  "success": true,
  "message": "FlexPay API is running"
}
```

---

### `GET /api/products`

List all products, along with each product's starting price and cover image (derived from its available variants).

**Example response — `200 OK`**
```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "id": 1,
      "name": "iPhone 16",
      "slug": "iphone-16",
      "description": "Apple iPhone 16 with advanced performance, camera system and long-lasting battery.",
      "brand": "Apple",
      "rating": "4.5",
      "sold_count": 120,
      "seller_name": "FlexPay Store",
      "shipping_info": "Dispatch within 48 hours and delivery in 3-7 working days.",
      "starting_price": "64999.00",
      "image_url": "/images/products/iphone16-black-set.jpg"
    }
  ]
}
```

---

### `GET /api/products/:slug`

Get a single product by its slug.

**Example response — `200 OK`** (`GET /api/products/iphone-16-pro`)
```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "iPhone 16 Pro",
    "slug": "iphone-16-pro",
    "description": "Apple iPhone 16 Pro with a titanium design, powerful processor and professional camera system.",
    "brand": "Apple",
    "rating": "4.6",
    "sold_count": 95,
    "seller_name": "FlexPay Store",
    "shipping_info": "Dispatch within 48 hours and delivery in 3-7 working days."
  }
}
```

**Example response — `404 Not Found`** (unknown slug)
```json
{
  "success": false,
  "message": "Product not found"
}
```

---

### `GET /api/products/:slug/variants`

Get all available variants for a product.

**Example response — `200 OK`** (`GET /api/products/iphone-16-pro/variants`)
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 5,
      "product_id": 2,
      "ram": "8GB",
      "storage": "256GB",
      "color": "Black Titanium",
      "finish": "Matte",
      "mrp": "134900.00",
      "price": "129900.00",
      "image_urls": [
        "/images/products/iphone-16-pro-bt-set.webp",
        "/images/products/iphone-16-pro-bt-back.webp",
        "/images/products/iphone-16-pro-bt-side.webp"
      ],
      "is_available": true
    }
  ]
}
```

*Note: if the product's slug doesn't exist, this currently returns `200` with an empty `data` array rather than a `404`.*

---

### `GET /api/variants/:variantId/emi-plans`

Get all available EMI plans for a given variant.

**Example response — `200 OK`** (`GET /api/variants/5/emi-plans`)
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 14,
      "variant_id": 5,
      "tenure_months": 3,
      "monthly_payment": "44300.00",
      "interest_rate": "12.00",
      "cashback_amount": "500.00",
      "upfront_payment": "0.00",
      "emi_start_date": "2026-10-01",
      "backing_type": "mutual_fund",
      "is_available": true
    },
    {
      "id": 15,
      "variant_id": 5,
      "tenure_months": 6,
      "monthly_payment": "22700.00",
      "interest_rate": "13.50",
      "cashback_amount": "750.00",
      "upfront_payment": "0.00",
      "emi_start_date": "2026-10-01",
      "backing_type": "mutual_fund",
      "is_available": true
    }
  ]
}
```

**Example response — `400 Bad Request`** (non-numeric or non-positive `variantId`)
```json
{
  "success": false,
  "message": "Invalid variant ID"
}
```

**Example response — `404 Not Found`** (variant doesn't exist)
```json
{
  "success": false,
  "message": "Variant not found"
}
```

---

All unhandled server errors return `500` with `{ "success": false, "message": "Failed to fetch ..." }` and are logged server-side; they don't crash the process.
