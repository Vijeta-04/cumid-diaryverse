import { useCallback, useEffect, useState } from 'react'
import { Navbar, Hero, Collection, BrandStory, Footer, ToastNotification } from './components/Sections.jsx'
import Studio from './components/Studio.jsx'

function useLS(k, init) {
  const [v, s] = useState(() => { try { return JSON.parse(localStorage.getItem(k)) ?? init } catch { return init } })
  useEffect(() => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} }, [k, v])
  return [v, s]
}

export default function App() {
  const [active, setActive] = useState('dream')
  const [wish, setWish] = useLS('cumid.wish', [])
  const [cart, setCart] = useLS('cumid.cart', [])
  const [toasts, setToasts] = useState([])
  const toast = useCallback(m => {
    const id = Date.now() + Math.random()
    setToasts(t => [...t.slice(-2), { id, m }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2600)
  }, [])
  const toggleWish = d => {
    const has = wish.includes(d.id)
    setWish(has ? wish.filter(x => x !== d.id) : [...wish, d.id])
    toast(has ? `Removed ${d.name} from your wishlist` : `Saved ${d.name} to your wishlist`)
  }
  const addToBag = i => {
    const key = [i.id, i.color, i.text].join('|')
    setCart(c => c.some(x => x.key === key) ? c.map(x => x.key === key ? { ...x, qty:x.qty + 1 } : x) : [...c, { ...i, key, qty:1 }])
    toast(`Added ${i.name} to your bag`)
  }
  const preview = id => { setActive(id); document.getElementById('studio')?.scrollIntoView({ behavior:'smooth' }) }
  return (
    <>
      <div className="bg-plum text-ivory text-center text-xs py-2 px-4">A little happiness, wrapped with love ✨</div>
      <Navbar cart={cart.reduce((n, x) => n + x.qty, 0)} wish={wish.length} />
      <main>
        <Hero />
        <Collection wish={wish} toggleWish={toggleWish} preview={preview} />
        <Studio active={active} setActive={setActive} wish={wish} toggleWish={toggleWish} addToBag={addToBag} />
        <BrandStory />
      </main>
      <Footer />
      <ToastNotification toasts={toasts} />
    </>
  )
}
