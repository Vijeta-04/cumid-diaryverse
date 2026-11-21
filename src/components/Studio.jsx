import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Repeat2, ZoomIn, ZoomOut, RotateCcw, Heart, ShoppingBag } from 'lucide-react'
import Diary3D from './Diary3D.jsx'
import { DESIGNS, COLORS, THEMES, inr } from '../data.js'

const DEF = { x:-8, y:-25, z:1 }
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

export default function Studio({ active, setActive, wish, toggleWish, addToBag }) {
  const d = DESIGNS.find(x => x.id === active)
  const [color, setColor] = useState(null), [art, setArt] = useState(null), [text, setText] = useState('')
  const [rx, setRx] = useState(DEF.x), [ry, setRy] = useState(DEF.y), [zoom, setZoom] = useState(DEF.z)
  const [drag, setDrag] = useState(false), [pop, setPop] = useState(false), [busy, setBusy] = useState(false)
  const last = useRef(null)
  useEffect(() => { setColor(null); setArt(null) }, [active])
  const price = d.price + (text.trim() ? 99 : 0)
  const wished = wish.includes(d.id)
  const back = (((ry % 360) + 360) % 360) > 90 && (((ry % 360) + 360) % 360) < 270
  const down = e => { last.current = [e.clientX, e.clientY]; setDrag(true); e.currentTarget.setPointerCapture(e.pointerId) }
  const move = e => { if (!last.current) return
    setRy(v => v + (e.clientX - last.current[0]) * 0.6); setRx(v => clamp(v - (e.clientY - last.current[1]) * 0.4, -40, 40)); last.current = [e.clientX, e.clientY] }
  const up = () => { last.current = null; setDrag(false) }
  const key = e => { if (e.key === 'ArrowLeft') setRy(v => v - 30); if (e.key === 'ArrowRight') setRy(v => v + 30) }
  const pick = id => { if (id === active) return; setBusy(true); setActive(id); setTimeout(() => setBusy(false), 450) }
  const wishClick = () => { toggleWish(d); setPop(true); setTimeout(() => setPop(false), 400) }
  const add = () => addToBag({ id:d.id, name:d.name, price, color:color || d.color, text:text.trim() })
  const ctl = (label, Icon, fn) => <button className="ico" aria-label={label} title={label} onClick={fn}><Icon size={18} /></button>

  return (
    <section id="studio" className="px-5 sm:px-8 py-20 bg-cream/60" aria-labelledby="studio-h">
      <div className="max-w-7xl mx-auto">
        <h2 id="studio-h" className="font-serif text-4xl sm:text-5xl max-w-xl leading-tight">The 3D Diary Studio</h2>
        <p className="mt-3 max-w-md">Hold, turn and flip your diary before you choose it. Drag to rotate, or use the controls below.</p>
        <div className="mt-10 grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-start">
          <div>
            <div tabIndex={0} role="group" aria-label={`3D preview of ${d.name}, ${back ? 'back' : 'front'} cover. Use left and right arrow keys to rotate.`}
              className="relative h-[440px] sm:h-[520px] bg-ivory border border-plum/10 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
              style={{ touchAction:'pan-y' }} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onKeyDown={key}>
              <div key={d.id} className={busy ? 'swap' : ''} style={{ scale:String(zoom) }}>
                <Diary3D design={d} color={color} art={art} text={text.trim()} rotX={rx} rotY={ry} dragging={drag} />
              </div>
              <span className="absolute top-4 left-4 text-xs text-plum/60" aria-live="polite">{back ? 'Back cover' : 'Front cover'}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {ctl('Rotate left', ChevronLeft, () => setRy(v => v - 45))}
              {ctl('Flip to other side', Repeat2, () => setRy(v => v + 180))}
              {ctl('Rotate right', ChevronRight, () => setRy(v => v + 45))}
              {ctl('Zoom out', ZoomOut, () => setZoom(v => clamp(+(v - 0.15).toFixed(2), 0.7, 1.5)))}
              {ctl('Zoom in', ZoomIn, () => setZoom(v => clamp(+(v + 0.15).toFixed(2), 0.7, 1.5)))}
              {ctl('Reset view', RotateCcw, () => { setRx(DEF.x); setRy(DEF.y); setZoom(DEF.z) })}
            </div>
          </div>
          <div>
            <p className="text-sm text-plum/60 h-5">{d.tag}</p>
            <h3 className="font-serif text-4xl leading-tight" aria-live="polite">{d.name}</h3>
            <p className="font-serif text-3xl mt-2">{inr(price)}{text.trim() && <span className="text-sm font-sans ml-2 text-plum/60">includes ₹99 personalisation</span>}</p>
            <p className="mt-3 max-w-sm">{d.desc}</p>
            <div className="mt-6" role="radiogroup" aria-label="Choose a diary design">
              <div className="flex flex-wrap gap-3">
                {DESIGNS.map(x => <button key={x.id} role="radio" aria-checked={x.id === active} aria-label={x.name} title={x.name} onClick={() => pick(x.id)}
                  className={`w-12 h-12 rounded-full transition duration-300 ${x.id === active ? 'ring-2 ring-plum ring-offset-2 ring-offset-cream scale-110' : 'hover:scale-105'}`} style={{ background:x.color }} />)}
              </div>
            </div>
            <fieldset className="mt-8 border-t border-plum/15 pt-6">
              <legend className="font-serif text-2xl pr-3">Make it yours</legend>
              <p className="text-sm mb-2">Cover colour</p>
              <div className="flex gap-2 flex-wrap" role="radiogroup" aria-label="Cover colour">
                {COLORS.map(c => <button key={c.v} role="radio" aria-checked={color === c.v} aria-label={c.n} title={c.n} onClick={() => setColor(c.v)}
                  className={`w-9 h-9 rounded-full border border-plum/20 ${color === c.v ? 'ring-2 ring-plum ring-offset-2 ring-offset-cream' : ''}`} style={{ background:c.v }} />)}
              </div>
              <p className="text-sm mt-5 mb-2">Cover theme</p>
              <div className="flex gap-2 flex-wrap">
                {THEMES.map(t => <button key={t.id} aria-pressed={(art || d.art) === t.id} onClick={() => setArt(t.id)}
                  className={`px-3 py-1.5 text-sm border transition ${(art || d.art) === t.id ? 'bg-plum text-ivory border-plum' : 'border-plum/25 hover:border-plum'}`}>{t.n}</button>)}
              </div>
              <label htmlFor="nm" className="text-sm mt-5 mb-2 block">Your name or a few words</label>
              <input id="nm" value={text} maxLength={18} onChange={e => setText(e.target.value)} placeholder="e.g. Aanya’s stories"
                className="w-full bg-ivory border border-plum/25 px-4 py-3 min-h-[44px] focus:border-plum" />
            </fieldset>
            <div className="mt-8 flex gap-3">
              <button className="btn btn-dark flex-1" onClick={add}><ShoppingBag size={18} /> Add to bag</button>
              <button className="ico !w-[46px] !h-[46px]" aria-pressed={wished} aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'} onClick={wishClick}>
                <Heart size={20} className={pop ? 'pop' : ''} fill={wished ? '#B5707A' : 'none'} stroke={wished ? '#B5707A' : 'currentColor'} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
