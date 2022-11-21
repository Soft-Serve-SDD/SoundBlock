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
import { v4 as uuidv4 } from 'uuid';

import Droppable from "./components/Droppable";
import Item from "./components/Item";
import { arrayMove, insertAtIndex, removeAtIndex } from "./utils/array";
import SoundLibrary from "./Components/SoundLibrary";

import './styles/App.css';

import PlayButton from './Menu/PlayButton';
import LoopChild from './Blocks/LoopBlock';
import UploadFile from "./Menu/UploadFile";

// const Container = () => {
//   // const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//   const [theme, setTheme] = React.useState('light');

//   const switchTheme = () => {

//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     if (newTheme === 'light'){
//       document.body.style.background ="rgb(193, 227, 240)";
//       document.body.style.color ="black";
//     } else {
//       document.body.style.background ="black";
//       document.body.style.color ="white";
//     }
//     setTheme(newTheme);
//   }

//   const buttonStyle = {
//     color: theme === 'light' ? 'black' : 'white',
//     border: theme === 'light' ? '1px solid black' : '1px solid white',
//   }

//   return (
//     <React.Fragment>
//       <div style={{ width: '100%' }}>
//         <h1 style={{ textAlign: 'center', marginBottom: '0px' }}>
//           Sound Blocks
//         </h1>
//         <br />
//         <h2 style={{ textAlign: 'center', marginTop: '0px' }}>
//           Music Editing Software
//         </h2>
//         <button style={buttonStyle} onClick={switchTheme}> {theme === 'light' ? 'dark' : 'light'} Mode </button>
//       </div>
//       <div
//         style={{
//           display: 'flex',
//           paddingTop: '25px',
//           justifyContent: 'center',
//         }}
//       >
//         <BlockMenu />
//         <WorkSpace color={theme === 'light' ? 'grey' : 'dark blue'}/>
//         <SoundLibrary />
//       </div>
//     </React.Fragment>
//   );
// };

// const WorkSpace = (color) => {
//   return (
//     <div style={{ width: '50%', background: "grey", height: 'calc(100vh - 200px)' }}>
//       <div style={{ display: 'flex', justifyContent: 'center' }}>
//         <h1>WorkSpace</h1>
//         {/* <Canvas /> */}
//       </div>
//     </div>
//   );
// };

// const BlockMenu = () => {
//   const [activeBlocks, setActiveBlocks] = useState([]);

//   const createLoop = () => {
//     const newLoop = {
//       id: uuidv4(),
//       type: 'loop',
//       name: 'loop' + uuidv4(),
//     };
//     setActiveBlocks([...activeBlocks, newLoop])
//   };


//   return (
//     // height is window height - 100px,
//     <div style={{ width: '25%', background: 'white', height: 'calc(100vh - 200px)' }}>
//       <div style={{ display: 'flex', justifyContent: 'center' }}>
//         <h1 style={{color: 'grey'}}>Block Menu</h1>
//       </div>
//       <div style={{ display: 'flex', justifyContent: 'center' }}>
//         <LoopButton onClick={createLoop} />
//       </div>
//       <div style={{ display: 'flex', justifyContent: 'center' }}>
//         <Droppable />
//       </div>
//       <div style={{ display: 'flex', justifyContent: 'center' }}>
//         <TestDraggable />
//       </div>
//     </div>
//   );
// };

/*const SoundLibrary = () => {
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


  return (
    <React.Fragment>
      <div style={{ width: '25%', background: 'white', height: 'calc(100vh - 200px)' }}>
        <div>
          <h1 style={{color: 'grey',display: 'flex', justifyContent: 'center' }}>Sound Library</h1>
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
*/
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
    loop1: [],
    loop2: [],
    loop3: [],
  });
  const [activeId, setActiveId] = useState(null);

  const [itemProps, setItemProps] = useState({
    loop1: [],
    loop2: [],
    loop3: [],
  });
  const [activeItemProps, setActiveItemProps] = useState(null);

  const [loopParams, setLoopParams] = useState({
    loop1: { iterations: 4, sleep: 1, interval: 1 }, 
    loop2: { iterations: 5, sleep: 1, interval: 1 },
    loop3: { iterations: 6, sleep: 1, interval: 1 },
  });
  const [activeLoopParams, setActiveLoopParams] = useState(null);

// -----------------not working yet: ---------------
  const addGroup = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setItemGroups({
      ...itemGroups,
      [newId]: [],
    });
    const newParams = {
      ...loopParams,
      [newId]: {
        iterations: 4, sleep: 1, interval: 1
      }
    }
    setLoopParams(newParams)

  };

  const removeLastGroup = () => {
    const newGroups = { ...itemGroups };
    delete newGroups[Object.keys(newGroups)[Object.keys(newGroups).length - 1]];
    setItemGroups(newGroups);
    const newParams = { ...loopParams };
    delete newParams[Object.keys(newParams)[Object.keys(newParams).length - 1]];
    setLoopParams(newParams)
  };
// -------------------up until here------------------------

  const exportData = () => {
    if (itemGroups.length != 0) {
      const toSend = []
      for (const [key, value] of Object.entries(loopParams)) {
        const chunk = {
          loop: {
            iterations: value.iterations,
            sleeptime: value.sleep/10,
            subblocks: []
          }
        }

        for (var i = 0; i < itemProps[key].length; i++) {
          var sample = {}
          for (const [key2, value2] of Object.entries(itemProps[key][i])) {
            sample[key2] = value2
          }
          sample["path"] = sample["path"]
          sample["rate"] = ((2**(1/12))**sample["rate"])
          sample["deltarate"] = ((2**(1/12))**sample["deltarate"] - 1)
          sample["amp"] = (sample["amp"]/5)
          sample["attack"] = (sample["attack"]/10)
          sample["start"] = (sample["start"]/10)
          sample["finish"] = (sample["finish"]/10)
          sample["interval"] = (value.interval/10)
          chunk.loop.subblocks.push(sample = {sample})
        }
        toSend.push(chunk)
      }
    console.log("sending data", toSend)
    window.electron.sendData(toSend)
    }
  }


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
   // console.log('drag end, props:', itemProps[activeContainer])
    c//onsole.log('activeindex:', activeIndex)
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

  const adjustLoopParams = (id, params) => {
    setLoopParams((loopParams) => {
      const newParams = {...loopParams};
      newParams[id] = params;
      return newParams;
    });
  }

  const generateBlock = (file) => {
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
    
    // Auto Add to group 1:
    setItemGroups({loop1: [...itemGroups.loop1, new_block.id], loop2: itemGroups.loop2, loop3: itemGroups.loop3})
    setItemProps({loop1: [...itemProps.loop1, new_block], loop2: itemProps.loop2, loop3: itemProps.loop3})
  }


  return (
    <div style={{ width: '100%' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '0px', paddingTop: '30px' }}>
        Sound Blocks
      </h1>
      <br />
      <h2 style={{ textAlign: 'center', marginTop: '0px' }}>
        Music Editing Software
      </h2>
      <DndContext
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div style={{ display: "flex", justifyContent: 'center' }}>
          <div style={{ width: '80%', background: "grey" }}> 
          <h3 style={{paddingLeft: '15px'}}>
            Play Sample  
          </h3>
          <PlayButton onClick={exportData}/>
           
            <div style={{display: "flex", justifyContent: 'center'}}>
              {/* <button onClick={addGroup}>Add Loop</button>
              <button onClick={removeLastGroup}>Remove Loop</button> */}
                {Object.keys(itemGroups).map((group) => (
                  <Droppable
                    id={group}
                    items={itemGroups[group]}
                    activeId={activeId}
                    key={group}
                    props={itemProps[group]}
                    adjustProperties={adjustProperties}
                  >
                    <div style={{width: '320px'}}>
                      {<LoopChild id={group} params={loopParams[group]} adjustLoopParams={adjustLoopParams} />}
                    </div>
                  </Droppable>
              ))}
             </div>
          </div>
          <div style={{background: 'white', width: '20%'}}>
            <h3 style={{textAlign: 'center'}}>
              Upload Samples
            </h3>
            <UploadFile createBlock={generateBlock}/>
          </div>
          
        </div>
          
      {/* <DragOverlay>{activeId ? <Item id={activeId}/> : null}</DragOverlay> */}
    </DndContext>
    </div>
  );
}

/*

    <div style={{ width: '50%', background: "grey", height: 'calc(100vh - 200px)' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>WorkSpace</h1>
        </div>
        </div>






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
*/
export default App;


