import { execFileSync } from 'node:child_process'
import ffmpeg from 'ffmpeg-static'
import fs from 'node:fs'

// AAC 96 kbps stereo: ukurannya setara MP3 96 kbps mono tapi stereo tetap utuh,
// dan .m4a didukung semua browser modern. faststart menaruh header di depan
// supaya pemutaran bisa mulai sebelum file selesai diunduh.
const SRC = process.argv[2]
const OUT = process.argv[3]

if (!SRC || !OUT) {
  console.error('pakai: node scripts/optimize-audio.mjs <input> <output.m4a>')
  process.exit(1)
}

execFileSync(ffmpeg, [
  '-y', '-hide_banner', '-loglevel', 'error',
  '-i', SRC,
  '-c:a', 'aac', '-b:a', '96k', '-ac', '2',
  '-movflags', '+faststart',
  OUT,
])

const before = fs.statSync(SRC).size
const after = fs.statSync(OUT).size
console.log(
  (before / 1048576).toFixed(2), 'MB ->', (after / 1048576).toFixed(2), 'MB',
  '(-' + Math.round((1 - after / before) * 100) + '%)',
)
