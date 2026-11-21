export const W = 230, H = 310, D = 46
const heart = 'M0 -4C-8 -14 -22 -4 0 14C22 -4 8 -14 0 -4z'
const lum = (h) => { const n = parseInt(h.slice(1), 16); return (0.299*(n>>16) + 0.587*((n>>8)&255) + 0.114*(n&255)) / 255 }

export function CoverArt({ art, color }) {
  const f = { fill: color }, s = { fill:'none', stroke: color, strokeWidth:1.6, strokeLinecap:'round' }
  const A = {
    dream: <g><path d="M60 14a36 36 0 1 0 26 52A30 30 0 0 1 60 14z" {...f}/><circle cx="80" cy="28" r="2" {...f}/><circle cx="90" cy="46" r="1.4" {...f}/><circle cx="18" cy="22" r="1.6" {...f}/><path d="M28 80v8M24 84h8" {...s}/></g>,
    midnight: <g><circle cx="50" cy="50" r="38" {...s}/><path d="M58 24a28 28 0 1 0 0 52a22 22 0 1 1 0-52z" {...f}/><circle cx="72" cy="38" r="1.6" {...f}/><circle cx="66" cy="64" r="1.2" {...f}/></g>,
    bloom: <g>{[0,72,144,216,288].map(r => <ellipse key={r} cx="50" cy="32" rx="9" ry="16" transform={`rotate(${r} 50 50)`} {...f} opacity=".92"/>)}<circle cx="50" cy="50" r="6" {...s}/></g>,
    lavender: <g>{[32,50,68].map((x,k) => <g key={x}><path d={`M${x} 96V${34+k*3}`} {...s}/>{[0,1,2,3,4].map(i => <ellipse key={i} cx={x+(i%2?4:-4)} cy={30+k*3+i*9} rx="3" ry="5" {...f}/>)}</g>)}</g>,
    being: <g><circle cx="50" cy="50" r="34" {...s}/><path d="M22 60a30 30 0 0 0 56 0" {...s}/><circle cx="50" cy="38" r="9" {...f}/></g>,
    little: <g><path d={heart} transform="translate(30 42) scale(.9)" {...f}/><path d={heart} transform="translate(66 34) scale(.6)" {...f}/><path d={heart} transform="translate(52 68)" {...f}/></g>,
  }
  return <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">{A[art]}</svg>
}

const gloss = 'linear-gradient(115deg,rgba(255,255,255,.22),transparent 40%,rgba(0,0,0,.14))'
const hinge = 'linear-gradient(90deg,rgba(0,0,0,.3),rgba(0,0,0,0) 7%,rgba(255,255,255,.14) 8.5%,rgba(0,0,0,0) 13%)'
const abs = { position:'absolute' }

export default function Diary3D({ design, color, art, text, rotX = -8, rotY = -25, zoom = 1, dragging = false }) {
  const c = color || design.color
  const accent = color ? (lum(color) > 0.6 ? '#3B2431' : '#F6EBD0') : design.accent
  const paperH = { background:'repeating-linear-gradient(90deg,#f8f1e3 0 2px,#e2d6c0 2px 3px)' }
  const paperV = { background:'repeating-linear-gradient(0deg,#f8f1e3 0 2px,#e2d6c0 2px 3px)' }
  const elastic = <div style={{ ...abs, right:22, top:0, bottom:0, width:7, background:'rgba(40,20,30,.55)' }} />
  const cover = { width:W, height:H, background:c }
  return (
    <div style={{ width:W, height:H, position:'relative' }}>
      <div style={{ ...abs, left:'8%', bottom:-34, width:'84%', height:26, background:'radial-gradient(closest-side,rgba(59,36,49,.35),transparent)', filter:'blur(6px)' }} />
      <div style={{ perspective:1400, width:W, height:H }}>
        <div className="p3d" style={{ width:W, height:H, transform:`scale(${zoom}) rotateX(${rotX}deg) rotateY(${rotY}deg)`, transition: dragging ? 'none' : 'transform .9s cubic-bezier(.2,.8,.2,1)' }}>
          {/* front */}
          <div className="face" style={{ ...cover, transform:`translateZ(${D/2}px)`, borderRadius:'3px 10px 10px 3px' }}>
            <div style={{ ...abs, inset:0, background:hinge }} />{elastic}
            <div style={{ ...abs, left:'50%', top:'16%', width:120, height:120, marginLeft:-60 - 6 }}><CoverArt art={art || design.art} color={accent} /></div>
            <div className="font-serif" style={{ ...abs, left:0, right:14, top:196, textAlign:'center', color:accent, fontSize:13, letterSpacing:'.12em' }}>{design.name}</div>
            {text && <div className="font-serif" style={{ ...abs, left:10, right:24, top:232, textAlign:'center', color:accent, fontSize:19, fontStyle:'italic', overflowWrap:'anywhere' }}>{text}</div>}
            <div style={{ ...abs, inset:0, background:gloss }} />
          </div>
          {/* back */}
          <div className="face" style={{ ...cover, transform:`rotateY(180deg) translateZ(${D/2}px)`, borderRadius:'10px 3px 3px 10px' }}>
            <div style={{ ...abs, inset:0, background:hinge }} />{elastic}
            <div style={{ ...abs, left:'50%', top:'38%', width:40, height:40, marginLeft:-26, opacity:.7 }}><CoverArt art={art || design.art} color={accent} /></div>
            <div className="font-serif" style={{ ...abs, left:0, right:14, bottom:28, textAlign:'center', color:accent, fontSize:14, letterSpacing:'.2em' }}>cumid.store</div>
            <div style={{ ...abs, inset:0, background:gloss }} />
          </div>
          {/* spine */}
          <div style={{ ...abs, width:D, height:H, left:(W-D)/2, background:`linear-gradient(90deg,rgba(0,0,0,.25),rgba(255,255,255,.12),rgba(0,0,0,.25)),${c}`, transform:`rotateY(-90deg) translateZ(${W/2}px)` }} />
          {/* page block */}
          <div style={{ ...abs, width:D-6, height:H-6, top:3, left:(W-(D-6))/2, ...paperH, transform:`rotateY(90deg) translateZ(${W/2-4}px)` }} />
          <div style={{ ...abs, width:W-8, height:D-6, left:4, top:(H-(D-6))/2, ...paperV, transform:`rotateX(90deg) translateZ(${H/2-3}px)` }} />
          <div style={{ ...abs, width:W-8, height:D-6, left:4, top:(H-(D-6))/2, ...paperV, transform:`rotateX(-90deg) translateZ(${H/2-3}px)` }} />
        </div>
      </div>
    </div>
  )
}
