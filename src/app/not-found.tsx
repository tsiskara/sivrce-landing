import Link from 'next/link'
import { SearchX, ArrowLeft } from 'lucide-react'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'

export default function NotFound() {
  return (
    <div className="font-geo min-h-screen bg-sv-cloud antialiased">
      <Navbar />
      <main className="mx-auto flex min-h-[80vh] max-w-[1440px] flex-col items-center justify-center px-5 pt-24 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-card bg-sv-blue/10">
          <SearchX className="h-9 w-9 text-sv-blue" />
        </span>
        <h1 className="mt-6 text-[30px] font-black tracking-[-0.02em] text-sv-ink md:text-[38px]">
          განცხადება ვერ მოიძებნა
        </h1>
        <p className="mt-3 max-w-[420px] text-[15px] font-semibold leading-relaxed text-sv-ink/50">
          შესაძლოა განცხადება უკვე წაშლილია ან ბმული არასწორია.
          ნახე აქტიური შეთავაზებები ძიების გვერდზე.
        </p>
        <Link
          href="/search"
          className="mt-8 flex h-12 items-center gap-2 rounded-full bg-sv-blue px-7 text-[15px] font-extrabold text-white shadow-glow-blue transition-all hover:bg-sv-blue-deep"
        >
          <ArrowLeft className="h-4 w-4" /> ძიებაზე დაბრუნება
        </Link>
      </main>
      <Footer />
    </div>
  )
}
