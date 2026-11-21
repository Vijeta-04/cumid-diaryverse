import { useEffect, useState } from 'react'
import { Heart, ShoppingBag, Menu, X, Check } from 'lucide-react'
import Diary3D from './Diary3D.jsx'
import { DESIGNS, inr } from '../data.js'

const links = [['Home','#home'], ['Explore Diaries','#collection'], ['3D Diary Studio','#studio'], ['Our Story','#story']]

export function Navbar({ cart, wish }) {
  const [open, setOpen] = useState(false), [sc, setSc] = useState(false)
  useEffect(() => { const f = () => setSc(window.scrollY > 30); f(); window.addEventListener('scroll', f, { passive:true }); return () => window.removeEventListener('scroll', f) }, [])
  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${sc ? 'bg-ivory/95 shadow-[0_1px_0_#e6d9c6] py-1' : 'bg-ivory py-3'}`}>
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between" aria-label="Main">
        <a href="#home" className="font-serif text-3xl tracking-wide">cumid<span className="text-rose">.</span>store</a>
        <ul className="hidden md:flex gap-8 text-sm">{links.map(([n,h]) => <li key={h}><a href={h} className="py-2 border-b border-transparent hover:border-plum transition">{n}</a></li>)}</ul>
        <div className="flex items-center gap-1">
          <a href="#studio" className="relative ico border-0" aria-label={`Wishlist, ${wish} saved`}><Heart size={20} />{wish > 0 && <b className="absolute top-1 right-0 text-[10px] bg-rose text-plum rounded-full w-4 h-4 grid place-items-center">{wish}</b>}</a>
          <a href="#studio" className="relative ico border-0" aria-label={`Shopping bag, ${cart} items`}><ShoppingBag size={20} /><b className="absolute top-1 right-0 text-[10px] bg-plum text-ivory rounded-full w-4 h-4 grid place-items-center">{cart}</b></a>
          <button className="ico border-0 md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </nav>
      {open && <ul className="md:hidden px-5 pb-4 pt-2 bg-ivory border-t border-plum/10">{links.map(([n,h]) => <li key={h}><a href={h} onClick={() => setOpen(false)} className="block py-3 font-serif text-2xl">{n}</a></li>)}</ul>}
    </header>
  )
}

export function Hero() {
  const items = [[DESIGNS[2], 0, 70, -30, '0s'], [DESIGNS[5], 290, 90, 26, '1.2s'], [DESIGNS[0], 150, 0, -14, '.6s']]
  return (
    <section id="home" className="px-5 sm:px-8 pt-10 pb-20 max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-6 items-center">
      <div>
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-[5.5rem] leading-[1.02]">Every page holds a little magic.</h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed">Your thoughts, your dreams, your little everyday moments — give them a beautiful place to live.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#collection" className="btn btn-dark">Explore the Collection</a>
          <a href="#studio" className="btn btn-line">Design Your Diary</a>
        </div>
      </div>
      <div className="h-[330px] sm:h-[430px] lg:h-[520px] flex justify-center overflow-hidden" aria-hidden="true">
        <div className="relative w-[520px] h-[500px] shrink-0 origin-top scale-[.6] sm:scale-[.8] lg:scale-100">
          {items.map(([d, l, t, r, dl]) => <div key={d.id} className="float absolute" style={{ left:l, top:t, animationDelay:dl }}><Diary3D design={d} rotY={r} /></div>)}
        </div>
      </div>
    </section>
  )
}

export function Collection({ wish, toggleWish, preview }) {
  return (
    <section id="collection" className="px-5 sm:px-8 py-20 max-w-7xl mx-auto" aria-labelledby="col-h">
      <h2 id="col-h" className="font-serif text-4xl sm:text-5xl">Explore diaries</h2>
      <p className="mt-3 max-w-md">Six covers, each with its own mood. Pick one to see it turn in the studio.</p>
      <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {DESIGNS.map(d => (
          <li key={d.id} className="lg:[&:nth-child(3n+2)]:mt-12">
            <div className="relative bg-cream/70 h-[390px] flex items-center justify-center overflow-hidden">
              <Diary3D design={d} rotY={-22} zoom={.92} />
              {d.tag && <span className="absolute top-3 left-3 text-xs bg-ivory px-2 py-1">{d.tag}</span>}
              <button className="ico absolute top-3 right-3 bg-ivory" aria-pressed={wish.includes(d.id)} aria-label={`${wish.includes(d.id) ? 'Remove' : 'Add'} ${d.name} ${wish.includes(d.id) ? 'from' : 'to'} wishlist`} onClick={() => toggleWish(d)}>
                <Heart size={18} fill={wish.includes(d.id) ? '#B5707A' : 'none'} stroke={wish.includes(d.id) ? '#B5707A' : 'currentColor'} /></button>
            </div>
            <div className="mt-4 flex justify-between gap-4 items-baseline"><h3 className="font-serif text-2xl">{d.name}</h3><span>{inr(d.price)}</span></div>
            <p className="text-sm mt-1 max-w-xs">{d.desc}</p>
            <button className="mt-3 text-sm underline underline-offset-4 min-h-[44px]" onClick={() => preview(d.id)}>Preview in studio</button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function BrandStory() {
  return (
    <section id="story" className="px-5 sm:px-8 py-24 bg-plum text-ivory" aria-labelledby="st-h">
      <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.3fr] gap-10 md:gap-20">
        <h2 id="st-h" className="font-serif text-4xl sm:text-6xl leading-[1.05]">A diary remembers what you’d forget.</h2>
        <div className="font-serif text-xl sm:text-2xl leading-relaxed space-y-6 text-ivory/90">
          <p>Years from now, you won’t recall the exact weather or what you ate. But a line written on an ordinary Tuesday will bring the whole afternoon back.</p>
          <p>We make diaries for those lines: the dreams you half-believe, the worries you can finally set down, the small things that turned out to be the big ones.</p>
          <p className="italic text-rose">Cumid is a little place to keep them.</p>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="px-5 sm:px-8 py-14 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div><p className="font-serif text-3xl">cumid<span className="text-rose">.</span>store</p><p className="mt-2 text-sm">Diaryverse — a little world of your stories.</p></div>
        <ul className="flex flex-wrap gap-x-8 gap-y-1 text-sm">{links.map(([n,h]) => <li key={h}><a className="inline-block py-2" href={h}>{n}</a></li>)}</ul>
        <p className="text-sm text-plum/70 max-w-[220px]"></p>
      </div>
      <p className="mt-10 pt-6 border-t border-plum/15 text-xs text-plum/70">© {new Date().getFullYear()} cumid.store</p>
    </footer>
  )
}

export function ToastNotification({ toasts }) {
  return (
    <div className="fixed bottom-5 inset-x-0 z-50 flex flex-col items-center gap-2 px-4 pointer-events-none" role="status" aria-live="polite">
      {toasts.map(t => <div key={t.id} className="toast bg-plum text-ivory px-5 py-3 text-sm flex items-center gap-2 shadow-xl"><Check size={16} className="text-sage" />{t.m}</div>)}
    </div>
  )
}
