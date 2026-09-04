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


WITH color_images (slug, color, image_urls) AS (
    VALUES
    -- Apple iPhone 16
    ('iphone-16', 'Black', jsonb_build_array('/images/products/iphone16-black-side.jpg', '/images/products/iphone16-black-back.jpg', '/images/products/iphone16-black-set.jpg')),
    ('iphone-16', 'White', jsonb_build_array('/images/products/iphone16-white-side.jpg', '/images/products/iphone16-white-back.jpg', '/images/products/iphone16-white-set.jpg')),
    ('iphone-16', 'Pink', jsonb_build_array('/images/products/iphone16-pink-side.webp', '/images/products/iphone16-pink-back.webp', '/images/products/iphone16-pink-set.webp')),

    -- Apple iPhone 16 Pro
    ('iphone-16-pro', 'Black Titanium', jsonb_build_array('/images/products/iphone-16-pro-bt-back.webp', '/images/products/iphone-16-pro-bt-side.webp')),
    ('iphone-16-pro', 'White Titanium', jsonb_build_array('/images/products/iphone-16-pro-wt-back.webp', '/images/products/iphone-16-pro-wt-side.webp', '/images/products/iphone-16-pro-wt-set.webp')),
    ('iphone-16-pro', 'Desert Titanium', jsonb_build_array('/images/products/iphone-16-pro-dt-back.webp', '/images/products/iphone-16-pro-dt-side.jpeg', '/images/products/iphone-16-pro-dt-set.webp')),

    -- Apple iPhone 16 Pro Max
    ('iphone-16-pro-max', 'Black Titanium', jsonb_build_array('/images/products/iphone-16-pro-max-bt-back.webp', '/images/products/iphone-16-pro-max-bt-set.webp', '/images/products/iphone-16-pro-max-bt-side.webp')),
    ('iphone-16-pro-max', 'White Titanium', jsonb_build_array('/images/products/iphone-16-pro-max-wt-side.webp', '/images/products/iphone-16-pro-max-wt-back.webp', '/images/products/iphone-16-pro-max-wt-set.webp')),
    ('iphone-16-pro-max', 'Desert Titanium', jsonb_build_array('/images/products/iphone-16-pro-max-dt-side.webp', '/images/products/iphone-16-pro-max-dt-back.webp', '/images/products/iphone-16-pro-max-dt-set.webp')),

    -- Apple iPhone 15
    ('iphone-15', 'Black', jsonb_build_array('/images/products/iphone-15-black-back.webp', '/images/products/iphone-15-black-set.webp')),
    ('iphone-15', 'Blue', jsonb_build_array('/images/products/iphone-15-blue-back.webp', '/images/products/iphone-15-blue-side.webp')),
    ('iphone-15', 'Green', jsonb_build_array('/images/products/iphone-15-green-back.webp', '/images/products/iphone-15-green-side.webp', '/images/products/iphone-15-green-set.webp')),

    -- Samsung Galaxy S25
    ('samsung-galaxy-s25', 'Navy', jsonb_build_array('/images/products/samsung-galaxy-s25-navy.webp')),
    ('samsung-galaxy-s25', 'Silver', jsonb_build_array('/images/products/samsung-galaxy-s25-silver.webp')),
    ('samsung-galaxy-s25', 'Blue', jsonb_build_array('/images/products/samsung-galaxy-s25-blue.webp')),

    -- Samsung Galaxy S25 Ultra
    ('samsung-galaxy-s25-ultra', 'Titanium Black', jsonb_build_array('/images/products/samsung-galaxy-s25-ultra-tb.webp')),
    ('samsung-galaxy-s25-ultra', 'Titanium Gray', jsonb_build_array('/images/products/samsung-galaxy-s25-ultra-tg.webp')),
    ('samsung-galaxy-s25-ultra', 'Titanium Silver', jsonb_build_array('/images/products/samsung-galaxy-s25-ultra-ts.webp')),

    -- Samsung Galaxy S24
    ('samsung-galaxy-s24', 'Black', jsonb_build_array('/images/products/samsung-galaxy-s24-black.webp')),
    ('samsung-galaxy-s24', 'Violet', jsonb_build_array('/images/products/samsung-galaxy-s24-violet.webp')),
    ('samsung-galaxy-s24', 'Yellow', jsonb_build_array('/images/products/samsung-galaxy-s24-yellow.webp')),

    -- Samsung Galaxy A56
    ('samsung-galaxy-a56', 'Graphite', jsonb_build_array('/images/products/samsung-galaxy-a56-graphite.webp')),
    ('samsung-galaxy-a56', 'Light Gray', jsonb_build_array('/images/products/samsung-galaxy-a56-lightgrey.jpg')),
    ('samsung-galaxy-a56', 'Olive', jsonb_build_array('/images/products/samsung-galaxy-a56-olive.jpg')),

    -- Google Pixel 9 (single image available for all colors)
    ('google-pixel-9', 'Obsidian', jsonb_build_array('/images/products/google-pixel-9.webp')),
    ('google-pixel-9', 'Porcelain', jsonb_build_array('/images/products/google-pixel-9.webp')),
    ('google-pixel-9', 'Wintergreen', jsonb_build_array('/images/products/google-pixel-9.webp')),

    -- Google Pixel 9 Pro (single image available for all colors)
    ('google-pixel-9-pro', 'Obsidian', jsonb_build_array('/images/products/google-pixel-9-pro.webp')),
    ('google-pixel-9-pro', 'Porcelain', jsonb_build_array('/images/products/google-pixel-9-pro.webp')),
    ('google-pixel-9-pro', 'Hazel', jsonb_build_array('/images/products/google-pixel-9-pro.webp')),

    -- Google Pixel 9 Pro XL (single image available for all colors)
    ('google-pixel-9-pro-xl', 'Obsidian', jsonb_build_array('/images/products/google-pixel-9-pro-xl.webp')),
    ('google-pixel-9-pro-xl', 'Porcelain', jsonb_build_array('/images/products/google-pixel-9-pro-xl.webp')),
    ('google-pixel-9-pro-xl', 'Hazel', jsonb_build_array('/images/products/google-pixel-9-pro-xl.webp')),

    -- Google Pixel 8 (single image available for all colors)
    ('google-pixel-8', 'Obsidian', jsonb_build_array('/images/products/google-pixel-8.jpeg')),
    ('google-pixel-8', 'Hazel', jsonb_build_array('/images/products/google-pixel-8.jpeg')),
    ('google-pixel-8', 'Rose', jsonb_build_array('/images/products/google-pixel-8.jpeg')),

    -- OnePlus 13 (single image available for all colors)
    ('oneplus-13', 'Black Eclipse', jsonb_build_array('/images/products/oneplus-13.webp')),
    ('oneplus-13', 'Midnight Ocean', jsonb_build_array('/images/products/oneplus-13.webp')),
    ('oneplus-13', 'White', jsonb_build_array('/images/products/oneplus-13.webp')),

    -- OnePlus 13R (single image available for all colors)
    ('oneplus-13r', 'Black', jsonb_build_array('/images/products/oneplus-13r.webp')),
    ('oneplus-13r', 'Blue', jsonb_build_array('/images/products/oneplus-13r.webp')),
    ('oneplus-13r', 'Gray', jsonb_build_array('/images/products/oneplus-13r.webp')),

    -- Xiaomi 15 (single image available for all colors)
    ('xiaomi-15', 'Black', jsonb_build_array('/images/products/xiomi-15.webp')),
    ('xiaomi-15', 'White', jsonb_build_array('/images/products/xiomi-15.webp')),
    ('xiaomi-15', 'Green', jsonb_build_array('/images/products/xiomi-15.webp')),

    -- Xiaomi 15 Ultra (single image available for all colors)
    ('xiaomi-15-ultra', 'Black', jsonb_build_array('/images/products/xiomi-15-ultra.webp')),
    ('xiaomi-15-ultra', 'White', jsonb_build_array('/images/products/xiomi-15-ultra.webp')),
    ('xiaomi-15-ultra', 'Silver', jsonb_build_array('/images/products/xiomi-15-ultra.webp')),

    -- Nothing Phone (3) (single image available for all colors)
    ('nothing-phone-3', 'Black', jsonb_build_array('/images/products/nothing-phone-3.webp')),
    ('nothing-phone-3', 'White', jsonb_build_array('/images/products/nothing-phone-3.webp')),
    ('nothing-phone-3', 'Gray', jsonb_build_array('/images/products/nothing-phone-3.webp')),

    -- Motorola Edge 60 Pro (single image available for all colors)
    ('motorola-edge-60-pro', 'Black', jsonb_build_array('/images/products/motorola-edge-60-pro.webp')),
    ('motorola-edge-60-pro', 'Blue', jsonb_build_array('/images/products/motorola-edge-60-pro.webp')),
    ('motorola-edge-60-pro', 'Lavender', jsonb_build_array('/images/products/motorola-edge-60-pro.webp'))
)

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
    ci.color,
    NULL,
    v.mrp,
    v.price,
    ci.image_urls

FROM
(
    VALUES

    -- Apple

    (
        'iphone-16',
        '8GB',
        '128GB',
        74900,
        69900
    ),

    (
        'iphone-16',
        '8GB',
        '256GB',
        84900,
        79900
    ),

    (
        'iphone-16-pro',
        '8GB',
        '128GB',
        129900,
        119900
    ),

    (
        'iphone-16-pro',
        '8GB',
        '256GB',
        139900,
        129900
    ),

    (
        'iphone-16-pro-max',
        '8GB',
        '256GB',
        154900,
        144900
    ),

    (
        'iphone-15',
        '6GB',
        '128GB',
        69900,
        59900
    ),

    (
        'iphone-15',
        '6GB',
        '256GB',
        79900,
        69900
    ),


    -- Samsung

    (
        'samsung-galaxy-s25',
        '12GB',
        '128GB',
        79999,
        74999
    ),

    (
        'samsung-galaxy-s25',
        '12GB',
        '256GB',
        85999,
        80999
    ),

    (
        'samsung-galaxy-s25-ultra',
        '12GB',
        '256GB',
        139999,
        129999
    ),

    (
        'samsung-galaxy-s25-ultra',
        '12GB',
        '512GB',
        151999,
        141999
    ),

    (
        'samsung-galaxy-s24',
        '8GB',
        '128GB',
        69999,
        64999
    ),

    (
        'samsung-galaxy-s24',
        '8GB',
        '256GB',
        75999,
        70999
    ),

    (
        'samsung-galaxy-a56',
        '8GB',
        '128GB',
        44999,
        41999
    ),

    (
        'samsung-galaxy-a56',
        '8GB',
        '256GB',
        47999,
        44999
    ),


    -- Google

    (
        'google-pixel-9',
        '12GB',
        '128GB',
        84999,
        79999
    ),

    (
        'google-pixel-9',
        '12GB',
        '256GB',
        94999,
        89999
    ),

    (
        'google-pixel-9-pro',
        '16GB',
        '256GB',
        114999,
        109999
    ),

    (
        'google-pixel-9-pro-xl',
        '16GB',
        '256GB',
        129999,
        124999
    ),

    (
        'google-pixel-8',
        '8GB',
        '128GB',
        74999,
        69999
    ),

    (
        'google-pixel-8',
        '8GB',
        '256GB',
        84999,
        79999
    ),


    -- OnePlus

    (
        'oneplus-13',
        '12GB',
        '256GB',
        74999,
        69999
    ),

    (
        'oneplus-13',
        '16GB',
        '512GB',
        81999,
        76999
    ),

    (
        'oneplus-13r',
        '12GB',
        '256GB',
        47999,
        42999
    ),


    -- Xiaomi

    (
        'xiaomi-15',
        '12GB',
        '512GB',
        69999,
        64999
    ),

    (
        'xiaomi-15-ultra',
        '16GB',
        '512GB',
        114999,
        109999
    ),


    -- Nothing

    (
        'nothing-phone-3',
        '12GB',
        '256GB',
        84999,
        79999
    ),

    (
        'nothing-phone-3',
        '16GB',
        '512GB',
        94999,
        89999
    ),


    -- Motorola

    (
        'motorola-edge-60-pro',
        '8GB',
        '256GB',
        34999,
        29999
    ),

    (
        'motorola-edge-60-pro',
        '12GB',
        '256GB',
        36999,
        31999
    ),

    (
        'motorola-edge-60-pro',
        '12GB',
        '512GB',
        38999,
        33999
    )

) AS v(
    slug,
    ram,
    storage,
    mrp,
    price
)

JOIN products p
    ON p.slug = v.slug

JOIN color_images ci
    ON ci.slug = v.slug;


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