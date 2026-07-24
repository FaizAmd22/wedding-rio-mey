const MapIcon = ({ fillColor = '#EE5DA1', ...others }) => {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" {...others}>
      <path d="M4.00757 13.615V30.6425C4.00757 33.9675 6.37007 35.3325 9.24007 33.6875L13.3526 31.3425C14.2451 30.835 15.7326 30.7825 16.6601 31.255L25.8476 35.8575C26.7751 36.3125 28.2626 36.2775 29.1551 35.77L36.7326 31.43C37.6951 30.87 38.5001 29.505 38.5001 28.385V11.3575C38.5001 8.03246 36.1376 6.66746 33.2676 8.31246L29.1551 10.6575C28.2626 11.165 26.7751 11.2175 25.8476 10.745L16.6601 6.15996C15.7326 5.70496 14.2451 5.73996 13.3526 6.24746L5.77507 10.5875C4.79507 11.1475 4.00757 12.5125 4.00757 13.615Z" stroke={fillColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.98 7V29.75" stroke={fillColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27.5276 11.585V35" stroke={fillColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default MapIcon;
