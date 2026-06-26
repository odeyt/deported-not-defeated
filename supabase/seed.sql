-- ============================================================
-- Deported Not Defeated — Seed Data
-- Run AFTER schema.sql
-- ============================================================

-- Countries
insert into countries (code, name) values
  ('LA', 'Laos'),
  ('KH', 'Cambodia'),
  ('VN', 'Vietnam'),
  ('PH', 'Philippines'),
  ('MX', 'Mexico')
on conflict (code) do nothing;

-- Cities (Laos)
insert into cities (country_code, name) values
  ('LA', 'Vientiane'),
  ('LA', 'Luang Prabang'),
  ('LA', 'Pakse'),
  ('LA', 'Savannakhet')
on conflict do nothing;

-- Categories
insert into categories (name) values
  ('Housing'),
  ('Jobs'),
  ('Lawyers / Legal Help'),
  ('Hospitals / Clinics'),
  ('Mental Health / Recovery'),
  ('Banks / Money Transfer'),
  ('Phone / SIM Cards'),
  ('Internet Providers'),
  ('Motorcycle Dealers'),
  ('Car / Motorcycle Repair'),
  ('Driving Schools'),
  ('Language Schools'),
  ('Churches / Temples'),
  ('Embassy / Government Offices'),
  ('Restaurants / Food'),
  ('Translation Services'),
  ('Business Setup Help')
on conflict (name) do nothing;

-- ============================================================
-- DIRECTORY LISTINGS (20+ sample entries for Laos)
-- ============================================================
insert into directory_listings (business_name, category, city, address, phone, whatsapp, english_speaking, verified, featured, description, country_code) values

-- Housing
('Vientiane Budget Guesthouse', 'Housing', 'Vientiane', '12 Samsenthai Road, Vientiane', '+856 21 123456', '+856 21 123456', true, true, true, 'Affordable guesthouse in central Vientiane. Clean rooms from $15/night. Monthly rates available. Great for first arrivals.', 'LA'),
('Mekong View Apartments', 'Housing', 'Vientiane', '45 Fa Ngum Road, Vientiane', '+856 21 234567', '+856 21 234567', true, true, false, 'Long-term apartments along the Mekong River. 1–3 bedrooms from $300/month. English-speaking management.', 'LA'),
('Luang Prabang Homestay Network', 'Housing', 'Luang Prabang', 'Old Town Area, Luang Prabang', '+856 71 123789', null, false, true, false, 'Network of affordable homestays in Luang Prabang. From $10/night. Good for people reconnecting with local community.', 'LA'),
('Pakse Long Stay Rentals', 'Housing', 'Pakse', 'Pakse City Center', '+856 31 456123', '+856 31 456123', false, false, false, 'Monthly room and house rentals in Pakse from $100/month. Good for those settling in southern Laos.', 'LA'),

-- Legal
('Vientiane Legal Aid', 'Lawyers / Legal Help', 'Vientiane', '78 Lane Xang Avenue, Vientiane', '+856 21 345678', '+856 21 345678', true, true, true, 'English-speaking lawyers specializing in immigration, residency, and document issues. Free initial consultation for returnees.', 'LA'),
('Lao Bar Association Referral', 'Lawyers / Legal Help', 'Vientiane', 'Ministry of Justice Building, Vientiane', '+856 21 456789', null, false, true, false, 'Official lawyer referral service. Can connect you with legal professionals across Laos.', 'LA'),

-- Banks / Money
('BCEL Bank - Vientiane Main', 'Banks / Money Transfer', 'Vientiane', '1 Pangkham Street, Vientiane', '+856 21 213200', null, true, true, true, 'Largest bank in Laos. Western Union partner. Account opening available with valid ID. English service available.', 'LA'),
('Western Union - That Luang', 'Banks / Money Transfer', 'Vientiane', 'That Luang Market, Vientiane', '+856 21 998877', null, false, true, false, 'Receive money transfers from the USA and worldwide. No account needed. Bring valid ID.', 'LA'),
('Phongsavanh Bank', 'Banks / Money Transfer', 'Savannakhet', 'Savannakhet City, Route 9', '+856 41 123456', null, false, true, false, 'Full-service bank in Savannakhet. Account opening, wire transfers, and ATM services.', 'LA'),

-- Phone / SIM
('Unitel Shop - Talat Sao', 'Phone / SIM Cards', 'Vientiane', 'Talat Sao Mall, Vientiane', '+856 21 020000', null, true, true, true, 'Official Unitel store. SIM cards from 20,000 LAK. Data packages starting at 50,000 LAK/month. Best coverage in Laos.', 'LA'),
('Lao Telecom Store - Vientiane', 'Phone / SIM Cards', 'Vientiane', '23 Setthathirath Road, Vientiane', '+856 21 216888', null, false, true, false, 'Official Lao Telecom store. SIM registration with passport. Good for rural coverage.', 'LA'),
('Phone Accessories Market - Pakse', 'Phone / SIM Cards', 'Pakse', 'Pakse Market, Champasak', '+856 31 555123', null, false, false, false, 'Local market stall selling SIM cards, phone accessories, and screen repairs at affordable prices.', 'LA'),

-- Healthcare
('Mahosot Hospital', 'Hospitals / Clinics', 'Vientiane', 'Mahosot Road, Vientiane', '+856 21 214018', null, false, true, false, 'Largest public hospital in Laos. Low cost care. Emergency services 24/7. Limited English available.', 'LA'),
('International SOS Clinic Vientiane', 'Hospitals / Clinics', 'Vientiane', 'Unit 08, Hom 3, Nongbone Village, Vientiane', '+856 21 241741', '+856 21 241741', true, true, true, 'International-standard private clinic. English-speaking doctors. Expat and returnee-friendly. Higher cost but quality care.', 'LA'),
('Savannakhet Provincial Hospital', 'Hospitals / Clinics', 'Savannakhet', 'Savannakhet City', '+856 41 212043', null, false, true, false, 'Main provincial hospital serving southern Laos. Emergency and general care.', 'LA'),
('Luang Prabang Provincial Hospital', 'Hospitals / Clinics', 'Luang Prabang', 'Luang Prabang City Center', '+856 71 212425', null, false, true, false, 'General hospital serving northern Laos. Emergency services available. Ask for English-speaking staff.', 'LA'),

-- Motorcycles
('Motorbike Kingdom Vientiane', 'Motorcycle Dealers', 'Vientiane', '156 Khouvieng Road, Vientiane', '+856 21 777888', '+856 21 777888', true, true, true, 'Used and new motorcycles. Honda Wave and Dream models from $400. Financing options available. English spoken.', 'LA'),
('Pakse Moto Shop', 'Motorcycle Dealers', 'Pakse', 'Route 13, Pakse', '+856 31 888999', null, false, false, false, 'Affordable used motorcycles starting $300. Parts and service also available.', 'LA'),

-- Language Schools
('Vientiane English Center', 'Language Schools', 'Vientiane', '34 Dong Palane Road, Vientiane', '+856 21 333444', '+856 21 333444', true, true, false, 'English and Lao language classes. Good place to teach English or practice Lao. Flexible schedules.', 'LA'),

-- Food
('Khop Chai Deu Restaurant', 'Restaurants / Food', 'Vientiane', '54 Settathilath Road, Vientiane', '+856 21 223022', null, true, true, false, 'Popular Lao-Western restaurant. Great for meeting expats and locals. English menu. Good WiFi.', 'LA'),

-- Repair
('Vientiane Moto Repair', 'Car / Motorcycle Repair', 'Vientiane', 'Nong Bone Road Area, Vientiane', '+856 20 55123456', '+856 20 55123456', false, true, false, 'Reliable motorcycle repair shop. Fast service. Reasonable prices. Can handle most common bike issues.', 'LA'),

-- Embassy
('US Embassy Vientiane', 'Embassy / Government Offices', 'Vientiane', 'Thadeua Road, Km 9, Vientiane', '+856 21 487000', null, true, true, true, 'US Embassy in Laos. American Citizen Services available for passport renewals, emergencies, and notarials.', 'LA');

-- ============================================================
-- AFFILIATE LINKS (Sample)
-- ============================================================
insert into affiliate_links (title, category, description, url, country, active, featured, disclosure_text) values
('Airalo eSIM', 'eSIM', 'Get a Laos data eSIM before you land. No physical SIM needed. Works on most unlocked phones. Packages from $5.', 'https://airalo.com', 'Laos', true, true, 'Affiliate link — we may earn a commission.'),
('ExpressVPN', 'VPN', 'Protect your privacy and access blocked content. Fast, reliable, and works on all devices. 30-day money back.', 'https://expressvpn.com', 'Global', true, false, 'Affiliate link — we may earn a commission.'),
('Wise Money Transfer', 'Money Transfer', 'Send and receive money with the best exchange rates. Much cheaper than traditional wire transfers.', 'https://wise.com', 'Global', true, true, 'Affiliate link — we may earn a commission.'),
('Remitly', 'Money Transfer', 'Fast money transfers from the USA to Laos. Family can send you money within minutes.', 'https://remitly.com', 'Global', true, false, 'Affiliate link — we may earn a commission.'),
('SafetyWing Travel Insurance', 'Travel Insurance', 'Affordable travel and health insurance for people living abroad. Covers emergency medical care.', 'https://safetywing.com', 'Global', true, true, 'Affiliate link — we may earn a commission.'),
('iTalki Language Learning', 'Language Learning', 'Learn Lao or improve your English with real tutors online. Affordable lessons, flexible schedule.', 'https://italki.com', 'Global', true, false, 'Affiliate link — we may earn a commission.'),
('Duolingo', 'Language Learning', 'Free Lao language learning app. Good for basics. Available offline. Great starting point.', 'https://duolingo.com', 'Global', true, false, null),
('Booking.com Hotels', 'Hotels', 'Find affordable hotels and guesthouses in Laos. Read real reviews. No booking fee.', 'https://booking.com', 'Laos', true, false, 'Affiliate link — we may earn a commission.'),
('Upwork Freelancing', 'Resume Builder', 'Find online work you can do from Laos. Writing, design, data entry, virtual assistant, and more.', 'https://upwork.com', 'Global', true, false, null);

-- ============================================================
-- ARTICLES (Metadata — content lives in app/laos pages)
-- ============================================================
insert into articles (title, slug, excerpt, content, country_code, category, published) values
('First 30 Days in Laos Checklist', 'first-30-days-laos', 'A step-by-step survival checklist for your first month in Laos after deportation.', 'See /laos/first-30-days page', 'LA', 'Survival', true),
('How to Find Housing in Laos', 'housing-in-laos', 'Guesthouses, apartments, and long-term rentals — what you need to know.', 'See /laos/housing page', 'LA', 'Housing', true),
('How to Get a SIM Card in Laos', 'sim-card-laos', 'Unitel, Lao Telecom, and ETL — which SIM is right for you and how to get it.', 'See /laos/phone-internet page', 'LA', 'Phone', true),
('How to Receive Money from the USA', 'receive-money-from-usa', 'Western Union, Wise, Remitly — how to get money sent to Laos.', 'See /laos/banking-money page', 'LA', 'Money', true),
('How to Find Work in Laos', 'find-work-laos', 'Jobs, freelance, and small business ideas for people rebuilding in Laos.', 'See /laos/jobs page', 'LA', 'Work', true),
('Emergency Numbers in Laos', 'emergency-numbers-laos', 'Police, ambulance, fire, and key emergency contacts in Laos.', 'See /laos/healthcare page', 'LA', 'Safety', true),
('How to Open a Bank Account in Laos', 'bank-account-laos', 'BCEL, Lao Development Bank — what you need and how to do it.', 'See /laos/banking-money page', 'LA', 'Money', true),
('How to Buy a Motorcycle in Laos', 'buy-motorcycle-laos', 'Used vs new, prices, where to buy, and what to watch out for.', 'See /laos/transportation page', 'LA', 'Transport', true),
('Healthcare Options in Vientiane', 'healthcare-vientiane', 'Hospitals, clinics, pharmacies, and what to do in an emergency.', 'See /laos/healthcare page', 'LA', 'Health', true),
('Mental Health After Deportation', 'mental-health-deportation', 'Deportation is trauma. Here is how to find support and start healing.', 'See /laos/healthcare page', null, 'Mental Health', true)
on conflict (slug) do nothing;
