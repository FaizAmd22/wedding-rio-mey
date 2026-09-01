import fs from 'node:fs'
import path from 'node:path'

const ASSETS = 'src/assets'
const CODE_EXT = /\.(jsx?|tsx?|css|html)$/i

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    return e.isDirectory() ? walk(p) : [p]
  })
}

const assets = walk(ASSETS)
const codeFiles = [...walk('src'), ...(fs.existsSync('index.html') ? ['index.html'] : [])]
  .filter((f) => CODE_EXT.test(f) && !f.startsWith(ASSETS))

const source = codeFiles.map((f) => fs.readFileSync(f, 'utf8')).join('\n')

// Pola import.meta.glob diperlakukan sebagai referensi ke seluruh isi foldernya.
const globDirs = new Set()
for (const m of source.matchAll(/import\.meta\.glob\(\s*['"]([^'"]+)['"]/g)) {
  const pattern = m[1]
  const idx = pattern.indexOf('/*')
  if (idx === -1) continue
  const dir = pattern.slice(0, idx).replace(/^.*assets\//, '')
  const ext = pattern.slice(pattern.lastIndexOf('.'))
  globDirs.add(dir + '|' + ext.toLowerCase())
}

const used = []
const unused = []

for (const a of assets) {
  const rel = a.split(path.sep).join('/')
  const base = path.basename(rel)
  const insideAssets = rel.replace(/^src\/assets\//, '')
  const dir = path.dirname(insideAssets)
  const ext = path.extname(base).toLowerCase()

  const byName = source.includes(base)
  const byGlob = [...globDirs].some((g) => {
    const [gdir, gext] = g.split('|')
    return gdir === dir && gext === ext
  })

  ;(byName || byGlob ? used : unused).push({ rel, size: fs.statSync(a).size })
}

const fmt = (n) => (n / 1048576).toFixed(2).padStart(7) + ' MB'
unused.sort((a, b) => b.size - a.size)

console.log('TERPAKAI:', used.length, 'file,', fmt(used.reduce((s, f) => s + f.size, 0)))
console.log('TIDAK TERPAKAI:', unused.length, 'file,', fmt(unused.reduce((s, f) => s + f.size, 0)))
console.log()
const show = process.argv.includes('--used') ? used : unused
for (const f of show) console.log(' ', fmt(f.size), f.rel)

if (process.argv.includes('--delete')) {
  for (const f of unused) fs.unlinkSync(f.rel)
  console.log('\n', unused.length, 'file dihapus.')
} else {
  console.log('\n(dry run \u2014 jalankan dengan --delete untuk menghapus)')
}
