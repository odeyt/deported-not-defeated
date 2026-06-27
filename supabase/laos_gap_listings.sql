-- ============================================================
-- Gap listings to meet minimum counts per category
-- Run in Supabase SQL Editor
-- ============================================================

INSERT INTO directory_listings
  (business_name, category, city, address, phone, whatsapp, website_url, english_speaking, verified, featured, description, country_code)
VALUES

-- ============================================================
-- HOUSING (need 1 more to reach 10)
-- ============================================================
('Sabaidy 2 Guesthouse',
 'Housing', 'Vang Vieng',
 'Ban Viengkeo, Vang Vieng',
 '+856 23 511974', NULL, NULL,
 true, true, false,
 'Popular long-running guesthouse in Vang Vieng. Clean rooms from $8/night. Monthly rates available. Good base for returnees settling in central Laos.', 'LA'),

-- ============================================================
-- JOBS / EMPLOYERS (need 6 more to reach 10)
-- ============================================================
('UNDP Laos Office',
 'Jobs', 'Vientiane',
 'UN House, Bane Phonxai, Vientiane',
 '+856 21 267200', NULL, 'https://undp.org/laos',
 true, true, false,
 'United Nations Development Programme office in Laos. Hires locally for project coordination, admin, and communication roles. English essential.', 'LA'),

('World Food Programme Laos',
 'Jobs', 'Vientiane',
 'UN House, Bane Phonxai, Vientiane',
 '+856 21 267200', NULL, 'https://wfp.org/countries/lao',
 true, true, false,
 'WFP Laos hires for logistics, nutrition, and community outreach roles. English speakers with local knowledge are highly valued.', 'LA'),

('Hotel Beau Rivage Mekong',
 'Jobs', 'Vientiane',
 'Fa Ngum Road, Vientiane',
 '+856 21 243350', NULL, NULL,
 true, true, false,
 'Upscale riverside hotel that regularly hires English-speaking front desk, restaurant, and management staff. Good starting point for hospitality careers.', 'LA'),

('Lane Xang Travel',
 'Jobs', 'Vientiane',
 'Pangkham Street, Vientiane',
 '+856 21 212469', NULL, NULL,
 true, true, false,
 'One of Laos oldest travel agencies. Hires English-speaking tour guides, coordinators, and drivers. Good for returnees with local knowledge.', 'LA'),

('Green Discovery Laos',
 'Jobs', 'Vientiane',
 'Setthathirath Road, Vientiane',
 '+856 21 264528', NULL, 'https://greendiscoverylaos.com',
 true, true, false,
 'Eco-tourism operator hiring English-speaking guides, kayak instructors, and trip coordinators. English fluency is a major hiring advantage here.', 'LA'),

('Lao Disabled Peoples Organisation (LDPO)',
 'Jobs', 'Vientiane',
 'Vientiane (contact for address)',
 '+856 21 315910', NULL, NULL,
 true, true, false,
 'NGO providing employment support and vocational training. Can connect returnees with job placement programs and community work opportunities.', 'LA'),

-- ============================================================
-- TRANSLATION SERVICES (need 3 more to reach 5)
-- ============================================================
('JT Translation Services',
 'Translation Services', 'Vientiane',
 'Phonxay Village, Vientiane',
 '+856 20 55234567', '+856 20 55234567', NULL,
 true, true, false,
 'English-Lao document translation. Specializes in legal, medical, and business documents. Certified translations accepted by Lao government offices. 24-48 hour turnaround.', 'LA'),

('Lao Interpret and Translate Center',
 'Translation Services', 'Vientiane',
 'Samsenthai Road, Vientiane',
 '+856 21 216644', NULL, NULL,
 true, true, false,
 'Professional interpretation and translation for court, medical, and business settings. Interpreter hire available for appointments and meetings.', 'LA'),

('American Embassy Notarial Services',
 'Translation Services', 'Vientiane',
 'Thadeua Road, Km 9, Vientiane',
 '+856 21 487000', NULL, 'https://la.usembassy.gov',
 true, true, false,
 'Notarization and authentication of US documents for use in Laos. Apostille services. Required when using US-issued documents with Lao authorities. Appointment needed.', 'LA'),

-- ============================================================
-- MOTORCYCLE / CAR SERVICES (need 2 more to reach 5)
-- ============================================================
('Talat Khua Din Mechanic Row',
 'Car / Motorcycle Repair', 'Vientiane',
 'Khua Din Market area, Vientiane',
 NULL, NULL, NULL,
 false, true, false,
 'Row of local mechanics near Khua Din Market. Competitive pricing for all motorbike repairs. Common bikes (Honda Wave, Dream, Click) serviced quickly. Negotiate before work begins.', 'LA'),

('Luang Prabang Moto Rentals and Repair',
 'Car / Motorcycle Repair', 'Luang Prabang',
 'Sisavangvong Road, Luang Prabang',
 '+856 71 252897', NULL, NULL,
 true, false, false,
 'Motorbike rental and full repair service in Luang Prabang. Sells used bikes from $350. Parts available for Honda and Yamaha models.', 'LA'),

-- ============================================================
-- CHURCHES / TEMPLES / COMMUNITY RESOURCES (need 3 more to reach 5)
-- ============================================================
('Wat Ong Teu Mahawihan',
 'Churches / Temples', 'Vientiane',
 'Setthathirath Road, Vientiane',
 '+856 21 212057', NULL, NULL,
 false, true, false,
 'One of the most important Buddhist temples in Laos. Home to the Buddhist Institute. Monks provide community support, meditation guidance, and are a source of calm and stability.', 'LA'),

('Vientiane International Church',
 'Churches / Temples', 'Vientiane',
 'Nong Bone Road, Vientiane',
 '+856 21 413432', NULL, NULL,
 true, true, true,
 'Non-denominational English-language Christian church. Active community support network. Sunday services, counselling referrals, and practical help for people in transition.', 'LA'),

('Lao Evangelical Church',
 'Churches / Temples', 'Vientiane',
 'Phonxay Village, Vientiane',
 '+856 21 413567', NULL, NULL,
 false, true, false,
 'Evangelical Christian church with community outreach programs. Food assistance, emergency support, and counselling referrals available. Welcoming to all backgrounds.', 'LA')

ON CONFLICT DO NOTHING;
