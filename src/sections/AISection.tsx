import { Sparkles, TrendingDown, TrendingUp, Minus, ArrowRight, BrainCircuit } from 'lucide-react'
import { motion } from 'framer-motion'
import { Reveal } from '../components/Reveal'

const BARS = [42, 58, 50, 66, 61, 78, 72, 88, 81, 95, 90, 100]

export default function AISection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Visual card */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-[560px]">
              <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-[#2e6bff]/12 via-transparent to-[#ff6a2d]/10 blur-2xl" />
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                className="relative overflow-hidden rounded-[28px] border border-[#0a1030]/[0.07] bg-white shadow-card-hover"
              >
                {/* header */}
                <div className="flex items-center justify-between border-b border-[#0a1030]/[0.06] bg-gradient-to-r from-[#060d2b] to-[#12235c] px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-[#8fb4ff]">
                      <BrainCircuit className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-[14px] font-extrabold text-white">Sivrce AI Valuation</div>
                      <div className="text-[11px] font-bold text-white/50">48 პარამეტრის ანალიზი</div>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-[#4ade80]/15 px-3 py-1 text-[11px] font-black text-[#4ade80]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" /> LIVE
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-[12px] font-bold uppercase tracking-wider text-[#0a1030]/45">
                        საბაზარო ღირებულება
                      </div>
                      <div className="mt-1 text-[34px] font-black tracking-tight text-[#0a1030]">$128,400</div>
                      <div className="text-[13px] font-bold text-[#0a1030]/50">$1,980/მ² • ვაკე, თბილისი</div>
                    </div>
                    <div className="rounded-2xl bg-[#16a34a]/10 px-4 py-2.5 text-right">
                      <div className="flex items-center gap-1 text-[15px] font-black text-[#16a34a]">
                        <TrendingUp className="h-4 w-4" /> +8.4%
                      </div>
                      <div className="text-[11px] font-bold text-[#0a1030]/45">ბოლო 12 თვეში</div>
                    </div>
                  </div>

                  {/* chart */}
                  <div className="mt-6 flex h-[110px] items-end gap-2">
                    {BARS.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.05, duration: 0.6, ease: [0.21, 0.65, 0.2, 1] }}
                        className={`flex-1 rounded-t-md ${
                          i === BARS.length - 1
                            ? 'bg-gradient-to-t from-[#ff6a2d] to-[#ffb25e]'
                            : 'bg-gradient-to-t from-[#2e6bff]/25 to-[#2e6bff]/60'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-[11px] font-bold text-[#0a1030]/35">
                    <span>2025 ივლ</span>
                    <span>2026 ივლ</span>
                  </div>

                  {/* verdict */}
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[
                      { icon: TrendingDown, label: 'ბაზარზე დაბალი', val: '12%', good: true },
                      { icon: Minus, label: 'უბნის საშუალო', val: '$2,210', good: null },
                      { icon: TrendingUp, label: 'ზრდის პროგნოზი', val: '+6.1%', good: true },
                    ].map((s) => (
                      <div key={s.label} className="rounded-2xl bg-[#f6f7fb] p-3.5 text-center">
                        <s.icon className={`mx-auto h-4 w-4 ${s.good ? 'text-[#16a34a]' : 'text-[#0a1030]/40'}`} />
                        <div className="mt-1.5 text-[16px] font-black text-[#0a1030]">{s.val}</div>
                        <div className="mt-0.5 text-[10.5px] font-bold leading-tight text-[#0a1030]/45">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#2e6bff]/10 px-4 py-1.5 text-[12px] font-black uppercase tracking-wider text-[#2e6bff]">
                <Sparkles className="h-3.5 w-3.5" /> AI ტექნოლოგია
              </span>
              <h2 className="text-balance text-[32px] font-black leading-[1.12] tracking-[-0.02em] text-[#0a1030] md:text-[46px]">
                იცოდე ნამდვილი ფასი — <span className="text-gradient-blue">ყიდვამდე</span>
              </h2>
              <p className="mt-5 max-w-[520px] text-[15px] font-medium leading-relaxed text-[#0a1030]/55 md:text-[17px]">
                ჩვენი AI 48 პარამეტრს ანალიზებს — მდებარეობა, იატაკი, ხედი, რემონტი,
                ბაზრის დინამიკა — და გეუბნება, რამდენად კარგი გარიგებაა კონკრეტული ქონება.
              </p>
            </Reveal>

            <div className="mt-8 space-y-4">
              {[
                'ყოველი განცხადება იღებს AI ქულას 0-დან 100-მდე',
                'ფასების ისტორია და პროგნოზი უბნების მიხედვით',
                'შეადარე მსგავსი ქონებები ერთი შეხებით',
              ].map((t, i) => (
                <Reveal key={t} delay={0.1 + i * 0.08}>
                  <div className="flex items-center gap-3.5">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#2e6bff] text-[13px] font-black text-white">
                      {i + 1}
                    </span>
                    <p className="text-[15px] font-bold text-[#0a1030]/75">{t}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4}>
              <a
                href="#"
                className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-[#060d2b] px-7 py-4 text-[15px] font-extrabold text-white transition-all duration-300 hover:bg-[#12235c] hover:shadow-[0_16px_48px_-12px_rgba(6,13,43,0.5)]"
              >
                შეაფასე შენი ქონება
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
