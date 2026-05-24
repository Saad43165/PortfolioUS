import React from 'react'
import Link from 'next/link'

export default function SetupPage() {
  const SQL = `-- ============================================
-- PORTFOLIO SUPABASE SCHEMA — run in SQL Editor
-- ============================================

CREATE TABLE IF NOT EXISTS hero (
  id SERIAL PRIMARY KEY,
  name TEXT DEFAULT 'Your Name',
  title TEXT DEFAULT 'Full Stack Developer',
  subtitle TEXT DEFAULT 'I craft elegant digital experiences.',
  cta_primary_text TEXT DEFAULT 'View My Work',
  cta_primary_link TEXT DEFAULT '#projects',
  cta_secondary_text TEXT DEFAULT 'Get in Touch',
  cta_secondary_link TEXT DEFAULT '#contact',
  avatar_url TEXT DEFAULT '',
  available_for_work BOOLEAN DEFAULT true,
  cv_url TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS about (
  id SERIAL PRIMARY KEY,
  bio TEXT DEFAULT '',
  tagline TEXT DEFAULT '',
  location TEXT DEFAULT '',
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  github_url TEXT DEFAULT '',
  linkedin_url TEXT DEFAULT '',
  twitter_url TEXT DEFAULT '',
  resume_url TEXT DEFAULT '',
  profile_image_url TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS education (
  id SERIAL PRIMARY KEY,
  degree TEXT NOT NULL DEFAULT '',
  institution TEXT DEFAULT '',
  year_start TEXT DEFAULT '',
  year_end TEXT DEFAULT '',
  grade TEXT DEFAULT '',
  description TEXT DEFAULT '',
  logo_url TEXT DEFAULT '',
  order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  description TEXT DEFAULT '',
  tech_stack TEXT[] DEFAULT '{}',
  live_url TEXT DEFAULT '',
  github_url TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  featured BOOLEAN DEFAULT false,
  category TEXT DEFAULT '',
  order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  level INT DEFAULT 80 CHECK (level >= 0 AND level <= 100),
  category TEXT DEFAULT 'General',
  order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS experience (
  id SERIAL PRIMARY KEY,
  role TEXT NOT NULL DEFAULT '',
  company TEXT DEFAULT '',
  year_start TEXT DEFAULT '',
  year_end TEXT DEFAULT 'Present',
  description TEXT DEFAULT '',
  tech_used TEXT[] DEFAULT '{}',
  company_url TEXT DEFAULT '',
  logo_url TEXT DEFAULT '',
  order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS contact (
  id SERIAL PRIMARY KEY,
  heading TEXT DEFAULT 'Let''s Work Together',
  subheading TEXT DEFAULT 'Have a project in mind?',
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  location TEXT DEFAULT '',
  calendly_url TEXT DEFAULT '',
  show_form BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS stats (
  id SERIAL PRIMARY KEY,
  projects_completed INT DEFAULT 0,
  years_experience INT DEFAULT 0,
  happy_clients INT DEFAULT 0,
  github_stars INT DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE hero        ENABLE ROW LEVEL SECURITY;
ALTER TABLE about       ENABLE ROW LEVEL SECURITY;
ALTER TABLE education   ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects    ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills      ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience  ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact     ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats       ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "public_read_hero"        ON hero        FOR SELECT USING (true);
CREATE POLICY "public_read_about"       ON about       FOR SELECT USING (true);
CREATE POLICY "public_read_education"   ON education   FOR SELECT USING (true);
CREATE POLICY "public_read_projects"    ON projects    FOR SELECT USING (true);
CREATE POLICY "public_read_skills"      ON skills      FOR SELECT USING (true);
CREATE POLICY "public_read_experience"  ON experience  FOR SELECT USING (true);
CREATE POLICY "public_read_contact"     ON contact     FOR SELECT USING (true);
CREATE POLICY "public_read_stats"       ON stats       FOR SELECT USING (true);

-- Public write policies (admin saves via anon key server-side)
CREATE POLICY "public_write_hero"        ON hero        FOR ALL USING (true);
CREATE POLICY "public_write_about"       ON about       FOR ALL USING (true);
CREATE POLICY "public_write_education"   ON education   FOR ALL USING (true);
CREATE POLICY "public_write_projects"    ON projects    FOR ALL USING (true);
CREATE POLICY "public_write_skills"      ON skills      FOR ALL USING (true);
CREATE POLICY "public_write_experience"  ON experience  FOR ALL USING (true);
CREATE POLICY "public_write_contact"     ON contact     FOR ALL USING (true);
CREATE POLICY "public_write_stats"       ON stats       FOR ALL USING (true);`

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', fontWeight:700, letterSpacing:'-0.025em', marginBottom:6 }}>
          🔧 Supabase Setup
        </h1>
        <p style={{ color:'var(--text2)', fontSize:'0.88rem' }}>
          Connect a real database so all admin changes persist permanently. Takes ~5 minutes.
        </p>
      </div>

      <div style={{ background:'linear-gradient(135deg, rgba(16,185,129,0.07), rgba(100,80,240,0.07))', border:'1px solid rgba(16,185,129,0.2)', borderRadius:'var(--radius)', padding:24, marginBottom:28 }}>
        <div style={{ fontWeight:600, color:'#6ee7b7', marginBottom:8 }}>✅ Already configured!</div>
        <p style={{ color:'var(--text2)', fontSize:'0.87rem', lineHeight:1.8 }}>
          Your Supabase URL and anon key are already in <code style={{ fontFamily:'var(--font-mono)', color:'var(--accent)', background:'var(--bg3)', padding:'2px 6px', borderRadius:4 }}>.env.local</code>.
          Just run the SQL below once to create the tables, then go to each section and click <strong>Save Changes</strong>.
        </p>
      </div>

      {[
        {
          num: 1, title: 'Open Supabase SQL Editor',
          body: (<p style={{ color:'var(--text2)', fontSize:'0.87rem', lineHeight:1.8 }}>Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" style={{ color:'var(--accent2)' }}>supabase.com</a> → your project → <strong>SQL Editor</strong> → <strong>New Query</strong>.</p>)
        },
        {
          num: 2, title: 'Run this SQL to create all tables',
          body: (
            <div>
              <p style={{ color:'var(--text2)', fontSize:'0.87rem', marginBottom:12 }}>Paste the entire block below and click <strong>Run</strong>:</p>
              <pre style={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:10, padding:'18px 20px', fontFamily:'var(--font-mono)', fontSize:'0.72rem', color:'var(--accent2)', overflowX:'auto', lineHeight:1.8, maxHeight:320, overflowY:'auto', whiteSpace:'pre-wrap' }}>{SQL}</pre>
            </div>
          )
        },
        {
          num: 3, title: 'Seed your data from the admin dashboard',
          body: (<p style={{ color:'var(--text2)', fontSize:'0.87rem', lineHeight:1.8 }}>Go to each section in the sidebar (<Link href="/admin/dashboard/hero" style={{ color:'var(--accent2)' }}>Hero</Link>, <Link href="/admin/dashboard/about" style={{ color:'var(--accent2)' }}>About</Link>, etc.), fill in your real information, then click <strong>Save Changes</strong>. The portfolio updates immediately.</p>)
        },
        {
          num: 4, title: 'Upload images with Supabase Storage',
          body: (<p style={{ color:'var(--text2)', fontSize:'0.87rem', lineHeight:1.8 }}>In Supabase → <strong>Storage</strong> → Create a public bucket named <code style={{ fontFamily:'var(--font-mono)', color:'var(--accent)', background:'var(--bg3)', padding:'2px 6px', borderRadius:4 }}>portfolio</code>. Upload photos there and paste the public URL into avatar, profile image, or project image fields.</p>)
        },
        {
          num: 5, title: 'Deploy to Vercel',
          body: (<p style={{ color:'var(--text2)', fontSize:'0.87rem', lineHeight:1.8 }}>Push to GitHub → import on <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color:'var(--accent2)' }}>vercel.com</a> → add your 3 env variables in project settings (<code style={{ fontFamily:'var(--font-mono)', color:'var(--accent)', fontSize:'0.8rem' }}>NEXT_PUBLIC_SUPABASE_URL</code>, <code style={{ fontFamily:'var(--font-mono)', color:'var(--accent)', fontSize:'0.8rem' }}>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, <code style={{ fontFamily:'var(--font-mono)', color:'var(--accent)', fontSize:'0.8rem' }}>ADMIN_SECRET_KEY</code>) → Deploy.</p>)
        },
      ].map(step => (
        <div key={step.num} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'28px 32px', marginBottom:16, display:'flex', gap:20, alignItems:'flex-start' }}>
          <div style={{ width:36, height:36, borderRadius:'50%', flexShrink:0, background:'linear-gradient(135deg, var(--accent), var(--accent3))', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'0.88rem', color:'white' }}>{step.num}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:600, marginBottom:12, fontSize:'0.95rem' }}>{step.title}</div>
            {step.body}
          </div>
        </div>
      ))}

      <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'24px 28px' }}>
        <div style={{ fontWeight:600, marginBottom:8 }}>🔑 Admin Key</div>
        <p style={{ color:'var(--text2)', fontSize:'0.87rem', lineHeight:1.8 }}>
          Your admin password is set in <code style={{ fontFamily:'var(--font-mono)', color:'var(--accent)', background:'var(--bg3)', padding:'2px 6px', borderRadius:4 }}>.env.local</code> as <code style={{ fontFamily:'var(--font-mono)', color:'var(--accent)', background:'var(--bg3)', padding:'2px 6px', borderRadius:4 }}>ADMIN_SECRET_KEY</code>. Change it to anything you want — just restart the dev server after.
          The login page at <code style={{ fontFamily:'var(--font-mono)', color:'var(--accent2)' }}>/admin/login</code> is completely hidden from the public portfolio.
        </p>
      </div>
    </div>
  )
}
