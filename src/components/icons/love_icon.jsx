const LoveIcon = ({ fillColor = '#EE5DA1', ...others }) => {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" {...others}>
      <path d="M22.085 36.4175C21.49 36.6275 20.51 36.6275 19.915 36.4175C14.84 34.685 3.5 27.4575 3.5 15.2075C3.5 9.80005 7.8575 5.42505 13.23 5.42505C16.415 5.42505 19.2325 6.96505 21 9.34505C22.7675 6.96505 25.6025 5.42505 28.77 5.42505C34.1425 5.42505 38.5 9.80005 38.5 15.2075C38.5 27.4575 27.16 34.685 22.085 36.4175Z" stroke={fillColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default LoveIcon;
