import { useEffect, useMemo, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { Check, Pencil, Search, Send, Trash2, X } from 'lucide-react'
import { db } from '../lib/firebase'
import { buildWhatsAppLink } from '../lib/phone'
import PasswordGate from '../components/PasswordGate'

const DEFAULT_MESSAGE = `Halo {nama} 🌸

Dengan penuh sukacita, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di pernikahan kami.

Berikut link undangannya:
{link}

Mohon doa restu & kehadirannya 🙏

Rio & Mey`

function formatRsvpDate(timestamp) {
  if (!timestamp) return '-'
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(timestamp.toDate())
}

function buildInvitationLink(name) {
  return `${window.location.origin}/wedding-rio-and-mey?guest=${encodeURIComponent(name)}`
}

function buildPersonalizedMessage(message, contact) {
  return message
    .replaceAll('{nama}', contact.name)
    .replaceAll('{link}', buildInvitationLink(contact.name))
}

function FilterTabs({ value, onChange, options }) {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`cursor-pointer rounded-md px-3 py-1 text-xs font-medium ${
            value === option.value
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

function RsvpTable() {
  const [rsvps, setRsvps] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [attendanceFilter, setAttendanceFilter] = useState('all')

  useEffect(() => {
    const rsvpsQuery = query(collection(db, 'rsvps'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(rsvpsQuery, (snapshot) => {
      setRsvps(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
    })
    return unsubscribe
  }, [])

  const attendingCount = rsvps?.filter((r) => r.attending).length ?? 0
  const totalGuests = rsvps
    ?.filter((r) => r.attending)
    .reduce((sum, r) => sum + (r.guestCount || 0), 0) ?? 0

  const filteredRsvps = useMemo(() => {
    if (!rsvps) return null
    const term = searchTerm.trim().toLowerCase()
    return rsvps.filter((r) => {
      if (attendanceFilter === 'attending' && !r.attending) return false
      if (attendanceFilter === 'not-attending' && r.attending) return false
      if (term && !r.name.toLowerCase().includes(term)) return false
      return true
    })
  }, [rsvps, searchTerm, attendanceFilter])

  return (
    <section className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-1">
        <p className="text-base font-semibold text-gray-800">Data RSVP</p>
        <p className="text-xs text-gray-500">
          {attendingCount} hadir &bull; {totalGuests} orang
        </p>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Cari nama..."
          className="w-full rounded-md border border-gray-300 py-2 pr-3 pl-9 text-sm outline-none focus:border-gray-500"
        />
      </div>

      <FilterTabs
        value={attendanceFilter}
        onChange={setAttendanceFilter}
        options={[
          { value: 'all', label: 'Semua' },
          { value: 'attending', label: 'Hadir' },
          { value: 'not-attending', label: 'Tidak Hadir' },
        ]}
      />

      <div className="max-h-64 overflow-auto rounded-md border border-gray-200">
        <table className="w-full min-w-[420px] text-left text-sm">
          <thead className="sticky top-0 bg-gray-50 text-xs text-gray-500">
            <tr>
              <th className="px-3 py-2">Nama</th>
              <th className="px-3 py-2">Hadir</th>
              <th className="px-3 py-2">Jumlah</th>
              <th className="px-3 py-2">Waktu</th>
            </tr>
          </thead>
          <tbody>
            {filteredRsvps === null && (
              <tr>
                <td colSpan={4} className="px-3 py-4 text-center text-gray-400">
                  Memuat...
                </td>
              </tr>
            )}
            {filteredRsvps?.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-4 text-center text-gray-400">
                  {searchTerm || attendanceFilter !== 'all'
                    ? 'Tidak ditemukan'
                    : 'Belum ada RSVP'}
                </td>
              </tr>
            )}
            {filteredRsvps?.map((r) => (
              <tr key={r.id} className="border-t border-gray-100">
                <td className="px-3 py-2">{r.name}</td>
                <td className="px-3 py-2">
                  {r.attending ? (
                    <span className="text-green-600">Ya</span>
                  ) : (
                    <span className="text-red-500">Tidak</span>
                  )}
                </td>
                <td className="px-3 py-2">{r.guestCount}</td>
                <td className="px-3 py-2 text-xs text-gray-500">
                  {formatRsvpDate(r.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function ContactForm({ onAdd }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!name.trim() || !phone.trim() || submitting) return

    setSubmitting(true)
    try {
      await onAdd({ name: name.trim(), phone: phone.trim() })
      setName('')
      setPhone('')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Nama"
        className="min-w-[140px] flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
      />
      <input
        type="tel"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        placeholder="08xxxxxxxxxx"
        className="w-full min-w-[140px] flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 sm:w-36 sm:flex-none"
      />
      <button
        type="submit"
        disabled={submitting}
        className="w-full cursor-pointer rounded-md bg-gray-900 px-4 py-2 text-sm text-white disabled:opacity-50 sm:w-auto"
      >
        Tambah
      </button>
    </form>
  )
}

function ContactRow({ contact, message, selected, onToggleSelect, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(contact.name)
  const [phone, setPhone] = useState(contact.phone)

  const handleSave = async () => {
    if (!name.trim() || !phone.trim()) return
    await onUpdate(contact.id, { name: name.trim(), phone: phone.trim() })
    setEditing(false)
  }

  const handleSend = () => {
    const personalized = buildPersonalizedMessage(message, contact)
    window.open(buildWhatsAppLink(contact.phone, personalized), '_blank', 'noopener,noreferrer')
    onUpdate(contact.id, { sent: true })
  }

  if (editing) {
    return (
      <div className="flex flex-wrap items-center gap-2 border-t border-gray-100 px-3 py-2">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="min-w-[120px] flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm outline-none"
        />
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="min-w-[110px] flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm outline-none sm:w-32 sm:flex-none"
        />
        <button
          type="button"
          onClick={handleSave}
          aria-label="Simpan"
          className="cursor-pointer text-green-600"
        >
          <Check className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          aria-label="Batal"
          className="cursor-pointer text-gray-400"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-gray-100 px-3 py-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onToggleSelect(contact.id)}
        aria-label={`Pilih ${contact.name}`}
        className="h-4 w-4 shrink-0 cursor-pointer"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-gray-800">{contact.name}</p>
        <p className="truncate text-xs text-gray-500">{contact.phone}</p>
      </div>
      {contact.sent && (
        <span className="shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
          Terkirim
        </span>
      )}
      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={handleSend}
          aria-label={`Kirim WA ke ${contact.name}`}
          className="cursor-pointer rounded-full bg-green-500 p-2 text-white hover:bg-green-600"
        >
          <Send className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setEditing(true)}
          aria-label={`Edit ${contact.name}`}
          className="cursor-pointer p-2 text-gray-500 hover:text-gray-800"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(contact.id)}
          aria-label={`Hapus ${contact.name}`}
          className="cursor-pointer p-2 text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function BroadcastPanel({ queue, index, message, onSent, onSkip, onClose }) {
  const finished = index >= queue.length

  if (finished) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-lg">
          <p className="text-lg font-semibold text-gray-800">Selesai!</p>
          <p className="mt-1 text-sm text-gray-500">
            Semua kontak terpilih sudah diproses.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 w-full cursor-pointer rounded-md bg-gray-900 px-4 py-2 text-sm text-white"
          >
            Tutup
          </button>
        </div>
      </div>
    )
  }

  const current = queue[index]

  const handleSend = () => {
    const personalized = buildPersonalizedMessage(message, current)
    window.open(buildWhatsAppLink(current.phone, personalized), '_blank', 'noopener,noreferrer')
    onSent(current.id)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
        <p className="text-xs text-gray-400">
          Mengirim {index + 1} dari {queue.length}
        </p>
        <p className="mt-1 truncate text-lg font-semibold text-gray-800">
          {current.name}
        </p>
        <p className="text-sm text-gray-500">{current.phone}</p>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onSkip}
            className="flex-1 cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600"
          >
            Lewati
          </button>
          <button
            type="button"
            onClick={handleSend}
            className="flex-1 cursor-pointer rounded-md bg-green-500 px-4 py-2 text-sm text-white"
          >
            Kirim & Lanjut
          </button>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full cursor-pointer text-center text-xs text-gray-400 underline"
        >
          Batalkan
        </button>
      </div>
    </div>
  )
}

function GuestManager() {
  const [contacts, setContacts] = useState(null)
  const [message, setMessage] = useState(DEFAULT_MESSAGE)
  const [searchTerm, setSearchTerm] = useState('')
  const [sentFilter, setSentFilter] = useState('all')
  const [selectedIds, setSelectedIds] = useState(() => new Set())
  const [broadcastQueue, setBroadcastQueue] = useState(null)
  const [broadcastIndex, setBroadcastIndex] = useState(0)

  useEffect(() => {
    const guestsQuery = query(collection(db, 'guests'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(guestsQuery, (snapshot) => {
      setContacts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
    })
    return unsubscribe
  }, [])

  const filteredContacts = useMemo(() => {
    if (!contacts) return null
    const term = searchTerm.trim().toLowerCase()
    return contacts.filter((c) => {
      if (sentFilter === 'sent' && !c.sent) return false
      if (sentFilter === 'unsent' && c.sent) return false
      if (term && !c.name.toLowerCase().includes(term) && !c.phone.toLowerCase().includes(term)) {
        return false
      }
      return true
    })
  }, [contacts, searchTerm, sentFilter])

  const handleAdd = async ({ name, phone }) => {
    await addDoc(collection(db, 'guests'), {
      name,
      phone,
      sent: false,
      createdAt: serverTimestamp(),
    })
  }

  const handleUpdate = async (id, data) => {
    await updateDoc(doc(db, 'guests', id), data)
  }

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'guests', id))
    setSelectedIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const allFilteredSelected =
    filteredContacts != null &&
    filteredContacts.length > 0 &&
    filteredContacts.every((c) => selectedIds.has(c.id))

  const toggleSelectAll = () => {
    if (!filteredContacts) return
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (allFilteredSelected) {
        filteredContacts.forEach((c) => next.delete(c.id))
      } else {
        filteredContacts.forEach((c) => next.add(c.id))
      }
      return next
    })
  }

  const startBroadcast = () => {
    if (!contacts) return
    const queue = contacts.filter((c) => selectedIds.has(c.id))
    if (queue.length === 0) return
    setBroadcastQueue(queue)
    setBroadcastIndex(0)
  }

  const handleBroadcastSent = (id) => {
    handleUpdate(id, { sent: true })
    setBroadcastIndex((prev) => prev + 1)
  }

  const handleBroadcastSkip = () => {
    setBroadcastIndex((prev) => prev + 1)
  }

  const closeBroadcast = () => {
    setBroadcastQueue(null)
    setBroadcastIndex(0)
    setSelectedIds(new Set())
  }

  const sentCount = contacts?.filter((c) => c.sent).length ?? 0

  return (
    <section className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm sm:p-5">
      <div>
        <p className="mb-2 text-base font-semibold text-gray-800">
          Template Pesan
        </p>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={6}
          className="w-full rounded-md border border-gray-300 p-3 text-sm outline-none focus:border-gray-500"
        />
        <p className="mt-1 text-xs text-gray-400">
          Gunakan <code>{'{nama}'}</code> untuk nama tamu dan{' '}
          <code>{'{link}'}</code> untuk link undangan personal.
        </p>
      </div>

      <div>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-1">
          <p className="text-base font-semibold text-gray-800">Daftar Tamu</p>
          <p className="text-xs text-gray-500">
            {sentCount}/{contacts?.length ?? 0} terkirim
          </p>
        </div>
        <ContactForm onAdd={handleAdd} />

        <div className="relative mt-3">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Cari nama atau nomor..."
            className="w-full rounded-md border border-gray-300 py-2 pr-3 pl-9 text-sm outline-none focus:border-gray-500"
          />
        </div>

        <div className="mt-2">
          <FilterTabs
            value={sentFilter}
            onChange={setSentFilter}
            options={[
              { value: 'all', label: 'Semua' },
              { value: 'sent', label: 'Terkirim' },
              { value: 'unsent', label: 'Belum Terkirim' },
            ]}
          />
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-500">
            <input
              type="checkbox"
              checked={allFilteredSelected}
              onChange={toggleSelectAll}
              disabled={!filteredContacts || filteredContacts.length === 0}
              className="h-4 w-4 cursor-pointer"
            />
            Pilih Semua ({filteredContacts?.length ?? 0})
          </label>

          <button
            type="button"
            onClick={startBroadcast}
            disabled={selectedIds.size === 0}
            className="cursor-pointer rounded-md bg-green-500 px-4 py-2 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Kirim ke Terpilih ({selectedIds.size})
          </button>
        </div>

        <div className="mt-3 max-h-96 overflow-y-auto rounded-md border border-gray-200">
          {filteredContacts === null && (
            <p className="px-3 py-4 text-center text-sm text-gray-400">
              Memuat...
            </p>
          )}
          {filteredContacts?.length === 0 && (
            <p className="px-3 py-4 text-center text-sm text-gray-400">
              {searchTerm || sentFilter !== 'all' ? 'Tidak ditemukan' : 'Belum ada tamu'}
            </p>
          )}
          {filteredContacts?.map((contact) => (
            <ContactRow
              key={contact.id}
              contact={contact}
              message={message}
              selected={selectedIds.has(contact.id)}
              onToggleSelect={toggleSelect}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {broadcastQueue && (
        <BroadcastPanel
          queue={broadcastQueue}
          index={broadcastIndex}
          message={message}
          onSent={handleBroadcastSent}
          onSkip={handleBroadcastSkip}
          onClose={closeBroadcast}
        />
      )}
    </section>
  )
}

function SendingInvitationPage() {
  return (
    <PasswordGate>
      <div className="min-h-screen w-full bg-gray-100 px-3 py-6 sm:px-4 sm:py-8">
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
          <p className="text-xl font-semibold text-gray-900">
            Kirim Undangan
          </p>
          <RsvpTable />
          <GuestManager />
        </div>
      </div>
    </PasswordGate>
  )
}

export default SendingInvitationPage
