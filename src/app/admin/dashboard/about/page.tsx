import { getPortfolioData } from '@/lib/portfolio'
import AboutAdminClient from './AboutAdminClient'
export default async function AboutAdminPage() {
  const data = await getPortfolioData()
  return <AboutAdminClient initial={data.about} />
}
