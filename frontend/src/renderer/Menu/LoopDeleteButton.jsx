import React from 'react';
import '../styles/Button.css';
import delete_icon from '../../../assets/icons/delete_icon.svg';


const DeleteButton = (props) => {
  return (
    <button className="delete-button" onClick={props.onClick}>
      <img width="20" alt="testing" src={delete_icon} />
    </button>
  );
};


export default DeleteButton;



