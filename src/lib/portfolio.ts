import { DEFAULT_DATA } from './defaults'
import { fetchSingle, fetchAll } from './supabase'
import type { PortfolioData } from '@/types'

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const [hero, about, education, projects, skills, experience, contact, stats] =
      await Promise.all([
        fetchSingle('hero', DEFAULT_DATA.hero),
        fetchSingle('about', DEFAULT_DATA.about),
        fetchAll('education', DEFAULT_DATA.education),
        fetchAll('projects', DEFAULT_DATA.projects),
        fetchAll('skills', DEFAULT_DATA.skills),
        fetchAll('experience', DEFAULT_DATA.experience),
        fetchSingle('contact', DEFAULT_DATA.contact),
        fetchSingle('stats', DEFAULT_DATA.stats),
      ])
    return { hero, about, education, projects, skills, experience, contact, stats }
  } catch (e) {
    console.error('Failed to fetch portfolio data, using defaults:', e)
    return DEFAULT_DATA
  }
}
