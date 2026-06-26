# Deported Not Defeated

A modern, mission-driven web platform to empower people deported from the USA who are rebuilding their lives — starting with Laos.

> "Deported, Not Defeated. Your story is not over. Start again with dignity, direction, and support."

---

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS**
- **Supabase** (Auth, Database, Storage)
- **Vercel** (Deployment)

---

## Local Setup

### 1. Clone the project

```bash
git clone https://github.com/yourusername/deported-not-defeated.git
cd deported-not-defeated
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Supabase Setup

### 1. Create a Supabase project

Go to [supabase.com](https://supabase.com), create a new project.

### 2. Run the schema

In the Supabase Dashboard → SQL Editor, paste and run the contents of:

```
supabase/schema.sql
```

### 3. Run the seed data

Then paste and run:

```
supabase/seed.sql
```

### 4. Create an admin user

In Supabase Dashboard → Authentication → Users → Add User:
- Email: your admin email
- Password: strong password

---

## Vercel Deployment

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/deported-not-defeated.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Click Deploy

### 3. Set up custom domain

In Vercel → Project Settings → Domains → Add `deportednotdefeated.com`

In your domain registrar (Namecheap), point DNS to Vercel:
- Type: CNAME, Name: www, Value: cname.vercel-dns.com
- Type: A, Name: @, Value: 76.76.21.21

---

## Project Structure

```
app/
  page.tsx              — Homepage
  layout.tsx            — Root layout
  laos/
    page.tsx            — Laos country guide
    first-30-days/      — First 30 days checklist
    directory/          — Searchable directory
    housing/            — Housing guide
    jobs/               — Work guide
    legal-help/         — Legal help
    healthcare/         — Healthcare
    banking-money/      — Banking & money
    phone-internet/     — Phone & internet
    transportation/     — Transportation
    resources/          — Affiliate resources
  about/                — About page
  contact/              — Contact form
  admin/                — Protected admin dashboard
components/
  Navbar.tsx
  Footer.tsx
  DirectorySearch.tsx   — Client-side filtered search
  DirectoryCard.tsx     — Listing card component
  NewsletterForm.tsx    — Email signup
lib/
  supabase/
    client.ts           — Browser Supabase client
    server.ts           — Server Supabase client
  types.ts              — TypeScript interfaces
  utils.ts              — Utilities and constants
supabase/
  schema.sql            — Database schema
  seed.sql              — Sample data (20+ listings)
```

---

## Key Features

- Searchable, filterable directory with 17+ categories
- Client-side search (no extra DB calls for filtering)
- Newsletter signup → Supabase
- Contact form → Supabase
- Admin dashboard (Supabase Auth protected)
- SEO metadata on every page
- Mobile-first responsive design
- Affiliate disclosure on resource pages

---

## Adding Content

### Add a directory listing
Go to `/admin/listings/new` (must be logged in)

### Add an affiliate link
Go to `/admin/affiliates/new`

### View messages
Go to `/admin/messages`

---

## Expanding to New Countries

To add a new country:
1. Insert into `countries` table
2. Insert cities into `cities` table
3. Add listings with the new `country_code`
4. Create `/app/[country]/` pages following the Laos pattern

---

## License

MIT — Built for a mission, not for profit.
