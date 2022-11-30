import React from 'react';
import '../styles/Button.css';
import loop from '../../../assets/icons/loop.svg';

const LoopButton = (props) => {
  return (
    <button className="loop-button" onClick={props.onClick}>
      <img width="20" alt="icon" src={loop} />
    </button>
  );
};

export default LoopButton;
