import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import UploadFile from './Menu/UploadFile';
import PlayButton from './Menu/PlayButton';
import Canvas from './Canvas/Canvas';

import { renderers } from './Blocks/fields';
import { Draggable } from './Components/draggable';
import { useState } from 'react';
import { AudioBlock } from './Blocks/draggableBlocks';

const Container = () => {
  return (
    <React.Fragment>
      <div style={{ width: '100%' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '0px' }}>
          Sound Blocks
        </h1>
        <br />
        <h2 style={{ textAlign: 'center', marginTop: '0px' }}>
          Music Editing Software
        </h2>
      </div>
      <div
        style={{
          display: 'flex',
          paddingTop: '25px',
          justifyContent: 'center',
        }}
      >
        <BlockMenu />
        <WorkSpace />
        <SoundLibrary />
      </div>
    </React.Fragment>
  );
};

const WorkSpace = () => {
  return (
    <div style={{ width: '50%', background: 'grey', height: 'calc(100vh - 200px)' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>WorkSpace</h1>
        <PlayButton />
        <Canvas />
      </div>
    </div>
  );
};

const BlockMenu = () => {
  return (
    // height is window height - 100px,
    <div style={{ width: '25%', background: 'white', height: 'calc(100vh - 200px)' }}>
      {/* centered div */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>Block Menu</h1>
      </div>
    </div>
  );
};

const SoundLibrary = () => {
  const [activeFiles, setActiveFiles] = useState([]);

  const createBlock = (file) => {
    console.log(file[0]);
    setActiveFiles([...activeFiles, file]);
  };

  return (
    <React.Fragment>
      <div style={{ width: '25%', background: 'white', height: 'calc(100vh - 200px)' }}>
        <div>
          <h1 style={{ display: 'flex', justifyContent: 'center' }}>Sound Library</h1>
          <UploadFile createBlock={createBlock} />
          {activeFiles.map((file) => (
            <Draggable handle={true} key={file[0].name}>
              <AudioBlock title={file[0].name} duration={'10'}/>
            </Draggable>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Container />} />
      </Routes>
    </Router>
  );
}
