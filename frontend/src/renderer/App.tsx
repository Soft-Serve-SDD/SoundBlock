import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UploadFile from './Components/UploadFile';


const Container = () => {
  return (
    <React.Fragment>
      <div style={{width: "100%"}}>
        <h1 style={{textAlign: "center", marginBottom: "0px"}}>Sound Blocks</h1> 
        <br/> 
        <h2 style={{textAlign: "center", marginTop: "0px"}}>Music Editing Software</h2>
      </div>
      <div style={{display: "flex", paddingTop: "25px", justifyContent: "center"}}>
        <BlockMenu />
        <WorkSpace/>
        <SoundLibrary/>
      </div>
    </React.Fragment>
  )
}

const WorkSpace = () => {
  return (
    <div style={{width: "50%", background: "grey"}}>
      <h1 >WorkSpace</h1>
      <UploadFile />
      <Canvas />
    </div>
  );
};

const BlockMenu = () => {
  return (
    <div style={{width: "25%", background: "white"}}>
      <h1>Block Menu</h1>
    </div>
  )
}

const SoundLibrary = () => {
  return (
    <div style={{width: "25%", background: "white"}}>
      <h1>Sound Library</h1>
    </div>
  )
}




export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Container/>} />
      </Routes>
    </Router>
  );
}
