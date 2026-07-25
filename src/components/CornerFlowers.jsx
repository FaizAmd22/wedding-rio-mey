import flowerImg from '../assets/images/flower-2.png'

function CornerFlowers() {
  return (
    <>
      <img
        src={flowerImg}
        alt=""
        className="pointer-events-none fixed top-0 left-0 z-20 w-32 select-none sm:w-36"
      />
      <img
        src={flowerImg}
        alt=""
        className="pointer-events-none fixed top-0 right-0 z-20 w-32 -scale-x-100 select-none sm:w-36"
      />
    </>
  )
}

export default CornerFlowers
