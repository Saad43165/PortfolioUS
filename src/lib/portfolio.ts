import { DEFAULT_DATA } from './defaults'
import type { PortfolioData } from '@/types'

export async function getPortfolioData(): Promise<PortfolioData> {
  return DEFAULT_DATA;
}
