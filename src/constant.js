import groomPhoto from './assets/couple/groom.png'
import bridePhoto from './assets/couple/bride.png'
import chapterOneImg from './assets/love-story/chapter-1.png'
import chapterTwoImg from './assets/love-story/chapter-2.png'
import chapterThreeImg from './assets/love-story/chapter-3.png'
import chapterFourImg from './assets/love-story/chapter-4.png'

export const COUPLE = {
    groom: {
        fullName: 'Rio Rizki Giofani',
        father: 'Yedik Supriadi',
        fatherDeceased: true,
        mother: 'Neneng Setiawati',
        photo: groomPhoto,
    },
    bride: {
        fullName: 'Risma Meliani',
        nickname: 'Mey',
        father: 'Gumilar Budiyanto',
        mother: "Ona Kona'ah",
        photo: bridePhoto,
    },
}

export const COUPLE_SHORT_NAME = 'Rio & Mey'

export const WEDDING_DATE = new Date('2026-09-12T16:00:00')
export const WEDDING_DATE_DISPLAY = '12 / 09 / 2026'

export const EVENT_SCHEDULE = {
    venueHours: { start: '16:00', end: '22:00' },
    akad: '16:00',
    reception: '18:00',
}

export const VENUE = {
    name: 'Cafe Samoja',
    address: '55PV+9W Jatipamor, Kabupaten Majalengka, Jawa Barat',
    coordinates: [-6.8140374, 108.1947649],
    googleMapsUrl: 'https://maps.app.goo.gl/LZQtcrPSBgZtq1Lr7',
}

export const SONG_TITLE = 'Kita Usahakan Rumah Itu - Sal Priadi'

export const LOVE_STORY_CHAPTERS = [
    { image: chapterOneImg, rotate: 'rotate-3' },
    { image: chapterTwoImg, rotate: '-rotate-3', reverse: true },
    { image: chapterThreeImg, rotate: 'rotate-2' },
    { image: chapterFourImg, rotate: '-rotate-2', reverse: true },
]

export const GIFTS = [
    {
        bank: 'BANK BCA',
        accountNumber: '4180886406',
        accountName: 'RIO RIZKI GIOFANI',
    },
    {
        bank: 'BANK MANDIRI',
        accountNumber: '1340023592123',
        accountName: 'RISMA MELIANI',
    },
]

export const GIFT_ADDRESS = 'Jln Mawar No 27 Rt/Rw 01/09 Desa Sutawangi Kec Jatiwangi (Rmh Dpn Smp Arridlo)'
