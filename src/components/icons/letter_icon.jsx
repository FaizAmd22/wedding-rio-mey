const LetterIcon = ({ fillColor = '#EE5DA1', ...others }) => {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" {...others}>
      <path d="M15.75 38.5H26.25C35 38.5 38.5 35 38.5 26.25V15.75C38.5 7 35 3.5 26.25 3.5H15.75C7 3.5 3.5 7 3.5 15.75V26.25C3.5 35 7 38.5 15.75 38.5Z" stroke={fillColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27.5625 15.75H14.4375" stroke={fillColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27.5625 26.25H14.4375" stroke={fillColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default LetterIcon;
