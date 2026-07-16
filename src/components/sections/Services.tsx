import { Users, Building2, Paintbrush, Landmark, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/Reveal'

const SERVICES = [
  {
    icon: Users,
    title: 'აგენტები და სააგენტოები',
    text: '1,800+ ვერიფიცირებული პროფესიონელი შეფასებებით — აირჩიე საუკეთესო.',
    tint: '#2e6bff',
  },
  {
    icon: Building2,
    title: 'დეველოპერები',
    text: 'ყველა დეველოპერული კომპანია, მათი პროექტები და რეალური რეიტინგი.',
    tint: '#1a3fc0',
  },
  {
    icon: Paintbrush,
    title: 'რემონტი და კალკულატორი',
    text: 'რემონტის კომპანიები შეფასებებით და ღირებულების ზუსტი კალკულატორი.',
    tint: '#ff6a2d',
  },
  {
    icon: Landmark,
    title: 'იპოთეკა და ფინანსები',
    text: 'ბანკების შეთავაზებების შედარება და წინასწარი დამტკიცება ონლაინ.',
    tint: '#0a1030',
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal className="mb-12 text-center">
          <h2 className="text-[30px] font-black tracking-[-0.02em] text-sv-ink md:text-[40px]">
            ყველაფერი უძრავი ქონებისთვის
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[15px] font-semibold text-sv-ink/50 md:text-[16px]">
            ძიებიდან გარიგებამდე — სრული ეკოსისტემა ერთ პლატფორმაზე
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <a
                href="#"
                className="group relative block h-full overflow-hidden rounded-card border border-sv-ink/[0.06] bg-gradient-to-b from-sv-cloud to-white p-7 transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:shadow-card-hover"
              >
                <span
                  className="grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: `${s.tint}14`, color: s.tint }}
                >
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-[18px] font-extrabold text-sv-ink">{s.title}</h3>
                <p className="mt-2.5 text-[14px] font-medium leading-relaxed text-sv-ink/55">{s.text}</p>
                <span className="mt-6 flex items-center gap-1.5 text-[14px] font-extrabold" style={{ color: s.tint }}>
                  გაეცანი
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
                  style={{ backgroundColor: s.tint }}
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
