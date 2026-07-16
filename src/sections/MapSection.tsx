import { MousePointerClick, Building2, BarChart3, Layers, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Reveal } from '../components/Reveal'

const FEATURES = [
  {
    icon: MousePointerClick,
    title: 'დააჭირე ნებისმიერ შენობას',
    text: '3D რუკაზე შენობაზე დაჭერით ხედავ ყველა გასაყიდ და გასაქირავებელ ფართს კონკრეტულ კორპუსში.',
  },
  {
    icon: Building2,
    title: 'მშენებარე კორპუსების ვიზუალიზაცია',
    text: 'ჯერ არსასრულ პროექტებსაც კი ვაჩვენებთ 3D-ში — აირჩიე ბინა პირდაპირ სამშენებლო მაკეტიდან.',
  },
  {
    icon: BarChart3,
    title: 'უბნის სრული ანალიტიკა',
    text: 'ფასების დინამიკა, მ²-ის ღირებულება, ინფრასტრუქტურა და ინვესტიციული პოტენციალი ერთ ეკრანზე.',
  },
  {
    icon: Layers,
    title: '2D / 3D რეჟიმები',
    text: 'გადართე კლასიკურ რუკასა და იმერსიულ 3D ხედს შორის ერთი შეხებით — ნებისმიერ მოწყობილობაზე.',
  },
]

export default function MapSection() {
  return (
    <section className="relative overflow-hidden bg-sv-navy py-20 md:py-32">
      <div className="absolute inset-0 bg-grid-dark" />
      <div className="absolute -left-40 top-1/3 h-[480px] w-[480px] animate-float rounded-full bg-sv-blue/15 blur-[140px]" />
      <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] animate-float rounded-full bg-sv-orange/10 blur-[140px]" style={{ animationDelay: '-4s' }} />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
          {/* Copy */}
          <div>
            <Reveal>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[12px] font-black uppercase tracking-wider text-sv-blue-light">
                <Layers className="h-3.5 w-3.5" /> ექსკლუზიური ტექნოლოგია
              </span>
              <h2 className="text-balance text-[32px] font-black leading-[1.12] tracking-[-0.02em] text-white md:text-[46px]">
                პირველი <span className="text-gradient-blue">ინტერაქტიული 3D რუკა</span> საქართველოში
              </h2>
              <p className="mt-5 max-w-[520px] text-[15px] font-medium leading-relaxed text-white/60 md:text-[17px]">
                დაივიწყე უსასრულო სიები. ნახე ქალაქი ისე, როგორც არის — და იპოვე
                შენი ბინა პირდაპირ რუკიდან.
              </p>
            </Reveal>

            <div className="mt-10 space-y-3">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={0.1 + i * 0.08}>
                  <div className="group flex gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition-all duration-500 hover:border-sv-blue/40 hover:bg-white/[0.06]">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sv-blue/15 text-sv-blue-light transition-all duration-500 group-hover:bg-sv-blue group-hover:text-white">
                      <f.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-[16px] font-extrabold text-white">{f.title}</h3>
                      <p className="mt-1 text-[14px] font-medium leading-relaxed text-white/55">{f.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.45}>
              <a
                href="#"
                className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-4 text-[15px] font-extrabold text-sv-navy transition-all duration-300 hover:bg-sv-blue-light hover:shadow-glow-blue"
              >
                გახსენი 3D რუკა
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>

          {/* Visual */}
          <Reveal delay={0.2} className="relative">
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative overflow-hidden rounded-card border border-white/10 shadow-showcase-blue"
            >
              <img src="/images/map3d.png" alt="სივრცის 3D რუკა — თბილისი" className="w-full" loading="lazy" />
              <div className="absolute inset-0 rounded-card ring-1 ring-inset ring-white/10" />
              {/* Live pin */}
              <div className="absolute left-[58%] top-[34%]">
                <span className="block h-4 w-4 animate-pin rounded-full bg-sv-orange" />
              </div>
            </motion.div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="absolute -bottom-6 -left-2 rounded-tile glass p-4 shadow-soft backdrop-blur-2xl md:-left-8"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-sv-orange/20 text-sv-orange">
                  <Building2 className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-[13px] font-extrabold text-white">North Avenue Tower</div>
                  <div className="text-[12px] font-bold text-white/55">14 ბინა იყიდება • $2,400/მ²-დან</div>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
