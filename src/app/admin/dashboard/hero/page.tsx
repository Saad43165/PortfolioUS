import { getPortfolioData } from '@/lib/portfolio'
import HeroAdminClient from './HeroAdminClient'

export default async function HeroAdminPage() {
  const data = await getPortfolioData()
  return <HeroAdminClient initial={data.hero} />
}
