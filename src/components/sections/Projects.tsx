import { MapPin, ArrowRight, BadgeCheck, Building2, CalendarCheck, Star } from 'lucide-react'
import { Reveal } from '@/components/Reveal'

const PROJECTS = [
  {
    img: '/images/np1.png',
    name: 'Downtown Residence',
    dev: 'm2 დეველოპმენტი',
    location: 'საბურთალო, თბილისი',
    priceFrom: '$1,450',
    done: 72,
    finish: '2027 Q2',
    flats: 214,
    rating: 4.8,
  },
  {
    img: '/images/np2.png',
    name: 'Batumi Riviera Tower',
    dev: 'Alliance Group',
    location: 'ახალი ბულვარი, ბათუმი',
    priceFrom: '$1,780',
    done: 45,
    finish: '2028 Q1',
    flats: 168,
    rating: 4.9,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="bg-sv-cloud py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-sv-blue/10 px-4 py-1.5 text-[12px] font-black uppercase tracking-wider text-sv-blue">
              <Building2 className="h-3.5 w-3.5" /> ახალი კორპუსები
            </span>
            <h2 className="text-[30px] font-black tracking-[-0.02em] text-sv-ink md:text-[40px]">
              მშენებარე პროექტები
            </h2>
            <p className="mt-2 text-[15px] font-semibold text-sv-ink/50 md:text-[16px]">
              ყველა დეველოპერი, ყველა პროექტი — შეფასებებით და 3D ვიზუალიზაციით
            </p>
          </div>
          <a href="#" className="group flex items-center gap-2 text-[15px] font-extrabold text-sv-blue hover:text-sv-blue-deep">
            136 პროექტის ნახვა
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.12}>
              <article className="group cursor-pointer overflow-hidden rounded-card border border-sv-ink/[0.06] bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover">
                <div className="relative aspect-[16/9] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sv-navy/75 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                    <div>
                      <h3 className="text-[22px] font-black text-white drop-shadow">{p.name}</h3>
                      <p className="flex items-center gap-1.5 text-[13px] font-bold text-white/80">
                        <BadgeCheck className="h-4 w-4 text-sv-success" /> {p.dev}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 rounded-control bg-white/95 px-3 py-1.5 text-[14px] font-black text-sv-ink">
                      <Star className="h-3.5 w-3.5 fill-sv-orange text-sv-orange" /> {p.rating}
                    </div>
                  </div>
                  {/* progress */}
                  <div className="absolute left-5 top-4 rounded-full bg-sv-navy/55 px-3.5 py-1.5 text-[12px] font-extrabold text-white backdrop-blur">
                    აშენებულია {p.done}%
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 p-5">
                  <span className="flex items-center gap-1.5 text-[13px] font-bold text-sv-ink/55">
                    <MapPin className="h-4 w-4 text-sv-ink/35" /> {p.location}
                  </span>
                  <span className="flex items-center gap-1.5 text-[13px] font-bold text-sv-ink/55">
                    <CalendarCheck className="h-4 w-4 text-sv-ink/35" /> ჩაბარება {p.finish}
                  </span>
                  <span className="flex items-center gap-1.5 text-[13px] font-bold text-sv-ink/55">
                    <Building2 className="h-4 w-4 text-sv-ink/35" /> {p.flats} ბინა
                  </span>
                  <span className="ml-auto text-[16px] font-black text-sv-blue">
                    {p.priceFrom}<span className="text-[12px] font-bold text-sv-ink/45"> /მ²-დან</span>
                  </span>
                </div>
                {/* progress bar */}
                <div className="mx-5 mb-5 h-1.5 overflow-hidden rounded-full bg-sv-ink/[0.07]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sv-blue to-sv-violet transition-all duration-1000"
                    style={{ width: `${p.done}%` }}
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
