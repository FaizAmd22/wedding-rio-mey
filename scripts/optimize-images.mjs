import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

// Lebar target = lebar tampil maksimum x2 (retina). Kolom undangan lg:w-[480px].
const PLAN = [
  { file: 'src/assets/images/letter-2.png',        width: 1080, q: 82 },
  { file: 'src/assets/images/letter.png',          width: 1080, q: 82 },
  { file: 'src/assets/images/flower.png',          width: 1080, q: 82 },
  { file: 'src/assets/images/bg-letter.png',       width: 1080, q: 82 },
  { file: 'src/assets/images/flower-2.png',        width:  432, q: 85 }, // tampil w-32/w-36
  { file: 'src/assets/images/bg.png',              width: 1080, q: 78 },
  { file: 'src/assets/images/bg-rsvp.png',         width:  720, q: 80 },
  { file: 'src/assets/images/marker.png',          width:  132, q: 85 }, // ikon 44px
  { file: 'src/assets/love-story/chapter-1.png',   width: 1080, q: 82 },
  { file: 'src/assets/love-story/chapter-2.png',   width: 1080, q: 82 },
  { file: 'src/assets/love-story/chapter-3.png',   width: 1080, q: 82 },
  { file: 'src/assets/love-story/chapter-4.png',   width: 1080, q: 82 },
  { file: 'src/assets/love-story/love-story.png',  width:  720, q: 85 },
  { file: 'src/assets/couple/bride.png',           width:  900, q: 82 },
  { file: 'src/assets/couple/groom.png',           width:  900, q: 82 },
]

for (const f of fs.readdirSync('src/assets/gallery')) {
  if (/\.jpe?g$/i.test(f)) {
    PLAN.push({ file: path.join('src/assets/gallery', f), width: 1080, q: 80 })
  }
}

let before = 0
let after = 0
const rows = []

for (const { file, width, q } of PLAN) {
  if (!fs.existsSync(file)) {
    rows.push([file, 'HILANG', '', ''])
    continue
  }
  const src = fs.statSync(file).size
  const out = file.replace(/\.(png|jpe?g)$/i, '.webp')
  const meta = await sharp(file).metadata()

  await sharp(file)
    .resize({ width: Math.min(width, meta.width), withoutEnlargement: true })
    .webp({ quality: q, effort: 6 })
    .toFile(out)

  const dst = fs.statSync(out).size
  before += src
  after += dst
  rows.push([
    path.basename(file),
    (src / 1048576).toFixed(2) + ' MB',
    (dst / 1048576).toFixed(2) + ' MB',
    '-' + Math.round((1 - dst / src) * 100) + '%',
    meta.width + 'px -> ' + Math.min(width, meta.width) + 'px',
  ])
}

for (const r of rows) {
  console.log(
    String(r[0]).padEnd(20),
    String(r[1]).padStart(9),
    '->',
    String(r[2]).padStart(9),
    String(r[3] ?? '').padStart(6),
    ' ',
    r[4] ?? '',
  )
}
console.log('\nTOTAL', (before / 1048576).toFixed(1), 'MB ->', (after / 1048576).toFixed(1), 'MB',
  '(-' + Math.round((1 - after / before) * 100) + '%)')
