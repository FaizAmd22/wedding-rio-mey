export function normalizePhone(phone) {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('0')) return '62' + digits.slice(1)
  return digits
}

export function buildWhatsAppLink(phone, message) {
  const number = normalizePhone(phone)
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
