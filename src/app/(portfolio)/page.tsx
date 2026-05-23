import { getPortfolioData } from '@/lib/portfolio'
import Navbar from '@/components/portfolio/Navbar'
import HeroSection from '@/components/portfolio/HeroSection'
import AboutSection from '@/components/portfolio/AboutSection'
import EducationSection from '@/components/portfolio/EducationSection'
import ProjectsSection from '@/components/portfolio/ProjectsSection'
import SkillsSection from '@/components/portfolio/SkillsSection'
import ExperienceSection from '@/components/portfolio/ExperienceSection'
import ContactSection from '@/components/portfolio/ContactSection'
import Footer from '@/components/portfolio/Footer'
import ScrollToTop from '@/components/ui/ScrollToTop'

// On-demand revalidation — portfolio stays cached until admin saves,
// then /api/admin/revalidate instantly clears the cache.
export const revalidate = false
export const dynamic = 'force-static'

export default async function PortfolioPage() {
  const data = await getPortfolioData()

  return (
    <>
      <Navbar name={data.hero.name} />
      <main>
        <HeroSection  hero={data.hero}           stats={data.stats} />
        <AboutSection about={data.about}         hero={data.hero} />
        <EducationSection  education={data.education} />
        <ProjectsSection   projects={data.projects} />
        <SkillsSection     skills={data.skills} />
        <ExperienceSection experience={data.experience} />
        <ContactSection    contact={data.contact} about={data.about} />
      </main>
      <Footer hero={data.hero} about={data.about} />
      <ScrollToTop />
    </>
  )
}
