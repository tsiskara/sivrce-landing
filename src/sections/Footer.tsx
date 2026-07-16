import { Facebook, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { Logo } from '../components/Reveal'

const COLS = [
  {
    title: 'უძრავი ქონება',
    links: ['ბინები იყიდება', 'სახლები იყიდება', 'ქირავდება', 'დღიური ქირა', 'მიწის ნაკვეთები', 'კომერციული ფართები'],
  },
  {
    title: 'სერვისები',
    links: ['ახალი პროექტები', 'აგენტები და სააგენტოები', 'დეველოპერები', 'რემონტის კალკულატორი', 'იპოთეკა', 'AI ფასის შეფასება'],
  },
  {
    title: 'კომპანია',
    links: ['ჩვენ შესახებ', 'კარიერა', 'ბლოგი', 'პარტნიორობა', 'სარეკლამო სერვისები', 'კონტაქტი'],
  },
]

const SOCIALS = [
  { icon: Facebook, label: 'Facebook' },
  { icon: Instagram, label: 'Instagram' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Linkedin, label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#04081d]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-[320px] text-[14px] font-medium leading-relaxed text-white/50">
              სივრცე — უძრავი ქონება ერთ სივრცეში. №1 ტექნოლოგიური პლატფორმა
              საქართველოში: 3D რუკა, AI შეფასება და სრული ეკოსისტემა.
            </p>
            <div className="mt-6 space-y-2.5 text-[14px] font-semibold text-white/60">
              <a href="mailto:info@sivrce.ge" className="flex items-center gap-2.5 transition-colors hover:text-white">
                <Mail className="h-4 w-4 text-[#2e6bff]" /> info@sivrce.ge
              </a>
              <a href="tel:+995322000000" className="flex items-center gap-2.5 transition-colors hover:text-white">
                <Phone className="h-4 w-4 text-[#2e6bff]" /> +995 32 2 00 00 00
              </a>
              <span className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-[#2e6bff]" /> თბილისი, საქართველო
              </span>
            </div>
            <div className="mt-7 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/60 transition-all duration-300 hover:border-[#2e6bff] hover:bg-[#2e6bff] hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <h4 className="text-[13px] font-black uppercase tracking-wider text-white/40">{c.title}</h4>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[14px] font-semibold text-white/65 transition-colors hover:text-white"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-8">
          <p className="text-[13px] font-semibold text-white/35">
            © 2026 სივრცე • sivrce.ge — ყველა უფლება დაცულია
          </p>
          <div className="flex gap-6 text-[13px] font-semibold text-white/45">
            <a href="#" className="transition-colors hover:text-white">წესები და პირობები</a>
            <a href="#" className="transition-colors hover:text-white">კონფიდენციალურობა</a>
            <a href="#" className="transition-colors hover:text-white">ქუქიები</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
