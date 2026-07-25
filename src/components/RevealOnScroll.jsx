import useInView from '../hooks/useInView'

function RevealOnScroll({ children, className = '' }) {
  const [ref, isInView] = useInView()

  return (
    <div
      ref={ref}
      className={`${className} transition-opacity duration-1000 ease-out ${isInView ? 'opacity-100' : 'opacity-0'
        }`}
    >
      {children}
    </div>
  )
}

export default RevealOnScroll
