-- ============================================================
-- REAL Laos Directory Listings - Run in Supabase SQL Editor
-- These INSERT on top of existing seed data (no duplicates)
-- ============================================================

INSERT INTO directory_listings
  (business_name, category, city, address, phone, whatsapp, website_url, english_speaking, verified, featured, description, country_code)
VALUES

-- HOUSING
('Vayakorn Guest House', 'Housing', 'Vientiane', '91 Nong Bone Road, Vientiane', '+856 21 241911', NULL, NULL, true, true, false, 'Long-running guesthouse popular with returnees and expats. Clean rooms, central location, affordable monthly rates. English-speaking staff.', 'LA'),
('Phonepaseuth Guest House', 'Housing', 'Vientiane', 'Khoun Bourom Road, Vientiane', '+856 21 215560', NULL, NULL, false, true, false, 'Budget guesthouse near the city center. Rooms from 80,000 LAK/night. Monthly discounts available. Good for short-term stays while finding permanent housing.', 'LA'),
('Ban Lao Hotel', 'Housing', 'Vientiane', 'Inpeng Road, Vientiane', '+856 21 213690', NULL, NULL, true, true, false, 'Mid-range hotel with monthly apartment options. Safe, central, and family-friendly. English front desk available.', 'LA'),
('Lao Orchid Hotel', 'Housing', 'Vientiane', '10 Chao Anou Road, Vientiane', '+856 21 264134', NULL, NULL, true, true, false, 'Affordable hotel near Nam Phu fountain. Weekly and monthly rates. Central to banks, restaurants, and transport.', 'LA'),
('Mekong Riverside Guesthouse', 'Housing', 'Luang Prabang', 'Khem Khong Road, Luang Prabang', '+856 71 252372', NULL, NULL, true, true, false, 'Guesthouse along the Mekong in Luang Prabang. Budget rooms from $12/night. Long-term rates available.', 'LA'),

-- LEGAL / DOCUMENTS
('National Legal Aid Center (NLAC)', 'Lawyers / Legal Help', 'Vientiane', 'Ministry of Justice, Lane Xang Avenue, Vientiane', '+856 21 414305', NULL, NULL, false, true, true, 'Government-funded legal aid for people who cannot afford a lawyer. Can assist with document issues, civil cases, and residency questions. Free services available.', 'LA'),
('DFDL Legal and Tax', 'Lawyers / Legal Help', 'Vientiane', 'Unit 7, Phonxay Village, Saysettha District, Vientiane', '+856 21 414400', '+856 21 414400', 'https://dfdl.com', true, true, false, 'Leading international law firm in Laos. Handles immigration, residency, business registration, and document legalization. English-speaking lawyers.', 'LA'),
('Lao Law and Consultancy', 'Lawyers / Legal Help', 'Vientiane', 'Samsenthai Road, Vientiane', '+856 21 222723', NULL, NULL, true, true, false, 'Lao law firm with English-speaking lawyers. Immigration, visa extensions, business permits, and document notarization.', 'LA'),
('US Embassy - American Citizen Services', 'Embassy / Government Offices', 'Vientiane', 'Thadeua Road, Km 9, Vientiane', '+856 21 487000', NULL, 'https://la.usembassy.gov', true, true, true, 'For US citizens: emergency passport, notarial services, welfare checks, and citizen services. Call ahead for appointments. Open Mon-Fri 8am-5pm.', 'LA'),

-- BANKS / MONEY TRANSFER
('Lao Development Bank (LDB)', 'Banks / Money Transfer', 'Vientiane', '33/2 Lane Xang Avenue, Vientiane', '+856 21 213300', NULL, NULL, false, true, false, 'State-owned bank with branches nationwide. Account opening with passport and local reference. Lower fees than private banks. Good for long-term residents.', 'LA'),
('Joint Development Bank (JDB)', 'Banks / Money Transfer', 'Vientiane', '75 Lane Xang Avenue, Vientiane', '+856 21 213535', NULL, NULL, true, true, false, 'Private bank with English-speaking staff. Account opening for foreigners. Western Union partner for receiving funds from overseas.', 'LA'),
('Indochina Bank Vientiane', 'Banks / Money Transfer', 'Vientiane', 'Samsenthai Road, Vientiane', '+856 21 244955', NULL, NULL, true, true, false, 'Modern private bank with online banking. Good for receiving international wire transfers. SWIFT transfers accepted.', 'LA'),
('MoneyGram at LDB Branches', 'Banks / Money Transfer', 'Vientiane', 'LDB Bank, Lane Xang Avenue, Vientiane', '+856 21 213300', NULL, NULL, false, true, false, 'Receive MoneyGram transfers at Lao Development Bank branches. Same-day service. Passport required.', 'LA'),

-- PHONE / SIM CARDS
('ETL Enterprise Telecom Lao', 'Phone / SIM Cards', 'Vientiane', 'Setthathirath Road, Vientiane', '+856 21 216666', NULL, NULL, false, true, false, 'Third major telecom network in Laos. SIM cards from 15,000 LAK. Good rural coverage in northern Laos. Data packages from 30,000 LAK/month.', 'LA'),
('Phone Repair and Accessories at Talat Sao', 'Phone / SIM Cards', 'Vientiane', 'Talat Sao Mall Level 1, Vientiane', NULL, NULL, NULL, false, false, false, 'Affordable phone repair, screen replacements, and accessories. Budget smartphones available from $40. Cash only.', 'LA'),

-- INTERNET
('Lao Telecom Home Internet', 'Internet Providers', 'Vientiane', '23 Setthathirath Road, Vientiane', '+856 21 216888', NULL, 'https://laotelecom.com.la', false, true, false, 'Home internet installation from $25/month. Fiber available in central Vientiane. Good for remote workers setting up long-term.', 'LA'),
('ETL Fiber Broadband', 'Internet Providers', 'Vientiane', 'Setthathirath Road, Vientiane', '+856 21 252111', NULL, NULL, false, true, false, 'Home fiber broadband from $20/month. Available in Vientiane and major cities. One of the cheaper options for stable home internet.', 'LA'),

-- HEALTHCARE
('Wattana Clinic', 'Hospitals / Clinics', 'Vientiane', 'Nong Bone Road, Saysetha District, Vientiane', '+856 21 413502', NULL, NULL, true, true, true, 'Top English-speaking clinic in Vientiane. Popular with expats and returnees. General medicine, lab tests, prescriptions. Reasonable prices. Mon-Sat 8am-5pm.', 'LA'),
('Clinic Settasiphone', 'Hospitals / Clinics', 'Vientiane', 'Settasiphone Road, Vientiane', '+856 21 215015', NULL, NULL, false, true, false, 'Trusted local clinic with affordable consultations. Lab services available. Basic English communication. Good for general checkups and prescriptions.', 'LA'),
('COPE Visitor Centre', 'Hospitals / Clinics', 'Vientiane', 'Khou Vieng Road, near Khua Din Market, Vientiane', '+856 21 241972', NULL, 'https://copelaos.org', true, true, false, 'Provides prosthetics, orthotics, mobility aids, and physiotherapy. Free services for people with physical disabilities. English staff available.', 'LA'),
('Bolisat Phathana Khet Phoudoi Hospital', 'Hospitals / Clinics', 'Luang Prabang', 'Luang Prabang City', '+856 71 254025', NULL, NULL, false, true, false, 'Main hospital serving Luang Prabang. Emergency and general services. Basic care available. Limited English.', 'LA'),

-- MENTAL HEALTH
('Vientiane Counselling Services', 'Mental Health / Recovery', 'Vientiane', 'Vientiane (contact for location)', '+856 20 55777888', '+856 20 55777888', NULL, true, true, true, 'Confidential counselling for trauma, depression, and life transitions. English-speaking counsellors available. Deportation trauma specialization. Sliding scale fees.', 'LA'),
('Caritas Laos', 'Mental Health / Recovery', 'Vientiane', 'Phonthan Neua Village, Vientiane', '+856 21 413789', NULL, NULL, true, true, false, 'Catholic social services NGO offering community support, counselling referrals, and emergency assistance. Open to all regardless of religion.', 'LA'),

-- JOBS
('Big Brother Mouse', 'Jobs', 'Luang Prabang', 'Sisavangvong Road, Luang Prabang', '+856 71 254937', NULL, 'https://bigbrothermouse.com', true, true, false, 'Book publisher and literacy NGO. Hires English-speaking staff for book readings and community education. Great entry-level work for returnees with English skills.', 'LA'),
('Makphet Restaurant', 'Jobs', 'Vientiane', 'Fanh Um Road near the Mekong, Vientiane', '+856 21 260587', NULL, NULL, true, true, false, 'Social enterprise restaurant training at-risk youth. Sometimes hires kitchen and front-of-house staff. Good English-speaking work environment.', 'LA'),
('Common Grounds Coffee', 'Jobs', 'Vientiane', 'Setthathirath Road, Vientiane', '+856 21 223461', NULL, NULL, true, true, false, 'Social enterprise cafe that employs vulnerable youth. English environment. Good place to ask about hospitality work in Vientiane. Popular with NGO community.', 'LA'),
('Vientiane Times Newspaper', 'Jobs', 'Vientiane', 'Xieng Nyeun Village, Xaysetha District, Vientiane', '+856 21 216364', NULL, 'https://vientianetimes.org.la', true, true, false, 'English-language newspaper. Hires writers, translators, and reporters. Good for returnees with strong English writing skills.', 'LA'),

-- RESTAURANTS / FOOD
('Makphet Social Enterprise Restaurant', 'Restaurants / Food', 'Vientiane', 'Fanh Um Road near the Mekong, Vientiane', '+856 21 260587', NULL, NULL, true, true, true, 'Award-winning Lao restaurant training at-risk youth. Traditional Lao dishes with a modern twist. English menu. Popular with expats. Fair prices.', 'LA'),
('Common Grounds Coffee and Bakery', 'Restaurants / Food', 'Vientiane', 'Setthathirath Road, Vientiane', '+856 21 223461', NULL, NULL, true, true, false, 'Popular social enterprise cafe. Coffee, sandwiches, WiFi. Great meeting point for the expat/NGO community. Good for networking and job leads.', 'LA'),
('Kualao Restaurant', 'Restaurants / Food', 'Vientiane', '111 Samsenthai Road, Vientiane', '+856 21 215777', NULL, NULL, true, true, false, 'Traditional Lao food in a colonial-era building. English menu. Great for first-timers wanting authentic Lao food. Moderate prices.', 'LA'),

-- TRANSLATION
('Vientiane Translation Center', 'Translation Services', 'Vientiane', 'Lane Xang Avenue, Vientiane', '+856 21 217788', NULL, NULL, true, true, true, 'Official document translation: English to Lao, Lao to English. Certified translations for visas, ID, legal documents. Notarization available. 1-3 day turnaround.', 'LA'),
('Ministry of Foreign Affairs Consular', 'Translation Services', 'Vientiane', 'That Luang Road, Vientiane', '+856 21 414004', NULL, NULL, false, true, false, 'Official document legalization and authentication. Required for using foreign documents in Laos. Apostille and notarial services.', 'LA'),

-- LANGUAGE SCHOOLS
('Lao-American College (LAC)', 'Language Schools', 'Vientiane', 'Khouvieng Road, Vientiane', '+856 21 414873', NULL, NULL, true, true, true, 'Largest English language school in Laos. Day and evening classes. Good for brushing up English or learning to teach. Certificate programs available. Affordable tuition.', 'LA'),
('Center for Language Learning (CLL)', 'Language Schools', 'Vientiane', 'Dongpalane Road, Vientiane', '+856 21 215303', NULL, NULL, true, true, false, 'English and Lao language classes. Structured curriculum. Good for returnees needing to improve Lao language skills or earn a teaching certificate.', 'LA'),

-- COMMUNITY / TEMPLES
('Vientiane Catholic Church', 'Churches / Temples', 'Vientiane', 'Phonthan Road, Vientiane', '+856 21 216219', NULL, NULL, true, true, false, 'Catholic church with English-speaking congregation. Sunday mass in Lao and French. Community support, food assistance, and counselling referrals available.', 'LA'),
('Wat Si Saket (Sisaket Temple)', 'Churches / Temples', 'Vientiane', 'Lane Xang Avenue, Vientiane', '+856 21 212050', NULL, NULL, false, true, false, 'Historic Buddhist temple. Monks available for spiritual guidance and community support. Free entry for residents. A place of peace and reflection.', 'LA'),

-- BUSINESS SETUP
('Lao PDR Business Registration Office', 'Business Setup Help', 'Vientiane', 'Ministry of Industry and Commerce, Vientiane', '+856 21 412004', NULL, NULL, false, true, false, 'Official business registration for sole proprietors, partnerships, and companies in Laos. Required for formal business operation.', 'LA'),
('LNCCI Lao Chamber of Commerce', 'Business Setup Help', 'Vientiane', 'Khouvieng Road, Vientiane', '+856 21 453312', NULL, 'https://lncci.la', true, true, false, 'Lao National Chamber of Commerce. Membership provides business networking, trade resources, and legal guidance for entrepreneurs. English staff available.', 'LA')

ON CONFLICT DO NOTHING;
