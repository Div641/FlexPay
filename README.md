# FlexPay

FlexPay is a full-stack smartphone shopping application that allows users to browse products, select product variants, view available EMI plans, choose an EMI tenure, and proceed with the selected plan.

The application uses a React frontend, an Express.js REST API, and PostgreSQL for persistent product, variant, and EMI-plan data.

## Features

- Browse smartphones dynamically from the PostgreSQL database
- Search, filter, and sort products
- View individual products using unique slug-based URLs
- Select product variants such as RAM, storage, color, and finish
- View variant-specific MRP, selling price, and product images
- View available EMI plans for the selected variant
- Compare monthly payment, tenure, interest rate, and cashback
- Select an EMI plan with visual selection feedback
- Proceed with the selected EMI plan through a confirmation flow
- Responsive UI for desktop and mobile screens
- Loading, empty, and error states
- REST API backed by PostgreSQL

## Note:
Note on Product Images in the MVP

MVP Image Architecture: 
In the current MVP implementation, **iPhone models** are the **only products** with **multiple color-specific images** and multiple images per variant to demonstrate the complete product-gallery and color-selection experience. For the remaining smartphone models, the application uses one mock product image across their color variants. The underlying database architecture still supports multiple images through the image_urls field for every variant, so additional product- and color-specific images can be added without requiring any schema or architectural changes in future iterations.

## Tech Stack

**Frontend**
- React 19
- Vite
- React Router
- Tailwind CSS
- JavaScript / JSX

**Backend**
- Node.js
- Express.js
- PostgreSQL client: `pg`
- CORS
- dotenv
- Nodemon for development

**Database**
- PostgreSQL
- SQL schema and seed scripts
- JSONB for product variant image URLs

## Architecture

```
React Frontend
      |
      | REST API / JSON
      v
Express.js Backend
      |
      v
Service Layer
      |
      v
PostgreSQL
```

## Project Structure

```
FlexPay/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── product.controller.js
│   │   │   ├── variant.controller.js
│   │   │   └── emi.controller.js
│   │   ├── routes/
│   │   │   ├── product.routes.js
│   │   │   ├── variant.routes.js
│   │   │   └── emi.routes.js
│   │   ├── services/
│   │   │   ├── product.service.js
│   │   │   ├── variant.service.js
│   │   │   └── emi.service.js
│   │   └── db/
│   │       ├── schema.sql
│   │       └── seed.sql
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   │   └── images/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Setup and Run Instructions

### Prerequisites

Install the following before running the project:

- Node.js
- npm
- PostgreSQL
- `psql` command-line client

The project was developed using PostgreSQL 17.

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd FlexPay
```

### 2. Set up PostgreSQL

Create the application database:

```bash
createdb emi_products
```

Alternatively, from `psql`:

```sql
CREATE DATABASE emi_products;
```

Connect to the database:

```bash
psql -d emi_products
```

Run the schema:

```bash
psql -d emi_products -f Backend/src/db/schema.sql
```

Seed the database:

```bash
psql -d emi_products -f Backend/src/db/seed.sql
```

The seed data contains smartphone products, multiple variants, and multiple EMI plans.

### 3. Configure backend environment variables

Create:

```
Backend/.env
```

with the following values:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=emi_products
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
```

Replace the database username and password with the credentials for your local PostgreSQL installation.

> Do not commit `.env` to Git.

### 4. Install and run the backend

Open a terminal:

```bash
cd Backend
npm install
npm run dev
```

The backend will run at:

```
http://localhost:5000
```

Health check:

```
GET http://localhost:5000/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "FlexPay API is running"
}
```

### 5. Install and run the frontend

Open another terminal:

```bash
cd Frontend
npm install
npm run dev
```

Vite will display the local development URL, normally:

```
http://localhost:5173
```

Open that URL in the browser.

The frontend communicates with the backend through the REST API.

### 6. Production build

To create a production frontend build:

```bash
cd Frontend
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## API Documentation

Base URL:

```
http://localhost:5000/api
```

All APIs return JSON responses.

### 1. Health Check

**Endpoint**

```
GET /api/health
```

**Example**

```bash
curl http://localhost:5000/api/health
```

**Response**

```json
{
  "success": true,
  "message": "FlexPay API is running"
}
```

### 2. Get All Products

**Endpoint**

```
GET /api/products
```

Returns all products with their starting price and a representative product image.

**Example**

```bash
curl http://localhost:5000/api/products
```

**Example Response**

```json
{
  "success": true,
  "count": 18,
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
      "starting_price": "69900.00",
      "image_url": "/images/products/iphone-16-dt-set.webp"
    }
  ]
}
```

The response above is a representative example. The actual response contains all seeded products.

### 3. Get Product by Slug

**Endpoint**

```
GET /api/products/:slug
```

**Example**

```bash
curl http://localhost:5000/api/products/iphone-16
```

**Response**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "iPhone 16",
    "slug": "iphone-16",
    "description": "Apple iPhone 16 with advanced performance, camera system and long-lasting battery.",
    "brand": "Apple",
    "rating": "4.5",
    "sold_count": 120,
    "seller_name": "FlexPay Store",
    "shipping_info": "Dispatch within 48 hours and delivery in 3-7 working days."
  }
}
```

**Product Not Found**

For an unknown slug:

```
GET /api/products/unknown-product
```

Response:

```json
{
  "success": false,
  "message": "Product not found"
}
```

HTTP status:

```
404 Not Found
```

### 4. Get Product Variants

**Endpoint**

```
GET /api/products/:slug/variants
```

Returns all available variants for a product.

**Example**

```bash
curl http://localhost:5000/api/products/iphone-16/variants
```

**Example Response**

```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "id": 1,
      "product_id": 1,
      "ram": "8GB",
      "storage": "128GB",
      "color": "Black",
      "finish": "Matte",
      "mrp": "79900.00",
      "price": "69900.00",
      "image_urls": [
        "/images/products/iphone-16-black-1.webp",
        "/images/products/iphone-16-black-2.webp"
      ],
      "is_available": true
    }
  ]
}
```

The actual number of variants depends on the seeded product.

### 5. Get EMI Plans for a Variant

**Endpoint**

```
GET /api/variants/:variantId/emi-plans
```

Returns all available EMI plans for a selected product variant.

**Example**

```bash
curl http://localhost:5000/api/variants/1/emi-plans
```

**Example Response**

```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "id": 1,
      "variant_id": 1,
      "tenure_months": 3,
      "monthly_payment": "19783.33",
      "interest_rate": "0.00",
      "cashback_amount": "5000.00",
      "upfront_payment": "10485.00",
      "emi_start_date": "2026-10-04",
      "backing_type": "mutual_fund",
      "is_available": true
    }
  ]
}
```

The actual response contains all available EMI tenures for the selected variant.

## Database Schema

The database contains three main tables:

```
products
    |
    | 1 : N
    v
product_variants
    |
    | 1 : N
    v
emi_plans
```

### 1. `products`

Stores the base product information.

| Column | Type | Constraints |
|---|---|---|
| id | BIGSERIAL | Primary Key |
| name | VARCHAR(150) | NOT NULL |
| slug | VARCHAR(180) | NOT NULL, UNIQUE |
| description | TEXT | Nullable |
| brand | VARCHAR(100) | NOT NULL |
| rating | DECIMAL(2,1) | 0 to 5 |
| sold_count | INTEGER | >= 0 |
| seller_name | VARCHAR(150) | Nullable |
| shipping_info | TEXT | Nullable |
| created_at | TIMESTAMPTZ | NOT NULL |
| updated_at | TIMESTAMPTZ | NOT NULL |

- **Primary Key:** `products.id`
- **Unique Key:** `products.slug`

### 2. `product_variants`

Stores purchasable configurations of each product.

| Column | Type | Constraints |
|---|---|---|
| id | BIGSERIAL | Primary Key |
| product_id | BIGINT | Foreign Key |
| ram | VARCHAR(20) | Nullable |
| storage | VARCHAR(50) | Nullable |
| color | VARCHAR(50) | Nullable |
| finish | VARCHAR(50) | Nullable |
| mrp | DECIMAL(10,2) | >= 0 |
| price | DECIMAL(10,2) | >= 0 and <= MRP |
| image_urls | JSONB | Must be a JSON array |
| is_available | BOOLEAN | Default TRUE |
| created_at | TIMESTAMPTZ | NOT NULL |
| updated_at | TIMESTAMPTZ | NOT NULL |

- **Primary Key:** `product_variants.id`
- **Foreign Key:** `product_variants.product_id` → `products.id`

The foreign key uses:

```
ON DELETE CASCADE
```

**Unique Constraint**

A duplicate variant configuration is prevented using:

```
(product_id, ram, storage, color, finish)
```

### 3. `emi_plans`

Stores EMI options for each product variant.

| Column | Type | Constraints |
|---|---|---|
| id | BIGSERIAL | Primary Key |
| variant_id | BIGINT | Foreign Key |
| tenure_months | INTEGER | > 0 |
| monthly_payment | DECIMAL(10,2) | >= 0 |
| interest_rate | DECIMAL(5,2) | >= 0 |
| cashback_amount | DECIMAL(10,2) | >= 0 |
| upfront_payment | DECIMAL(10,2) | >= 0 |
| emi_start_date | DATE | Nullable |
| backing_type | VARCHAR(50) | Default `mutual_fund` |
| is_available | BOOLEAN | Default TRUE |
| created_at | TIMESTAMPTZ | NOT NULL |

- **Primary Key:** `emi_plans.id`
- **Foreign Key:** `emi_plans.variant_id` → `product_variants.id`

The foreign key uses:

```
ON DELETE CASCADE
```

**Unique Constraint**

Only one EMI plan for a particular tenure is allowed per variant:

```
(variant_id, tenure_months)
```

## Database Relationships

```
┌─────────────────────┐
│      products       │
├─────────────────────┤
│ PK id               │
│ name                │
│ slug                │
│ brand               │
│ description         │
│ rating              │
│ sold_count          │
│ seller_name         │
│ shipping_info       │
└──────────┬──────────┘
           │
           │ 1 : N
           │
┌──────────▼──────────┐
│  product_variants   │
├─────────────────────┤
│ PK id               │
│ FK product_id       │
│ ram                 │
│ storage             │
│ color               │
│ finish              │
│ mrp                 │
│ price               │
│ image_urls          │
│ is_available        │
└──────────┬──────────┘
           │
           │ 1 : N
           │
┌──────────▼──────────┐
│      emi_plans      │
├─────────────────────┤
│ PK id               │
│ FK variant_id       │
│ tenure_months       │
│ monthly_payment     │
│ interest_rate       │
│ cashback_amount     │
│ upfront_payment     │
│ emi_start_date      │
│ backing_type        │
│ is_available        │
└─────────────────────┘
```

## Seed Data

The included `seed.sql` provides development-level sample data for multiple smartphone brands and variants.

The current dataset contains:

- 18 products
- 93 product variants
- 558 EMI plans
- 6 EMI plans per variant

The EMI plans include multiple tenures such as:

```
3 months
6 months
12 months
24 months
36 months
48 months
```

The seed data also includes 0% and interest-bearing EMI options, cashback amounts, upfront payments, EMI start dates, and mutual-fund-backed EMI information.

## Application Flow

```
Products Page
     |
     | Select product
     v
Product Details
     |
     | Select variant
     v
Variant-specific details
     |
     | Fetch EMI plans
     v
EMI Plan Selection
     |
     | Select tenure
     v
Selected EMI Summary
     |
     | Proceed
     v
Confirmation
```

The frontend does not store the product catalogue or EMI plans as hardcoded application data. Product, variant, and EMI information is fetched from the Express API, which retrieves it from PostgreSQL.

## Useful Commands

**Backend**

```bash
cd Backend
npm install
npm run dev
```

**Frontend**

```bash
cd Frontend
npm install
npm run dev
```

**Frontend lint**

```bash
cd Frontend
npm run lint
```

**Frontend production build**

```bash
cd Frontend
npm run build
```

## Notes

- The backend must be running before using the frontend.
- PostgreSQL must be running and the `emi_products` database must be configured correctly.
- The frontend API configuration currently points to the local backend at `http://localhost:5000/api`.
- Product images are stored in the frontend's public assets and their paths are stored with the corresponding product variant data.