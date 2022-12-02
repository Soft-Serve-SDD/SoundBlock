import React from 'react';
import '../styles/Button.css';
import play from '../../../assets/icons/play.svg';
import download from '../../../assets/icons/download.svg';
import loop from '../../../assets/icons/loop.svg';

// play button with icon play.svg
export function PlayButton(props){
  return (
    <button className="play-button" onClick={props.onClick}>
      <img width="20" alt="icon" src={play} />
    </button>
  );
};

// download button with icon play.svg
export function DownloadButton(props){
  return (
    <button className="play-button" onClick={props.onClick}>
      <img width="20" alt="icon" src={download} />
    </button>
  );
};

// add loop button with icon play.svg
export function LoopButton(props){
  return (
    <button className="loop-button" onClick={props.onClick}>
      <img width="20" alt="icon" src={loop} />
    </button>
  );
};
