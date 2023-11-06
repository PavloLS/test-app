import React from 'react';

const DeleteIcon: React.FC<{onClick: () => void}> = ({onClick}) => {
  return <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
    <path d="M8.71331 17.6667C8.71331 18.4033 9.35259 19 10.1419 19H15.8562C16.6455 19 17.2847 18.4033 17.2847 17.6667V9.66667H8.71331V17.6667ZM17.999 7.66667H15.499L14.7847 7H11.2133L10.499 7.66667H7.99902V9H17.999V7.66667Z" fill="#9B9D9F"/>
  </svg>;
};

export default DeleteIcon;