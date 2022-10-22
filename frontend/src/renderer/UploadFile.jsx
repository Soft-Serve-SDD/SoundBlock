import React from 'react';
import {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';

import {FileUpload, Close} from '@mui/icons-material';
import {Button, IconButton} from '@material-ui/core';

function Dropzone(Props) {
  const {setOpen} = Props;
  // This call back will be used to create a sample block once .wav files is droped
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
  }, []);

  // accepted file types 
  const accept = {
    'audio/*' : ['.wav']
  };

  const {getRootProps, getInputProps} = useDropzone({onDrop, accept});

  return (
    <section className="container">
      <Button onClick={()=>setOpen(false)}>
        <Close></Close>
      </Button>
    <div className='dropzone-div' {...getRootProps()}>
      <input className='dropzone-input' {...getInputProps()}/>
      <p> Drag or drop .wav files here</p>
    </div>
  </section>
  )
}

function Popup() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
    <Button onClick={()=>setOpen(true)}>
      <FileUpload></FileUpload>
    </Button>
    {isOpen && <Dropzone setOpen={setOpen}/>}
    </>
    
  )

}

export default function UploadFile() {
  return <Popup />
}