export function normalizePhone(phone) {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('0')) return '62' + digits.slice(1)
  return digits
}

export function isMobileDevice() {
  if (typeof navigator === 'undefined') return false
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

/**
 * Emoji rusak jadi `?` ketika Windows menyerahkan URL ke aplikasi WhatsApp
 * Desktop: teksnya di-decode memakai ANSI codepage, bukan UTF-8. Tiga target
 * di bawah adalah tiga cara menghindarinya, dari yang paling praktis ke yang
 * paling aman.
 *
 * - 'app'       wa.me, membuka aplikasi WhatsApp bila terpasang. Cocok di HP.
 * - 'web'       WhatsApp Web di browser, melewati serah-terima Windows.
 * - 'clipboard' Di desktop: chat dibuka tanpa teks apa pun di URL, pesan
 *               dikirim lewat clipboard. Karena URL-nya cuma berisi nomor,
 *               tidak ada teks yang bisa dirusak.
 *
 * Kerusakan emoji hanya terjadi di WhatsApp Desktop Windows. Di HP, wa.me
 * meneruskan UTF-8 dengan benar, jadi teksnya selalu diikutkan di URL —
 * termasuk pada mode 'clipboard', supaya pesan tetap terisi kalau penyalinan
 * ke clipboard ditolak browser (Safari iOS kerap begitu).
 */
export function buildWhatsAppLink(phone, message, target = 'app') {
  const number = normalizePhone(phone)

  const text = encodeURIComponent(message)

  if (target === 'clipboard') {
    return isMobileDevice()
      ? `https://wa.me/${number}?text=${text}`
      : `https://web.whatsapp.com/send?phone=${number}`
  }

  if (target === 'web') {
    return `https://web.whatsapp.com/send?phone=${number}&text=${text}`
  }
  return `https://wa.me/${number}?text=${text}`
}
