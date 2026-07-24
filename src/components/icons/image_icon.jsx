const ImageIcon = ({ fillColor = '#EE5DA1', ...others }) => {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" {...others}>
      <path d="M15.75 38.5H26.25C35 38.5 38.5 35 38.5 26.25V15.75C38.5 7 35 3.5 26.25 3.5H15.75C7 3.5 3.5 7 3.5 15.75V26.25C3.5 35 7 38.5 15.75 38.5Z" stroke={fillColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.75 17.5C17.683 17.5 19.25 15.933 19.25 14C19.25 12.067 17.683 10.5 15.75 10.5C13.817 10.5 12.25 12.067 12.25 14C12.25 15.933 13.817 17.5 15.75 17.5Z" stroke={fillColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.67249 33.1625L13.3 27.37C14.6825 26.4425 16.6775 26.5475 17.92 27.615L18.4975 28.1225C19.8625 29.295 22.0675 29.295 23.4325 28.1225L30.7125 21.875C32.0775 20.7025 34.2825 20.7025 35.6475 21.875L38.5 24.325" stroke={fillColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default ImageIcon;
