import React from 'react';
import '../styles/Button.css';
import timer_icon from '../../../assets/icons/timer.svg';

const SleepBlockButton = (props) => {
  return (
    <button className="block-button" onClick={props.onClick}>
      <img width="20" alt="icon" src={timer_icon} />
    </button>
  );
};

export default SleepBlockButton;
