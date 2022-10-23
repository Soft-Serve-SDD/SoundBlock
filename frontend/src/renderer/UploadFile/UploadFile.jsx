import React from 'react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { FileUpload, Close } from '@mui/icons-material';
import { Button } from '@material-ui/core';

import "./UploadFile.css";

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
      <Button className ="right" onClick={() => setOpen(false)}>
        <Close></Close>
      </Button>
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
      <Button onClick={() => setOpen(true)}>
        <FileUpload></FileUpload>
      </Button>
      {isOpen && <Dropzone setOpen={setOpen} />}
    </>
  );
}

export default function UploadFile() {
  return <Popup />;
}