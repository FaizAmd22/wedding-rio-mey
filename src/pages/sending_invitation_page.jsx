import { useEffect, useState } from 'react'
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
import { Check, Pencil, Send, Trash2, X } from 'lucide-react'
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

function RsvpTable() {
  const [rsvps, setRsvps] = useState(null)

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

  return (
    <section className="flex flex-col gap-3 rounded-xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-base font-semibold text-gray-800">Data RSVP</p>
        <p className="text-xs text-gray-500">
          {attendingCount} hadir &bull; {totalGuests} orang
        </p>
      </div>

      <div className="max-h-64 overflow-y-auto rounded-md border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 bg-gray-50 text-xs text-gray-500">
            <tr>
              <th className="px-3 py-2">Nama</th>
              <th className="px-3 py-2">Hadir</th>
              <th className="px-3 py-2">Jumlah</th>
              <th className="px-3 py-2">Waktu</th>
            </tr>
          </thead>
          <tbody>
            {rsvps === null && (
              <tr>
                <td colSpan={4} className="px-3 py-4 text-center text-gray-400">
                  Memuat...
                </td>
              </tr>
            )}
            {rsvps?.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-4 text-center text-gray-400">
                  Belum ada RSVP
                </td>
              </tr>
            )}
            {rsvps?.map((r) => (
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
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Nama"
        className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
      />
      <input
        type="tel"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        placeholder="08xxxxxxxxxx"
        className="w-36 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
      />
      <button
        type="submit"
        disabled={submitting}
        className="cursor-pointer rounded-md bg-gray-900 px-4 py-2 text-sm text-white disabled:opacity-50"
      >
        Tambah
      </button>
    </form>
  )
}

function ContactRow({ contact, message, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(contact.name)
  const [phone, setPhone] = useState(contact.phone)

  const handleSave = async () => {
    if (!name.trim() || !phone.trim()) return
    await onUpdate(contact.id, { name: name.trim(), phone: phone.trim() })
    setEditing(false)
  }

  const handleSend = () => {
    const personalized = message
      .replaceAll('{nama}', contact.name)
      .replaceAll('{link}', buildInvitationLink(contact.name))
    window.open(buildWhatsAppLink(contact.phone, personalized), '_blank', 'noopener,noreferrer')
    onUpdate(contact.id, { sent: true })
  }

  if (editing) {
    return (
      <div className="flex items-center gap-2 border-t border-gray-100 px-3 py-2">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm outline-none"
        />
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="w-32 rounded-md border border-gray-300 px-2 py-1 text-sm outline-none"
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
    <div className="flex items-center gap-2 border-t border-gray-100 px-3 py-2 text-sm">
      <div className="flex-1">
        <p className="font-medium text-gray-800">{contact.name}</p>
        <p className="text-xs text-gray-500">{contact.phone}</p>
      </div>
      {contact.sent && (
        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
          Terkirim
        </span>
      )}
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
  )
}

function GuestManager() {
  const [contacts, setContacts] = useState(null)
  const [message, setMessage] = useState(DEFAULT_MESSAGE)

  useEffect(() => {
    const guestsQuery = query(collection(db, 'guests'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(guestsQuery, (snapshot) => {
      setContacts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
    })
    return unsubscribe
  }, [])

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
  }

  const sentCount = contacts?.filter((c) => c.sent).length ?? 0

  return (
    <section className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm">
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
        <div className="mb-2 flex items-center justify-between">
          <p className="text-base font-semibold text-gray-800">Daftar Tamu</p>
          <p className="text-xs text-gray-500">
            {sentCount}/{contacts?.length ?? 0} terkirim
          </p>
        </div>
        <ContactForm onAdd={handleAdd} />

        <div className="mt-3 max-h-96 overflow-y-auto rounded-md border border-gray-200">
          {contacts === null && (
            <p className="px-3 py-4 text-center text-sm text-gray-400">
              Memuat...
            </p>
          )}
          {contacts?.length === 0 && (
            <p className="px-3 py-4 text-center text-sm text-gray-400">
              Belum ada tamu
            </p>
          )}
          {contacts?.map((contact) => (
            <ContactRow
              key={contact.id}
              contact={contact}
              message={message}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function SendingInvitationPage() {
  return (
    <PasswordGate>
      <div className="min-h-screen w-full bg-gray-100 px-4 py-8">
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
