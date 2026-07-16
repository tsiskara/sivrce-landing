import { useRef } from 'react'
import { Link } from 'react-router'
import { ArrowRight, ChevronLeft, ChevronRight, Crown } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import ListingCard from '../components/ListingCard'
import { LISTINGS } from '../data/listings'

const FEATURED = LISTINGS.slice(0, 6)

export default function Listings() {
  const scroller = useRef<HTMLDivElement>(null)
  const scrollBy = (dir: number) =>
    scroller.current?.scrollBy({ left: dir * 420, behavior: 'smooth' })

  return (
    <section className="relative overflow-hidden bg-[#f6f7fb] py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#ff6a2d]/10 px-4 py-1.5 text-[12px] font-black uppercase tracking-wider text-[#ff6a2d]">
              <Crown className="h-3.5 w-3.5" /> არჩეული შეთავაზებები
            </span>
            <h2 className="text-[30px] font-black tracking-[-0.02em] text-[#0a1030] md:text-[40px]">
              SUPER VIP განცხადებები
            </h2>
            <p className="mt-2 text-[15px] font-semibold text-[#0a1030]/50 md:text-[16px]">
              პრემიუმ ქონებები AI ფასის შეფასებით
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden gap-2 md:flex">
              <button
                onClick={() => scrollBy(-1)}
                aria-label="წინა"
                className="grid h-11 w-11 place-items-center rounded-full border border-[#0a1030]/10 bg-white text-[#0a1030] transition-all hover:border-[#2e6bff] hover:text-[#2e6bff]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollBy(1)}
                aria-label="შემდეგი"
                className="grid h-11 w-11 place-items-center rounded-full border border-[#0a1030]/10 bg-white text-[#0a1030] transition-all hover:border-[#2e6bff] hover:text-[#2e6bff]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <Link
              to="/search"
              className="group flex items-center gap-2 text-[15px] font-extrabold text-[#2e6bff] transition-colors hover:text-[#1a4fd6]"
            >
              ყველას ნახვა
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>

      <div
        ref={scroller}
        className="scrollbar-hide flex gap-6 overflow-x-auto px-5 pb-4 md:px-10 lg:px-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))]"
      >
        {FEATURED.map((l, i) => (
          <ListingCard key={l.id} l={l} i={i} />
        ))}
      </div>
    </section>
  )
}
