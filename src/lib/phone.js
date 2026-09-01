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
 * JANGAN kembali ke wa.me. Endpoint itu membalas HTTP 302 ke api.whatsapp.com,
 * dan header Location-nya menghancurkan setiap karakter di luar Latin-1 menjadi
 * U+FFFD: semua emoji hancur, sementara • dan ’ selamat. Terverifikasi dengan
 * template 850 karakter — lewat wa.me menghasilkan 4 U+FFFD, lewat
 * api.whatsapp.com nol.
 *
 * api.whatsapp.com/send/ adalah tujuan redirect itu sendiri, jadi menujunya
 * langsung hanya melewati satu lompatan yang merusak.
 *
 * Ini juga menjelaskan kenapa sebagian device tampak aman: bila aplikasi
 * WhatsApp menangkap link wa.me lebih dulu lewat App Links / Universal Links,
 * permintaan HTTP-nya tidak pernah terjadi sehingga teks asli lolos. Device yang
 * membuka lewat browser dulu akan mengikuti redirect dan kena.
 */
export function buildWhatsAppLink(phone, message) {
  const number = normalizePhone(phone)
  const text = encodeURIComponent(message)
  return `https://api.whatsapp.com/send/?phone=${number}&text=${text}`
}
