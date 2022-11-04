import React from 'react';
import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import upload from '../../../assets/icons/upload.svg';
import close from '../../../assets/icons/x.svg';
import close from '../../../assets/icons/grip-vertical.svg';
import '../styles/UploadFile.css';
import '../styles/Button.css';

function Dropzone(Props) {
  const { setOpen, createBlock } = Props;
  // restrict to one .wav upload
  const constraints = {
    accept: {
      'audio/*': ['.wav'],
    },
    multiple: false,
  };
  // This call back will be used to create a sample block once .wav files is droped
  const onDrop = useCallback((acceptedFiles) => {
    // const reader = new FileReader();
    // console.log(acceptedFiles[0], acceptedFiles[0].name, acceptedFiles[0].path, acceptedFiles[0].type);
    // console.log(Props);
    createBlock(acceptedFiles);
    //this.Props.createBlock(acceptedFiles);
    setOpen(false);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, constraints });
  return (
    <section className="container">
      <div className="dropzone-container">
        <button className="right" onClick={() => setOpen(false)}>
          <img width="20" alt="icon" src={close} />
        </button>
        <div className="dropzone-div" {...getRootProps()}>
          <input className="dropzone-input" {...getInputProps()} />
          <p> Drag or drop .wav files here</p>
          <aside>{thumbs}</aside>
        </div>
        <button onClick={onUpload}>Upload</button>
      </div>
    </section>
  );
}

function Popup(Props) {
  //console.log(Props)
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>
        <img width="20" alt="icon" src={upload} />
      </button>
      {isOpen && <Dropzone setOpen={setOpen} createBlock={Props.createBlock} />}
    </>
  );
}

export default function UploadFile(Props) {
  return <Popup createBlock={Props.createBlock} />;
}
