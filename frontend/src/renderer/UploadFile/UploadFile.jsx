import React from 'react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import upload from '../../../assets/icons/upload.svg';
import close from '../../../assets/icons/x.svg';
import "./UploadFile.css";
import "../styles/Button.css";

function Dropzone(Props) {
  const { setOpen } = Props;
  // This call back will be used to create a sample block once .wav files is droped
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  // restrict to one .wav upload
  const constraints = {
    accept: {
      'audio/*': ['.wav'],
    },
    multiple: false
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, constraints });

  return (
    <section className="container" onClick={() => setOpen(false)}>
      <div className="dropzone-container">
      <button className ="right" onClick={() => setOpen(false)}>
        <img width="20" alt="icon" src={close} />
      </button>
      <div className='dropzone-div' {...getRootProps()}>
        <input className="dropzone-input" {...getInputProps()} />
        <p> Drag or drop .wav files here</p>
      </div>
      </div>
    </section>
  );
}

function Popup() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>
        <img width="20" alt="icon" src={upload} />
      </button>
      {isOpen && <Dropzone setOpen={setOpen} />}
    </>
  );
}

export default function UploadFile() {
  return <Popup />;
}