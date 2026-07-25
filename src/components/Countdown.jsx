import useCountdown from '../hooks/useCountdown'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import { WEDDING_DATE } from '../constant'

function pad(value) {
  return String(value).padStart(2, '0')
}

function Countdown() {
  const { language } = useLanguage()
  const t = translations[language]
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE)

  const countdownItems = [
    { key: 'days', label: t.countdownLabels.days, value: days },
    { key: 'hours', label: t.countdownLabels.hours, value: hours },
    { key: 'minutes', label: t.countdownLabels.minutes, value: minutes },
    { key: 'seconds', label: t.countdownLabels.seconds, value: seconds },
  ]

  return (
    <div className="fixed bottom-21 flex w-full flex-col items-center gap-4">
      <div className="flex flex-col items-center">
        <p className="font-script relative gap-2 rounded-t-xl bg-white px-5 py-2 text-xl text-(--black-color)">
          {t.countdownTitle}
        </p>
        <div className="-mt-3 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-md">
          {countdownItems.map((item, i) => (
            <div key={item.key} className="flex items-center gap-2">
              <div className="flex w-14 flex-col items-center">
                <span className="font-elegant text-xl font-semibold text-(--black-color)">
                  {pad(item.value)}
                </span>
                <span className="text-[10px] tracking-wide text-(--black-color)">
                  {item.label}
                </span>
              </div>
              {i < countdownItems.length - 1 && (
                <span className="text-[#c98fae]">:</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Countdown
