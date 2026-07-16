import Navbar from '../sections/Navbar'
import Hero from '../sections/Hero'
import Stats from '../sections/Stats'
import Categories from '../sections/Categories'
import Listings from '../sections/Listings'
import MapSection from '../sections/MapSection'
import AISection from '../sections/AISection'
import Projects from '../sections/Projects'
import Services from '../sections/Services'
import CTA from '../sections/CTA'
import Footer from '../sections/Footer'

export default function Home() {
  return (
    <div className="font-geo min-h-screen bg-white antialiased">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Categories />
        <Listings />
        <MapSection />
        <AISection />
        <Projects />
        <Services />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
