import { getPortfolioData } from '@/lib/portfolio'
import Client from './Client'
export default async function Page() {
  const data = await getPortfolioData()
  return <Client initial={data.contact} />
}
