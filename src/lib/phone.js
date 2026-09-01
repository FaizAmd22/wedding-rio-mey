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
 * `target: 'web'` menuju WhatsApp Web di browser. Ini menghindari serah-terima
 * URL dari Windows ke aplikasi WhatsApp Desktop, yang men-decode teks memakai
 * ANSI codepage sehingga semua emoji berubah jadi karakter `?`.
 *
 * `target: 'app'` memakai wa.me, yang membuka aplikasi WhatsApp bila terpasang.
 */
export function buildWhatsAppLink(phone, message, target = 'app') {
  const number = normalizePhone(phone)
  const text = encodeURIComponent(message)

  if (target === 'web') {
    return `https://web.whatsapp.com/send?phone=${number}&text=${text}`
  }
  return `https://wa.me/${number}?text=${text}`
}
