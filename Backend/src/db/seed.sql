-- ============================================
-- FLEXPAY SEED DATA
-- Database: emi_products
-- ============================================


-- ============================================
-- OPTIONAL: CLEAR EXISTING DATA
-- ============================================

TRUNCATE TABLE emi_plans,
               product_variants,
               products
RESTART IDENTITY CASCADE;


-- ============================================
-- 1. PRODUCTS
-- ============================================

INSERT INTO products
    (name, slug, description, brand, rating, sold_count, seller_name, shipping_info)
VALUES

(
    'iPhone 16',
    'iphone-16',
    'Apple iPhone 16 with advanced performance, camera system and long-lasting battery.',
    'Apple',
    4.5,
    120,
    'FlexPay Store',
    'Dispatch within 48 hours and delivery in 3-7 working days.'
),

(
    'iPhone 16 Pro',
    'iphone-16-pro',
    'Apple iPhone 16 Pro with a titanium design, powerful processor and professional camera system.',
    'Apple',
    4.6,
    95,
    'FlexPay Store',
    'Dispatch within 48 hours and delivery in 3-7 working days.'
),

(
    'iPhone 16 Pro Max',
    'iphone-16-pro-max',
    'Apple iPhone 16 Pro Max featuring a large display, titanium design and advanced camera system.',
    'Apple',
    4.7,
    110,
    'FlexPay Store',
    'Dispatch within 48 hours and delivery in 3-7 working days.'
),

(
    'iPhone 15',
    'iphone-15',
    'Apple iPhone 15 with a vibrant display, reliable performance and advanced camera system.',
    'Apple',
    4.5,
    150,
    'FlexPay Store',
    'Dispatch within 48 hours and delivery in 3-7 working days.'
),

(
    'Galaxy S25',
    'samsung-galaxy-s25',
    'Samsung Galaxy S25 with flagship performance, premium design and advanced camera capabilities.',
    'Samsung',
    4.5,
    105,
    'FlexPay Store',
    'Dispatch within 48 hours and delivery in 3-7 working days.'
),

(
    'Galaxy S25 Ultra',
    'samsung-galaxy-s25-ultra',
    'Samsung Galaxy S25 Ultra with a premium titanium design, advanced camera system and flagship performance.',
    'Samsung',
    4.7,
    85,
    'FlexPay Store',
    'Dispatch within 48 hours and delivery in 3-7 working days.'
),

(
    'Galaxy S24',
    'samsung-galaxy-s24',
    'Samsung Galaxy S24 offering flagship performance, compact design and an advanced camera system.',
    'Samsung',
    4.5,
    135,
    'FlexPay Store',
    'Dispatch within 48 hours and delivery in 3-7 working days.'
),

(
    'Galaxy A56',
    'samsung-galaxy-a56',
    'Samsung Galaxy A56 with a large display, capable performance and versatile cameras.',
    'Samsung',
    4.3,
    90,
    'FlexPay Store',
    'Dispatch within 48 hours and delivery in 3-7 working days.'
),

(
    'Pixel 9',
    'google-pixel-9',
    'Google Pixel 9 with Google Tensor performance and advanced computational photography.',
    'Google',
    4.5,
    100,
    'FlexPay Store',
    'Dispatch within 48 hours and delivery in 3-7 working days.'
),

(
    'Pixel 9 Pro',
    'google-pixel-9-pro',
    'Google Pixel 9 Pro with a premium camera system and powerful Google Tensor performance.',
    'Google',
    4.6,
    80,
    'FlexPay Store',
    'Dispatch within 48 hours and delivery in 3-7 working days.'
),

(
    'Pixel 9 Pro XL',
    'google-pixel-9-pro-xl',
    'Google Pixel 9 Pro XL with a large premium display and advanced camera capabilities.',
    'Google',
    4.6,
    75,
    'FlexPay Store',
    'Dispatch within 48 hours and delivery in 3-7 working days.'
),

(
    'Pixel 8',
    'google-pixel-8',
    'Google Pixel 8 with intelligent camera features and smooth everyday performance.',
    'Google',
    4.4,
    125,
    'FlexPay Store',
    'Dispatch within 48 hours and delivery in 3-7 working days.'
),

(
    'OnePlus 13',
    'oneplus-13',
    'OnePlus 13 with flagship performance, fast charging and a premium display.',
    'OnePlus',
    4.5,
    115,
    'FlexPay Store',
    'Dispatch within 48 hours and delivery in 3-7 working days.'
),

(
    'OnePlus 13R',
    'oneplus-13r',
    'OnePlus 13R offering powerful performance and a premium smartphone experience.',
    'OnePlus',
    4.4,
    95,
    'FlexPay Store',
    'Dispatch within 48 hours and delivery in 3-7 working days.'
),

(
    'Xiaomi 15',
    'xiaomi-15',
    'Xiaomi 15 with flagship hardware, premium display and advanced camera capabilities.',
    'Xiaomi',
    4.4,
    90,
    'FlexPay Store',
    'Dispatch within 48 hours and delivery in 3-7 working days.'
),

(
    'Xiaomi 15 Ultra',
    'xiaomi-15-ultra',
    'Xiaomi 15 Ultra with flagship performance and an advanced professional camera system.',
    'Xiaomi',
    4.6,
    70,
    'FlexPay Store',
    'Dispatch within 48 hours and delivery in 3-7 working days.'
),

(
    'Phone (3)',
    'nothing-phone-3',
    'Nothing Phone (3) with a distinctive design, smooth performance and modern smartphone experience.',
    'Nothing',
    4.3,
    85,
    'FlexPay Store',
    'Dispatch within 48 hours and delivery in 3-7 working days.'
),

(
    'Edge 60 Pro',
    'motorola-edge-60-pro',
    'Motorola Edge 60 Pro with a premium display, capable performance and versatile camera setup.',
    'Motorola',
    4.3,
    80,
    'FlexPay Store',
    'Dispatch within 48 hours and delivery in 3-7 working days.'
);


-- ============================================
-- 2. PRODUCT VARIANTS
-- ============================================

-- Each source row represents one RAM + storage
-- configuration.
--
-- Each configuration is expanded into 3 colors.
--
-- PostgreSQL automatically generates the
-- product_variants.id values.


INSERT INTO product_variants
(
    product_id,
    ram,
    storage,
    color,
    finish,
    mrp,
    price,
    image_urls
)

SELECT
    p.id,
    v.ram,
    v.storage,
    c.color,
    NULL,
    v.mrp,
    v.price,
    jsonb_build_array(v.image_path)

FROM
(
    VALUES

    -- Apple

    (
        'iphone-16',
        '8GB',
        '128GB',
        74900,
        69900,
        '/images/products/iphone-16-128.jpg',
        ARRAY['Black', 'White', 'Pink']
    ),

    (
        'iphone-16',
        '8GB',
        '256GB',
        84900,
        79900,
        '/images/products/iphone-16-256.jpg',
        ARRAY['Black', 'White', 'Pink']
    ),

    (
        'iphone-16-pro',
        '8GB',
        '128GB',
        129900,
        119900,
        '/images/products/iphone-16-pro-128.jpg',
        ARRAY['Black Titanium', 'White Titanium', 'Desert Titanium']
    ),

    (
        'iphone-16-pro',
        '8GB',
        '256GB',
        139900,
        129900,
        '/images/products/iphone-16-pro-256.jpg',
        ARRAY['Black Titanium', 'White Titanium', 'Desert Titanium']
    ),

    (
        'iphone-16-pro-max',
        '8GB',
        '256GB',
        154900,
        144900,
        '/images/products/iphone-16-pro-max-256.jpg',
        ARRAY['Black Titanium', 'White Titanium', 'Desert Titanium']
    ),

    (
        'iphone-15',
        '6GB',
        '128GB',
        69900,
        59900,
        '/images/products/iphone-15-128.jpg',
        ARRAY['Black', 'Blue', 'Green']
    ),

    (
        'iphone-15',
        '6GB',
        '256GB',
        79900,
        69900,
        '/images/products/iphone-15-256.jpg',
        ARRAY['Black', 'Blue', 'Green']
    ),


    -- Samsung

    (
        'samsung-galaxy-s25',
        '12GB',
        '128GB',
        79999,
        74999,
        '/images/products/galaxy-s25-128.jpg',
        ARRAY['Navy', 'Silver', 'Blue']
    ),

    (
        'samsung-galaxy-s25',
        '12GB',
        '256GB',
        85999,
        80999,
        '/images/products/galaxy-s25-256.jpg',
        ARRAY['Navy', 'Silver', 'Blue']
    ),

    (
        'samsung-galaxy-s25-ultra',
        '12GB',
        '256GB',
        139999,
        129999,
        '/images/products/galaxy-s25-ultra-256.jpg',
        ARRAY['Titanium Black', 'Titanium Gray', 'Titanium Silver']
    ),

    (
        'samsung-galaxy-s25-ultra',
        '12GB',
        '512GB',
        151999,
        141999,
        '/images/products/galaxy-s25-ultra-512.jpg',
        ARRAY['Titanium Black', 'Titanium Gray', 'Titanium Silver']
    ),

    (
        'samsung-galaxy-s24',
        '8GB',
        '128GB',
        69999,
        64999,
        '/images/products/galaxy-s24-128.jpg',
        ARRAY['Black', 'Violet', 'Yellow']
    ),

    (
        'samsung-galaxy-s24',
        '8GB',
        '256GB',
        75999,
        70999,
        '/images/products/galaxy-s24-256.jpg',
        ARRAY['Black', 'Violet', 'Yellow']
    ),

    (
        'samsung-galaxy-a56',
        '8GB',
        '128GB',
        44999,
        41999,
        '/images/products/galaxy-a56-128.jpg',
        ARRAY['Graphite', 'Light Gray', 'Olive']
    ),

    (
        'samsung-galaxy-a56',
        '8GB',
        '256GB',
        47999,
        44999,
        '/images/products/galaxy-a56-256.jpg',
        ARRAY['Graphite', 'Light Gray', 'Olive']
    ),


    -- Google

    (
        'google-pixel-9',
        '12GB',
        '128GB',
        84999,
        79999,
        '/images/products/pixel-9-128.jpg',
        ARRAY['Obsidian', 'Porcelain', 'Wintergreen']
    ),

    (
        'google-pixel-9',
        '12GB',
        '256GB',
        94999,
        89999,
        '/images/products/pixel-9-256.jpg',
        ARRAY['Obsidian', 'Porcelain', 'Wintergreen']
    ),

    (
        'google-pixel-9-pro',
        '16GB',
        '256GB',
        114999,
        109999,
        '/images/products/pixel-9-pro-256.jpg',
        ARRAY['Obsidian', 'Porcelain', 'Hazel']
    ),

    (
        'google-pixel-9-pro-xl',
        '16GB',
        '256GB',
        129999,
        124999,
        '/images/products/pixel-9-pro-xl-256.jpg',
        ARRAY['Obsidian', 'Porcelain', 'Hazel']
    ),

    (
        'google-pixel-8',
        '8GB',
        '128GB',
        74999,
        69999,
        '/images/products/pixel-8-128.jpg',
        ARRAY['Obsidian', 'Hazel', 'Rose']
    ),

    (
        'google-pixel-8',
        '8GB',
        '256GB',
        84999,
        79999,
        '/images/products/pixel-8-256.jpg',
        ARRAY['Obsidian', 'Hazel', 'Rose']
    ),


    -- OnePlus

    (
        'oneplus-13',
        '12GB',
        '256GB',
        74999,
        69999,
        '/images/products/oneplus-13-256.jpg',
        ARRAY['Black Eclipse', 'Midnight Ocean', 'White']
    ),

    (
        'oneplus-13',
        '16GB',
        '512GB',
        81999,
        76999,
        '/images/products/oneplus-13-512.jpg',
        ARRAY['Black Eclipse', 'Midnight Ocean', 'White']
    ),

    (
        'oneplus-13r',
        '12GB',
        '256GB',
        47999,
        42999,
        '/images/products/oneplus-13r-256.jpg',
        ARRAY['Black', 'Blue', 'Gray']
    ),


    -- Xiaomi

    (
        'xiaomi-15',
        '12GB',
        '512GB',
        69999,
        64999,
        '/images/products/xiaomi-15-512.jpg',
        ARRAY['Black', 'White', 'Green']
    ),

    (
        'xiaomi-15-ultra',
        '16GB',
        '512GB',
        114999,
        109999,
        '/images/products/xiaomi-15-ultra-512.jpg',
        ARRAY['Black', 'White', 'Silver']
    ),


    -- Nothing

    (
        'nothing-phone-3',
        '12GB',
        '256GB',
        84999,
        79999,
        '/images/products/nothing-phone-3-256.jpg',
        ARRAY['Black', 'White', 'Gray']
    ),

    (
        'nothing-phone-3',
        '16GB',
        '512GB',
        94999,
        89999,
        '/images/products/nothing-phone-3-512.jpg',
        ARRAY['Black', 'White', 'Gray']
    ),


    -- Motorola

    (
        'motorola-edge-60-pro',
        '8GB',
        '256GB',
        34999,
        29999,
        '/images/products/edge-60-pro-256.jpg',
        ARRAY['Black', 'Blue', 'Lavender']
    ),

    (
        'motorola-edge-60-pro',
        '12GB',
        '256GB',
        36999,
        31999,
        '/images/products/edge-60-pro-12gb-256.jpg',
        ARRAY['Black', 'Blue', 'Lavender']
    ),

    (
        'motorola-edge-60-pro',
        '12GB',
        '512GB',
        38999,
        33999,
        '/images/products/edge-60-pro-512.jpg',
        ARRAY['Black', 'Blue', 'Lavender']
    )

) AS v(
    slug,
    ram,
    storage,
    mrp,
    price,
    image_path,
    colors
)

JOIN products p
    ON p.slug = v.slug

CROSS JOIN LATERAL UNNEST(v.colors) AS c(color);


-- ============================================
-- 3. EMI PLANS
-- ============================================

INSERT INTO emi_plans
(
    variant_id,
    tenure_months,
    monthly_payment,
    interest_rate,
    cashback_amount,
    upfront_payment,
    emi_start_date,
    backing_type
)

SELECT
    pv.id,

    emi.tenure_months,

    ROUND(
        CASE
            WHEN emi.interest_rate = 0 THEN
                (pv.price * 0.85) / emi.tenure_months

            ELSE
                (pv.price * 0.85)
                *
                (
                    (emi.interest_rate / 100 / 12)
                    *
                    POWER(
                        1 + (emi.interest_rate / 100 / 12),
                        emi.tenure_months
                    )
                )
                /
                (
                    POWER(
                        1 + (emi.interest_rate / 100 / 12),
                        emi.tenure_months
                    ) - 1
                )
        END,
        2
    ) AS monthly_payment,

    emi.interest_rate,

    CASE
        WHEN pv.price >= 60000 THEN 7500
        WHEN pv.price >= 40000 THEN 5000
        ELSE 3000
    END AS cashback_amount,

    ROUND(pv.price * 0.15, 2) AS upfront_payment,

    CURRENT_DATE + 30 AS emi_start_date,

    'mutual_fund' AS backing_type

FROM product_variants pv

CROSS JOIN
(
    VALUES
        (3,  0.00),
        (6,  0.00),
        (12, 0.00),
        (24, 0.00),
        (36, 10.50),
        (48, 10.50)
) AS emi(tenure_months, interest_rate)

WHERE pv.is_available = TRUE;

-- ============================================
-- 4. VERIFICATION
-- ============================================

SELECT
    'Products' AS entity,
    COUNT(*) AS count
FROM products

UNION ALL

SELECT
    'Product Variants',
    COUNT(*)
FROM product_variants

UNION ALL

SELECT
    'EMI Plans',
    COUNT(*)
FROM emi_plans;