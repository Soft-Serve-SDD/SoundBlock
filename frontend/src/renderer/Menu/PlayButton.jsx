import React from 'react';
import "../styles/Button.css";
import play from '../../../assets/icons/play.svg';


// play button with icon play.svg
const PlayButton = (props) => {
  return (
    <button className="play-button" onClick={props.onClick}>
      <img width="20" alt="icon" src={play} />
    </button>
  );
};

export default PlayButton;


