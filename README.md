# 🚀 Portfolio — Next.js + Supabase

A stunning, fully dynamic personal portfolio with a hidden admin dashboard. Built with Next.js 14, Supabase, TypeScript, and Framer-ready animations.

---

## ✨ Features

- **Beautiful animated portfolio** — hero, about, education, projects, skills, experience, contact
- **Fully mobile-responsive** — looks great on all screen sizes
- **Hidden admin dashboard** — accessible only at `/admin/login`, not linked anywhere on the public site
- **Secure key authentication** — server-side cookie session, key stored in `.env.local` only
- **Supabase backend** — real-time PostgreSQL, works without it too (falls back to defaults)
- **Next.js ISR** — portfolio refreshes every 60s after admin saves
- **TypeScript throughout** — fully typed

---

## 🗂 Project Structure

```
src/
├── app/
│   ├── (portfolio)/          # Public portfolio pages
│   │   └── page.tsx          # Main portfolio page
│   ├── admin/
│   │   ├── login/            # Admin login (hidden from public)
│   │   └── dashboard/        # Protected admin dashboard
│   │       ├── hero/
│   │       ├── about/
│   │       ├── education/
│   │       ├── projects/
│   │       ├── skills/
│   │       ├── experience/
│   │       ├── contact/
│   │       ├── stats/
│   │       └── setup/
│   └── api/admin/            # API routes (auth, save, logout)
├── components/
│   ├── portfolio/            # All public-facing sections
│   └── admin/                # Admin sidebar, form fields
├── lib/                      # Supabase client, data fetcher, auth utils
├── hooks/                    # useSave hook
├── types/                    # TypeScript interfaces
└── styles/                   # Global CSS with design tokens
```

---

## 🛠 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
ADMIN_SECRET_KEY=your_strong_password_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the portfolio.

---

## 🔐 Admin Dashboard

The admin dashboard is **completely hidden** from the public portfolio — no links, no buttons, no trace.

**To access:**
1. Navigate to `http://localhost:3000/admin/login` manually
2. Enter the `ADMIN_SECRET_KEY` from your `.env.local`
3. You'll get an 8-hour session cookie
4. Edit any section and click **Save Changes**

The portfolio auto-refreshes (ISR) within 60 seconds of saving.

---

## 🗃 Supabase Setup

See the **Setup** page inside the admin dashboard for step-by-step SQL and instructions.

**Without Supabase:** The portfolio works perfectly with the default data in `src/lib/defaults.ts`. Just edit that file directly.

---

## 🚀 Deploy to Vercel

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy — your portfolio is live!

---

## 🎨 Customization

- **Colors/fonts**: Edit CSS variables in `src/styles/globals.css`
- **Default data**: Edit `src/lib/defaults.ts`
- **Add sections**: Create a new component in `src/components/portfolio/` and a new admin page in `src/app/admin/dashboard/`

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | CSS Variables + Tailwind |
| Database | Supabase (PostgreSQL) |
| Auth | Server-side cookies + middleware |
| Fonts | Cormorant Garamond + Syne + JetBrains Mono |
| Deployment | Vercel |
"# portfolio" 
"# portfolio" 
