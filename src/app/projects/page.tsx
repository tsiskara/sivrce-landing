import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Projects from '@/components/sections/Projects'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'ახალი პროექტები თბილისში და ბათუმში — მშენებარე კორპუსები',
  description:
    'ახალი საცხოვრებელი პროექტები თბილისში და ბათუმში: დეველოპერების შეფასებები, ფასები კვადრატულზე, მშენებლობის პროგრესი და ჩაბარების ვადები — ყველა პროექტი ერთ სივრცეში.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'ახალი პროექტები თბილისში და ბათუმში | sivrce',
    description:
      'დეველოპერების შეფასებები, ფასები კვადრატულზე, მშენებლობის პროგრესი — ყველა ახალი პროექტი ერთ სივრცეში.',
    type: 'website',
  },
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-sv-surface">
      <Navbar />
      <main id="main" className="pt-16">
        <Projects />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
