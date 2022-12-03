import React from 'react';
import '../styles/Button.css';
import delete_icon2 from '../../../assets/icons/delete_icon2.svg';

const DeleteButton2 = (props) => {
  return (
    <button className="delete-button" onClick={props.onClick}>
      <img width="20" alt="icon" src={delete_icon2} />
    </button>
  );
};

export default DeleteButton2;
