import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Droppable from "./components/Droppable";
import Item from "./components/Item";
import { arrayMove, insertAtIndex, removeAtIndex } from "./utils/array";


// import React from 'react';
// import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import UploadFile from './Menu/UploadFile';
import PlayButton from './Menu/PlayButton';
// import LoopButton from './Menu/LoopButton';
// import Canvas from './Canvas/Canvas';
// // import useLocalStorage from 'use-local-storage'

// import {DndContext} from '@dnd-kit/core';
// import { Draggable } from './Components/draggable';
// import { useState } from 'react';
import { AudioBlock } from './Blocks/draggableBlocks';
// import { v4 as uuidv4 } from 'uuid';
// import {LoopBlock} from './Blocks/draggableBlocks';
// import { TestDraggable } from './Blocks/draggableBlocks';
// import { TestDroppable } from './Blocks/draggableBlocks';
// import Droppable from "./components/Droppable";
import { LoopChild } from './Blocks/LoopBlock';

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
  const [activeBlocks, setActiveBlocks] = useState([]);

  const createLoop = () => {
    const newLoop = {
      id: uuidv4(),
      type: 'loop',
      name: 'loop' + uuidv4(),
    };
    setActiveBlocks([...activeBlocks, newLoop])
  };


  return (
    // height is window height - 100px,
    <div style={{ width: '25%', background: 'white', height: 'calc(100vh - 200px)' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1 style={{color: 'grey'}}>Block Menu</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <LoopButton onClick={createLoop} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Droppable />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TestDraggable />
      </div>
    </div>
  );
};

const SoundLibrary = () => {
  const [activeFiles, setActiveFiles] = useState([]);
  const [activeBlocks, setActiveBlocks] = useState([]);

  const createBlock = (file) => {
    //setActiveFiles([...activeFiles, file]);
    var new_block = {
      id: uuidv4(),
      name: file[0].name,
      path: file[0].name,
      rate: 1,
      deltarate: 0,
      amp: 1,
      attack: 1, 
      release: 1, 
      start: 1, 
      finish: 1
    }

    setActiveBlocks([...activeBlocks, new_block])
  };

  const deleteBlock = (id) => {
    setActiveBlocks(activeBlocks.filter((block) => block.id !== id));
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
            // ...activeBlocks[i],
            path: activeBlocks[i].name,
            rate: ((2**(1/12))**activeBlocks[i].rate),
            deltarate: ((2**(1/12))**activeBlocks[i].deltarate),
            amp: (activeBlocks[i].amp/5),
            attack: (activeBlocks[i].attack/10),
            release: (activeBlocks[i].release/10),
            start: (activeBlocks[i].start/10),
            finish: (activeBlocks[i].finish/10)
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
            <Draggable key={block.name}>
              <AudioBlock adjustProperties={adjustProperties} blockInfo = {block}/>
            </Draggable>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

// export default function App() {
//   // return (
//     // <Router>
//     //   <Routes>
//     //     <Route path="/" element={<Container />} />
//     //   </Routes>
//     // </Router>
// }




// taken playground code:

function App() {
  const [itemGroups, setItemGroups] = useState({
    loop1: ["1", "2", "3"],
    loop2: ["4", "5", "6"],
    loop3: ["7", "8", "9"],
  });
  const [activeId, setActiveId] = useState(null);

  const [itemProps, setItemProps] = useState({
    loop1: [{rate: 1, deltarate: 1, amp: 1, attack: 1, start: 1, finish: 1}, {rate: 1, deltarate: 2, amp: 1, attack: 1, start: 1, finish: 1}, {rate: 1, deltarate: 3, amp: 1, attack: 1, start: 1, finish: 1}],
    loop2: [{rate: 2, deltarate: 0, amp: 2, attack: 2, start: 2, finish: 2}, {rate: 2, deltarate: 0, amp: 2, attack: 2, start: 2, finish: 2}, {rate: 2, deltarate: 0, amp: 2, attack: 2, start: 2, finish: 2}],
    loop3: [{rate: 3, deltarate: 0, amp: 3, attack: 3, start: 3, finish: 3}, {rate: 3, deltarate: 0, amp: 3, attack: 3, start: 3, finish: 3}, {rate: 3, deltarate: 0, amp: 3, attack: 3, start: 3, finish: 3}],
  });
  const [activeItemProps, setActiveItemProps] = useState(null);


  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragCancel = () => setActiveId(null);

  const handleDragOver = ({ active, over }) => {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;

    if (activeContainer !== overContainer) {
      setItemGroups((itemGroups) => {
        const activeIndex = active.data.current.sortable.index;
        const overIndex =
          over.id in itemGroups
            ? itemGroups[overContainer].length + 1
            : over.data.current.sortable.index;
        
        return moveBetweenContainers(
          itemGroups,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id
        );
      });
      setItemProps((itemProps) => {
        const activeIndex = active.data.current.sortable.index;
        const overIndex =
          over.id in itemProps
            ? itemProps[overContainer].length + 1
            : over.data.current.sortable.index;
        
        return moveBetweenContainers(
          itemProps,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          itemProps[activeContainer][activeIndex]
        );
      });
    }
  };

  const handleDragEnd = ({ active, over }) => {
    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;
    const activeIndex = active.data.current.sortable.index;
    const overIndex =
      over.id in itemGroups
        ? itemGroups[overContainer].length + 1
        : over.data.current.sortable.index;
    console.log('drag end, props:', itemProps[activeContainer])
    console.log('activeindex:', activeIndex)
    if (!over) {
      setActiveId(null);
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex =
        over.id in itemGroups
          ? itemGroups[overContainer].length + 1
          : over.data.current.sortable.index;

      setItemGroups((itemGroups) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...itemGroups,
            [overContainer]: arrayMove(
              itemGroups[overContainer],
              activeIndex,
              overIndex
            ),
          };
        } else {
          newItems = moveBetweenContainers(
            itemGroups,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            active.id
          );
        }

        return newItems;
      });
      
      setItemProps((itemProps) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...itemProps,
            [overContainer]: arrayMove(
              itemProps[overContainer],
              activeIndex,
              overIndex
            ),
          };
        } else {
          newItems = moveBetweenContainers(
            itemProps,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            itemProps[activeContainer][activeIndex]
          );
        }

        return newItems;
      });
    }

    setActiveId(null);
  };

  const moveBetweenContainers = (
    items,
    activeContainer,
    activeIndex,
    overContainer,
    overIndex,
    item
  ) => {
    return {
      ...items,
      [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
    };
  };

  const adjustProperties = (id, props) => {
    // get container id and index of item with id
    let containerId = null;
    let index = null;
    for (const [key, value] of Object.entries(itemGroups)) {
      if (value.includes(id)) {
        containerId = key;
        index = value.indexOf(id);
      }
    }
    // update itemProps
    setItemProps((itemProps) => {
      const newProps = {...itemProps};
      newProps[containerId][index] = props;
      return newProps;
    });
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {/* columns div, with groups left to right mapped */}
      <div style={{ display: "flex" }}>
        {Object.keys(itemGroups).map((group) => (
          <Droppable
            id={group}
            items={itemGroups[group]}
            activeId={activeId}
            key={group}
            props={itemProps[group]}
            adjustProperties={adjustProperties}
          >
            {<LoopChild/>}
          </Droppable>

        ))}
      </div>
      {/* <DragOverlay>{activeId ? <Item id={activeId}/> : null}</DragOverlay> */}
    </DndContext>
  );
}

export default App;


