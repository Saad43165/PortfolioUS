export interface HeroData {
  id?: number
  name: string
  title: string
  subtitle: string
  cta_primary_text: string
  cta_primary_link: string
  cta_secondary_text: string
  cta_secondary_link: string
  avatar_url: string
  available_for_work: boolean
  tagline_badge?: string       // optional custom badge text
  cv_url: string
}

export interface AboutData {
  id?: number
  bio: string
  tagline: string
  location: string
  email: string
  phone: string
  github_url: string
  linkedin_url: string
  twitter_url: string
  resume_url: string
  profile_image_url: string
}

export interface Education {
  id: number
  degree: string
  institution: string
  year_start: string
  year_end: string
  grade: string
  description: string
  logo_url: string
  order_index: number
}

export interface Project {
  id: number
  title: string
  description: string
  tech_stack: string[]
  live_url: string
  github_url: string
  image_url: string
  featured: boolean
  category: string
  order_index: number
}

export interface Skill {
  id: number
  name: string
  level: number
  category: string
  order_index: number
}

export interface Experience {
  id: number
  role: string
  company: string
  year_start: string
  year_end: string
  description: string
  tech_used: string[]
  company_url: string
  logo_url: string
  order_index: number
}

export interface ContactData {
  id?: number
  heading: string
  subheading: string
  email: string
  phone: string
  location: string
  calendly_url: string
  show_form: boolean
}

export interface StatsData {
  id?: number
  projects_completed: number
  years_experience: number
  happy_clients: number
  github_stars: number
}

export interface PortfolioData {
  hero: HeroData
  about: AboutData
  education: Education[]
  projects: Project[]
  skills: Skill[]
  experience: Experience[]
  contact: ContactData
  stats: StatsData
}
