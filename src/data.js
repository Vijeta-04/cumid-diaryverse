export const DESIGNS = [
  { id:'dream', name:'The Dream Journal', price:699, tag:'Bestseller', color:'#8E7CB3', accent:'#F3DFA2', art:'dream', desc:'A moonlit lavender cover with gilded stars, for wishes written at night.' },
  { id:'midnight', name:'Midnight Thoughts', price:749, tag:'New arrival', color:'#3B2431', accent:'#E8C9A0', art:'midnight', desc:'Deep plum and a thin crescent, made for the thoughts that arrive after dark.' },
  { id:'bloom', name:'Bloom & Grow', price:649, tag:'New arrival', color:'#D9A5A8', accent:'#FBF6EE', art:'bloom', desc:'Dusty rose petals for gardens of goals and gentle progress.' },
  { id:'lavender', name:'Lavender Letters', price:679, color:'#B9A7D1', accent:'#4A3A63', art:'lavender', desc:'Pressed lavender sprigs on soft lilac, ideal for letters you never send.' },
  { id:'being', name:'The Art of Being You', price:729, tag:'Bestseller', color:'#A8B8A0', accent:'#3B2431', art:'being', desc:'Quiet sage with a single line portrait, a cover for honest pages.' },
  { id:'little', name:'Little Things Matter', price:599, color:'#EBD9C4', accent:'#B5707A', art:'little', desc:'Scattered hearts on warm cream, for small joys worth remembering.' },
]
export const COLORS = [
  { n:'Dusty rose', v:'#D9A5A8' }, { n:'Lavender', v:'#B9A7D1' }, { n:'Sage', v:'#A8B8A0' },
  { n:'Cream', v:'#EBD9C4' }, { n:'Plum', v:'#3B2431' }, { n:'Cocoa', v:'#6B4A3A' },
]
export const THEMES = [
  { id:'dream', n:'Stars' }, { id:'midnight', n:'Crescent' }, { id:'bloom', n:'Bloom' },
  { id:'lavender', n:'Sprigs' }, { id:'being', n:'Portrait' }, { id:'little', n:'Hearts' },
]
export const inr = (n) => '₹' + n.toLocaleString('en-IN')
