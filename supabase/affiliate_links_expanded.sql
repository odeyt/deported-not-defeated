-- ============================================================
-- Expanded Affiliate Links — Run in Supabase SQL Editor
-- All programs have real affiliate programs you can join
-- ============================================================

INSERT INTO affiliate_links (title, category, description, url, country, active, featured, disclosure_text)
VALUES

-- ============================================================
-- VPN (add NordVPN + Surfshark — both pay 40-100% commission)
-- ============================================================
('NordVPN',
 'VPN',
 'The most trusted VPN worldwide. Protect your privacy, access blocked content, and use banking apps safely on public WiFi. 30-day money-back guarantee. Works on 6 devices.',
 'https://nordvpn.com',
 'Global', true, true,
 'Affiliate link — we may earn a commission.'),

('Surfshark VPN',
 'VPN',
 'Affordable VPN with unlimited device connections. Great for families. Fast speeds in Southeast Asia. Cheaper than NordVPN for long-term plans.',
 'https://surfshark.com',
 'Global', true, false,
 'Affiliate link — we may earn a commission.'),

-- ============================================================
-- eSIM (add Holafly — popular Airalo alternative, 20% commission)
-- ============================================================
('Holafly eSIM',
 'eSIM',
 'Unlimited data eSIM plans for Laos and Southeast Asia. No physical SIM needed. Works on iPhone and most Android phones. Instant activation before you land.',
 'https://holafly.com',
 'Laos', true, false,
 'Affiliate link — we may earn a commission.'),

-- ============================================================
-- MONEY TRANSFER (add Xoom and Western Union)
-- ============================================================
('Xoom by PayPal',
 'Money Transfer',
 'Send money from the USA to Laos fast. Family can send through PayPal and you receive it at local agents or bank. Good for first-time senders with a PayPal account.',
 'https://xoom.com',
 'Global', true, false,
 'Affiliate link — we may earn a commission.'),

('Western Union Online',
 'Money Transfer',
 'Send money directly to Laos bank accounts or for cash pickup at BCEL branches. One of the most widely available services in Laos. Trusted by millions worldwide.',
 'https://westernunion.com',
 'Global', true, false,
 'Affiliate link — we may earn a commission.'),

-- ============================================================
-- TRAVEL INSURANCE (add World Nomads — pays 10% commission)
-- ============================================================
('World Nomads Travel Insurance',
 'Travel Insurance',
 'Travel and emergency insurance designed for people living and traveling abroad. Covers medical emergencies, accidents, and trip interruptions. Trusted by expats worldwide.',
 'https://worldnomads.com',
 'Global', true, false,
 'Affiliate link — we may earn a commission.'),

-- ============================================================
-- HEALTH INSURANCE (new category — high value, high commission)
-- ============================================================
('CIGNA Global Health Insurance',
 'Health Insurance',
 'International health insurance covering Laos and Southeast Asia. Full medical coverage including hospitalization, outpatient, dental, and mental health. Essential for long-term residents.',
 'https://cigna.com/global',
 'Global', true, true,
 'Affiliate link — we may earn a commission.'),

('Pacific Cross Health Insurance',
 'Health Insurance',
 'Health insurance designed specifically for Southeast Asia. Affordable plans starting at $50/month. Covers major hospitals in Laos, Thailand, and Cambodia. Popular with expats.',
 'https://pacificcross.com',
 'Global', true, true,
 'Affiliate link — we may earn a commission.'),

('SafetyWing Health Insurance',
 'Health Insurance',
 'Remote health insurance for people living outside their home country. Covers medical care in Laos at $45-80/month. Includes emergency evacuation. No long-term commitment.',
 'https://safetywing.com/nomad-health',
 'Global', true, false,
 'Affiliate link — we may earn a commission.'),

-- ============================================================
-- LANGUAGE LEARNING (add Babbel — pays 20-40% commission)
-- ============================================================
('Babbel Language App',
 'Language Learning',
 'Structured language learning app. Good for learning Thai (useful near the border) or improving English. Lessons designed for busy adults. Offline mode available.',
 'https://babbel.com',
 'Global', true, false,
 'Affiliate link — we may earn a commission.'),

-- ============================================================
-- RESUME / CAREER (add LinkedIn Premium and Zety)
-- ============================================================
('Zety Resume Builder',
 'Resume Builder',
 'Professional resume builder with templates trusted by recruiters. Create a resume in 15 minutes. Perfect for returnees applying to NGOs, hotels, and international companies in Laos.',
 'https://zety.com',
 'Global', true, true,
 'Affiliate link — we may earn a commission.'),

('LinkedIn Premium',
 'Resume Builder',
 'LinkedIn Premium gives you access to job insights, direct messages to hiring managers, and featured applicant status. Worth it if you are applying for professional or NGO roles.',
 'https://linkedin.com/premium',
 'Global', true, false,
 'Affiliate link — we may earn a commission.'),

-- ============================================================
-- HOTEL BOOKING (add Agoda — pays 5-7%, strong in SE Asia)
-- ============================================================
('Agoda Hotels',
 'Hotel Booking',
 'Best hotel booking site for Southeast Asia. Huge selection in Laos, often cheaper than Booking.com. Good for finding guesthouses and budget hotels in Vientiane and Luang Prabang.',
 'https://agoda.com',
 'Laos', true, true,
 'Affiliate link — we may earn a commission.'),

('Hostelworld',
 'Hotel Booking',
 'Find affordable hostels and budget accommodation across Laos. Good for first arrivals who want a social environment and low nightly costs while getting settled.',
 'https://hostelworld.com',
 'Laos', true, false,
 'Affiliate link — we may earn a commission.'),

-- ============================================================
-- FLIGHT BOOKING (new category)
-- ============================================================
('Skyscanner Flights',
 'Flight Booking',
 'Compare all available flights to and from Laos. Find the cheapest routes from the USA. Good for family members booking visits or returnees planning future travel.',
 'https://skyscanner.com',
 'Global', true, true,
 'Affiliate link — we may earn a commission.'),

('Kiwi.com Flights',
 'Flight Booking',
 'Finds cheap multi-stop routes that other sites miss. Great for finding affordable connections to Vientiane through Bangkok, Kuala Lumpur, or Seoul.',
 'https://kiwi.com',
 'Global', true, false,
 'Affiliate link — we may earn a commission.'),

('Google Flights',
 'Flight Booking',
 'Free flight comparison tool. Set price alerts for routes from the USA to Vientiane (VTE). Use Explore mode to find cheapest travel dates. No booking fee.',
 'https://google.com/flights',
 'Global', true, false,
 NULL),

-- ============================================================
-- ONLINE COURSES (new category — high commission 15-50%)
-- ============================================================
('Udemy Online Courses',
 'Online Courses',
 'Thousands of affordable courses for career building — English, coding, design, business, digital marketing. Courses often on sale for $10-15. Learn skills you can sell from Laos.',
 'https://udemy.com',
 'Global', true, true,
 'Affiliate link — we may earn a commission.'),

('Coursera',
 'Online Courses',
 'University-level courses and certifications from top institutions. Google, IBM, and Meta certificates accepted by employers worldwide. Financial aid available for those who qualify.',
 'https://coursera.org',
 'Global', true, true,
 'Affiliate link — we may earn a commission.'),

('Skillshare',
 'Online Courses',
 'Creative and business skills platform. Great for learning graphic design, video editing, photography, and marketing — all skills you can freelance with from Laos.',
 'https://skillshare.com',
 'Global', true, false,
 'Affiliate link — we may earn a commission.')

ON CONFLICT DO NOTHING;
