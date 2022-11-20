import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import UploadFile from './Menu/UploadFile';
import PlayButton from './Menu/PlayButton';
import Canvas from './Canvas/Canvas';
// import useLocalStorage from 'use-local-storage'

import { Draggable } from './Components/draggable';
import { useState } from 'react';
import { AudioBlock } from './Blocks/draggableBlocks';
import { v4 as uuidv4 } from 'uuid';
import {LoopBlock} from './Blocks/fields'

const Container = () => {
  // const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = React.useState('light');

  const switchTheme = () => {

    const newTheme = theme === 'light' ? 'dark' : 'light';
    if (newTheme === 'light'){
      document.body.style.background ="rgb(193, 227, 240)";
      document.body.style.color ="black";
    } else {
      document.body.style.background ="black";
      document.body.style.color ="white";
    }
    setTheme(newTheme);
  }

  const buttonStyle = {
    color: theme === 'light' ? 'black' : 'white',
    border: theme === 'light' ? '1px solid black' : '1px solid white',
  }

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
        <button style={buttonStyle} onClick={switchTheme}> {theme === 'light' ? 'dark' : 'light'} Mode </button>
      </div>
      <div
        style={{
          display: 'flex',
          paddingTop: '25px',
          justifyContent: 'center',
        }}
      >
        <BlockMenu />
        <WorkSpace color={theme === 'light' ? 'grey' : 'dark blue'}/>
        <SoundLibrary />
      </div>
    </React.Fragment>
  );
};

const WorkSpace = (color) => {
  return (
    <div style={{ width: '50%', background: "grey", height: 'calc(100vh - 200px)' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>WorkSpace</h1>
        {/* <Canvas /> */}
      </div>
    </div>
  );
};

const BlockMenu = () => {
  return (
    // height is window height - 100px,
    <div style={{ width: '25%', background: 'white', height: 'calc(100vh - 200px)' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1 style={{color: 'grey'}}>Block Menu</h1>
      </div>
      <LoopBlock onClick={()=>{console.log("Loop Block")}}/>
    </div>
  );
};

/* Block Json has format:
Block: {
  duration: d,
  name: n,
  rate: r,
  amp: a,
  path: p
}
*/
const SoundLibrary = () => {
  const [activeFiles, setActiveFiles] = useState([]);
  const [activeBlocks, setActiveBlocks] = useState([]);

  const createBlock = (file) => {
    //setActiveFiles([...activeFiles, file]);
    var new_block = {
      id: uuidv4(),
      name: file[0].name,
      path: file[0].name,
      // duration: -1,
      rate: 1,
      amp: 3,
      attack: 1, 
      release: 1, 
      start: 1, 
      finish: 1
    }

    setActiveBlocks([...activeBlocks, new_block])
  };

  const adjustProperties = (block, updatedBlock) => {
    const newBlocksState = activeBlocks.map(b => {
      if (b.id == block.id){
       return updatedBlock
      }
      return b
    })
    setActiveBlocks(newBlocksState)
    // console.log("updated")
    // console.log(newBlocksState)
  }

  const exportData = () => {
    if (activeBlocks.length != 0) {
      const toSend = []
      for (let i = 0; i < activeBlocks.length; i++) {
        const chunk = {
          sample: {
            ...activeBlocks[i],
            path: activeBlocks[i].name,
            rate: (activeBlocks[i].rate/10),
          }
        }
        toSend.push(chunk)
    }
    console.log("sending data", toSend)
    window.electron.sendData(toSend)
    }
    
  }

  return (
    <React.Fragment>
      <div style={{ width: '25%', background: 'white', height: 'calc(100vh - 200px)' }}>
        <div>
          <h1 style={{color: 'grey',display: 'flex', justifyContent: 'center' }}>Sound Library</h1>
          <PlayButton onClick={exportData}/>
          <UploadFile createBlock={createBlock} />
          {activeBlocks.map((block) => (
            <Draggable handle={true} key={block.name}>
              <AudioBlock adjustProperties={adjustProperties} blockInfo = {block} duration={'10'}/>
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
