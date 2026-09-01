import { useMemo, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { buildWhatsAppLink, isMobileDevice } from '../lib/phone'

const IS_MOBILE = isMobileDevice()

/**
 * Memecah teks jadi daftar karakter non-ASCII beserta kode Unicode-nya. Kalau
 * U+FFFD muncul di sini, teks yang tersimpan di database memang sudah rusak,
 * dan semua pengirim akan melihat tanda tanya apa pun device-nya.
 */
function inspectNonAscii(text) {
  const counts = new Map()
  for (const char of text) {
    if (char.codePointAt(0) < 128) continue
    counts.set(char, (counts.get(char) ?? 0) + 1)
  }
  return [...counts.entries()].map(([char, count]) => ({
    char,
    count,
    code: 'U+' + char.codePointAt(0).toString(16).toUpperCase().padStart(4, '0'),
    broken: char === '\uFFFD',
  }))
}

function SendDiagnostics({ message, sendTarget }) {
  const [open, setOpen] = useState(false)
  const [clipboardResult, setClipboardResult] = useState('')
  const [copied, setCopied] = useState(false)

  const chars = useMemo(() => inspectNonAscii(message), [message])
  const replacementCount = chars
    .filter((c) => c.broken)
    .reduce((total, c) => total + c.count, 0)
  // Sebagian jalur merusak emoji jadi '?' biasa, bukan U+FFFD. Tanda tanya ASCII
  // tidak pernah lolos inspectNonAscii, jadi dihitung terpisah di sini.
  const questionMarks = (message.match(/\?/g) ?? []).length
  const brokenCount = replacementCount + questionMarks
  const sampleUrl = buildWhatsAppLink('081234567890', message, sendTarget)

  const report = [
    'DIAGNOSTIK KIRIM UNDANGAN',
    'Waktu      : ' + new Date().toISOString(),
    'Perangkat  : ' + (IS_MOBILE ? 'HP' : 'Desktop'),
    'User agent : ' + navigator.userAgent,
    'Mode kirim : ' + sendTarget,
    'Template   : ' +
      message.length +
      ' karakter, ' +
      replacementCount +
      ' U+FFFD, ' +
      questionMarks +
      ' tanda tanya',
    'Non-ASCII  : ' +
      chars.map((c) => c.char + ' ' + c.code + ' x' + c.count).join(' | '),
    'Clipboard  : ' + (clipboardResult || 'belum diuji'),
    'Contoh URL : ' + sampleUrl,
  ].join('\n')

  const testClipboard = async () => {
    try {
      await navigator.clipboard.writeText('uji clipboard')
      setClipboardResult('BERHASIL (Clipboard API)')
    } catch (err) {
      setClipboardResult('GAGAL (' + err.name + ': ' + err.message + ')')
    }
  }

  const copyReport = async () => {
    try {
      await navigator.clipboard.writeText(report)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setClipboardResult('GAGAL menyalin laporan. Screenshot panel ini saja.')
    }
  }

  return (
    <section className="rounded-xl bg-white p-4 shadow-sm sm:p-5">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full cursor-pointer items-center gap-1 text-left text-sm font-semibold text-gray-700"
      >
        {open ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
        Diagnostik
        {brokenCount > 0 && (
          <span className="ml-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
            {brokenCount} perlu dicek
          </span>
        )}
      </button>

      {open && (
        <div className="mt-3 flex flex-col gap-3 text-xs">
          {brokenCount > 0 ? (
            <p className="rounded-md bg-red-50 px-2 py-2 text-red-700">
              Template yang tersimpan di database mengandung {replacementCount}{' '}
              karakter U+FFFD dan {questionMarks} tanda tanya. Kalau template ini
              memang tidak seharusnya memuat tanda tanya, berarti teksnya sudah
              rusak sejak disimpan &mdash; semua pengirim akan kena, apa pun
              device-nya. Perbaiki lewat tombol Edit di Template Pesan, ketik
              ulang emoji-nya langsung (jangan salin dari chat WhatsApp), lalu
              Simpan.
            </p>
          ) : (
            <p className="rounded-md bg-green-50 px-2 py-2 text-green-700">
              Template di database bersih. Emoji-nya utuh.
            </p>
          )}

          <div>
            <p className="mb-1 font-medium text-gray-600">
              Karakter non-ASCII di template
            </p>
            <div className="flex flex-wrap gap-1">
              {chars.map((c) => (
                <span
                  key={c.code}
                  className={
                    'rounded border px-1.5 py-0.5 ' +
                    (c.broken
                      ? 'border-red-300 bg-red-50 text-red-700'
                      : 'border-gray-200 text-gray-600')
                  }
                >
                  {c.char} {c.code} &times;{c.count}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-1 font-medium text-gray-600">
              Uji tampilan emoji di layar ini
            </p>
            <p className="text-base">&#128197; &#9200; &#128205; &#128073;</p>
            <p className="text-gray-400">
              Kalau baris di atas tampil sebagai kotak atau tanda tanya, device
              ini tidak punya font emoji &mdash; bukan masalah aplikasi.
            </p>
          </div>

          <div>
            <p className="mb-1 font-medium text-gray-600">Perangkat</p>
            <p className="break-all text-gray-500">{navigator.userAgent}</p>
            <p className="text-gray-500">
              Terdeteksi: {IS_MOBILE ? 'HP' : 'Desktop'} &bull; Mode kirim:{' '}
              {sendTarget}
            </p>
          </div>

          <div>
            <p className="mb-1 font-medium text-gray-600">Contoh URL kirim</p>
            <p className="break-all text-gray-500">{sampleUrl}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={testClipboard}
              className="cursor-pointer rounded-md border border-gray-300 px-3 py-1 font-medium text-gray-600"
            >
              Uji clipboard
            </button>
            <button
              type="button"
              onClick={copyReport}
              className="cursor-pointer rounded-md bg-gray-900 px-3 py-1 font-medium text-white"
            >
              {copied ? 'Tersalin' : 'Salin hasil diagnostik'}
            </button>
          </div>

          {clipboardResult && (
            <p className="text-gray-500">Clipboard: {clipboardResult}</p>
          )}
        </div>
      )}
    </section>
  )
}

export default SendDiagnostics
