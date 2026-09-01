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
 * - 'clipboard' Chat dibuka tanpa teks apa pun di URL; pesan lewat clipboard.
 *               Tidak ada karakter non-ASCII di URL, jadi tidak ada yang bisa
 *               dirusak. Ini yang paling andal.
 */
export function buildWhatsAppLink(phone, message, target = 'app') {
  const number = normalizePhone(phone)

  if (target === 'clipboard') {
    return `https://web.whatsapp.com/send?phone=${number}`
  }

  const text = encodeURIComponent(message)
  if (target === 'web') {
    return `https://web.whatsapp.com/send?phone=${number}&text=${text}`
  }
  return `https://wa.me/${number}?text=${text}`
}
