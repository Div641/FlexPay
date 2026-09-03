

-- ============================================
-- 1. PRODUCTS
-- ============================================

CREATE TABLE products (

    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    slug VARCHAR(180) NOT NULL UNIQUE,

    description TEXT,

    brand VARCHAR(100) NOT NULL,

    rating DECIMAL(2,1) NOT NULL DEFAULT 0,

    sold_count INTEGER NOT NULL DEFAULT 0,

    seller_name VARCHAR(150),

    shipping_info TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,


    -- Rating must be between 0 and 5
    CONSTRAINT chk_product_rating
        CHECK (rating >= 0 AND rating <= 5),

    -- Sold count cannot be negative
    CONSTRAINT chk_product_sold_count
        CHECK (sold_count >= 0)

);


-- ============================================
-- 2. PRODUCT VARIANTS
-- ============================================

CREATE TABLE product_variants (

    id BIGSERIAL PRIMARY KEY,

    product_id BIGINT NOT NULL,

    ram VARCHAR(20),

    storage VARCHAR(50),

    color VARCHAR(50),

    finish VARCHAR(50),

    mrp DECIMAL(10,2) NOT NULL,

    price DECIMAL(10,2) NOT NULL,

    image_urls JSONB NOT NULL,

    is_available BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,


    -- ========================================
    -- Foreign Key
    -- ========================================

    CONSTRAINT fk_product_variant_product

        FOREIGN KEY (product_id)

        REFERENCES products(id)

        ON DELETE CASCADE,


    -- ========================================
    -- Price Validation
    -- ========================================

    CONSTRAINT chk_variant_mrp_non_negative

        CHECK (mrp >= 0),


    CONSTRAINT chk_variant_price_non_negative

        CHECK (price >= 0),


    -- Selling price cannot exceed MRP

    CONSTRAINT chk_variant_price_lte_mrp

        CHECK (price <= mrp),


    -- ========================================
    -- Image Validation
    -- ========================================

    -- image_urls must contain a JSON array

    CONSTRAINT chk_variant_image_urls_array

        CHECK (jsonb_typeof(image_urls) = 'array'),


    -- ========================================
    -- Prevent Duplicate Variants
    -- ========================================

    CONSTRAINT uq_product_variant

        UNIQUE (product_id, ram, storage, color, finish)

);


-- ============================================
-- 3. EMI PLANS
-- ============================================

CREATE TABLE emi_plans (

    id BIGSERIAL PRIMARY KEY,

    variant_id BIGINT NOT NULL,

    tenure_months INTEGER NOT NULL,

    monthly_payment DECIMAL(10,2) NOT NULL,

    interest_rate DECIMAL(5,2) NOT NULL,

    cashback_amount DECIMAL(10,2) NOT NULL DEFAULT 0,

    upfront_payment DECIMAL(10,2) NOT NULL DEFAULT 0,

    emi_start_date DATE,

    backing_type VARCHAR(50) NOT NULL DEFAULT 'mutual_fund',

    is_available BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,


    -- ========================================
    -- Foreign Key
    -- ========================================

    CONSTRAINT fk_emi_plan_variant

        FOREIGN KEY (variant_id)

        REFERENCES product_variants(id)

        ON DELETE CASCADE,


    -- ========================================
    -- EMI Validation
    -- ========================================

    CONSTRAINT chk_emi_tenure_positive

        CHECK (tenure_months > 0),


    CONSTRAINT chk_emi_monthly_payment_non_negative

        CHECK (monthly_payment >= 0),


    CONSTRAINT chk_emi_interest_rate_non_negative

        CHECK (interest_rate >= 0),


    CONSTRAINT chk_emi_cashback_non_negative

        CHECK (cashback_amount >= 0),


    CONSTRAINT chk_emi_upfront_payment_non_negative

        CHECK (upfront_payment >= 0),


    -- ========================================
    -- One EMI plan per tenure per variant
    -- ========================================

    CONSTRAINT uq_variant_emi_tenure

        UNIQUE (variant_id, tenure_months)

);


-- ============================================
-- 4. INDEXES
-- ============================================

-- Product slug lookup
CREATE INDEX idx_products_slug
    ON products(slug);


-- Variant → Product lookup
CREATE INDEX idx_product_variants_product_id
    ON product_variants(product_id);


-- EMI → Variant lookup
CREATE INDEX idx_emi_plans_variant_id
    ON emi_plans(variant_id);


-- Optional: useful when filtering available variants
CREATE INDEX idx_product_variants_available
    ON product_variants(is_available);


-- Optional: useful when filtering available EMI plans
CREATE INDEX idx_emi_plans_available
    ON emi_plans(is_available);


-- ============================================
-- 5. AUTOMATIC updated_at HANDLING
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()

RETURNS TRIGGER AS $$

BEGIN

    NEW.updated_at = CURRENT_TIMESTAMP;

    RETURN NEW;

END;

$$ LANGUAGE plpgsql;


-- Products trigger
CREATE TRIGGER update_products_updated_at

BEFORE UPDATE ON products

FOR EACH ROW

EXECUTE FUNCTION update_updated_at_column();


-- Product variants trigger
CREATE TRIGGER update_product_variants_updated_at

BEFORE UPDATE ON product_variants

FOR EACH ROW

EXECUTE FUNCTION update_updated_at_column();