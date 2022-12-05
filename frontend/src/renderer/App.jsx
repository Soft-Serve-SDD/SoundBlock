/* External */
import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';

/* Utilities */
import { arrayMove, insertAtIndex, removeAtIndex } from './utils/array';

/* Component Imports */
import BlockDeleteButton from './Menu/BlockDeleteButton';
import UploadFile from './Menu/UploadFile';
import ToolsMenu from './Menu/ToolsMenu';
import Workspace from './Workspace';

/* Styles */
import './styles/App.css';
import Workspace from './Workspace';

import { TooltipContext } from './Context/context';

var activeContainer = 'loop1';

function App() {
  const [showTooltip, setShowTooltip] = useState(true);
  
  const [activeId, setActiveId] = useState(null);

  // Associated sample blocks for each loop lane
  const [itemGroups, setItemGroups] = useState({
    loop1: [],
  });
  // Parameters of each item in group
  const [itemProps, setItemProps] = useState({
    loop1: [],
  });
  // Parameters for each loop lane
  const [loopParams, setLoopParams] = useState({
    loop1: { iterations: 1, sleep: 1, interval: 1 },
  });

  const numGroups = Object.keys(itemGroups).length;

  const addGroup = () => {
    const last_id = Object.keys(itemGroups).slice(-1)[0]
    const new_id = 'loop' + (numGroups + 1).toString()
    setItemGroups({ ...itemGroups, [new_id]: [] });
    setItemProps({ ...itemProps, [new_id]: [] });
    setLoopParams({ ...loopParams, [new_id]: { iterations: 1, sleep: 1, interval: 1 } });
    // console.log('itemGroups', itemGroups);
    // console.log('itemProps', itemProps);
    // console.log('loopParams', loopParams);
  };

  const removeLastGroup = () => {
    console.log('all groups: ', itemGroups);
    // There must be at least one  loop lane
    // disable last loop lane from being removed
    if (Object.keys(loopParams).length == 1) {
      return;
    }
    
    const newGroups = { ...itemGroups };
    delete newGroups[Object.keys(newGroups)[Object.keys(newGroups).length - 1]];
    setItemGroups(newGroups);
    const newParams = { ...loopParams };
    delete newParams[Object.keys(newParams)[Object.keys(newParams).length - 1]];
    setLoopParams(newParams)
    const newItems = { ...itemProps};
    delete newItems[Object.keys(newItems)[Object.keys(newItems).length -1]];
    setItemProps(newItems)
  };

  // Deletes most recently added block
  // TODO: Add System for deleting any given block
  const deleteBlock = () => {
    //Deletes blocks starting with last modified
    //Then deletes starting at the end of the last loop and moves toward first
    if (
      itemGroups[activeContainer] == undefined ||
      itemGroups[activeContainer].length == 0
    ) {
      for (const x of Object.keys(itemGroups)) {
        if (itemGroups[x] != undefined && itemGroups[x].length != 0) {
          activeContainer = x;
        }
      }
    }
    if (itemGroups[activeContainer] != undefined) {
      itemGroups[activeContainer].pop();
      itemProps[activeContainer].pop();
      setItemGroups({ ...itemGroups });
      setItemProps({ ...itemProps });
    }
  };

  // When play button is pressed, function is called to format data
  // and send IPC message via electron
  const exportData = (q) => {
    if (itemGroups.length != 0) {
      const toSend = [];
      if (q) {
        const file = {
          export: uuidv4(),
        };
        toSend.push(file);
      }
      for (const [key, value] of Object.entries(loopParams)) {
        const chunk = {
          loop: {
            iterations: value.iterations,
            sleeptime: value.sleep / 10,
            subblocks: [],
          },
        };
        // console.log("sending item props", key, itemProps)

        for (var i = 0; i < itemProps[key].length; i++) {
          // if item name is not Sleep
          if (itemProps[key][i].name != 'Sleep') {
            var sample = {};
            for (const [key2, value2] of Object.entries(itemProps[key][i])) {
              sample[key2] = value2;
            }
            sample['path'] = sample['path'];
            sample['rate'] = (2 ** (1 / 12)) ** sample['rate'];
            sample['deltarate'] = (2 ** (1 / 12)) ** sample['deltarate'] - 1;
            sample['amp'] = sample['amp'] / 5;
            sample['attack'] = sample['attack'] / 10;
            sample['start'] = sample['start'] / 100;
            sample['finish'] = sample['finish'] / 100;
            sample['interval'] = value.interval / 100;
            chunk.loop.subblocks.push((sample = { sample }));
          } else {
            var sleep = {};
            for (const [key2, value2] of Object.entries(itemProps[key][i])) {
              sleep[key2] = value2;
            }
            sleep['sleeptime'] = sleep['sleeptime'] / 100;
            chunk.loop.subblocks.push((sleep = { sleep }));
          }
        }
        toSend.push(chunk);
      }
      window.electron.sendData(toSend);
    }
  };

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragCancel = () => setActiveId(null);

  const handleDragOver = ({ active, over }) => {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    activeContainer = active.data.current.sortable.containerId;
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

  // At end of drag handle cases:
  // * Item is dragged out of bounds
  // * Item is dragged ontop of itself
  // * Item is dragged to different loop lane
  // * Item is dragged to different order in current loop lane
  const handleDragEnd = ({ active, over }) => {
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
      const newProps = { ...itemProps };
      newProps[containerId][index] = props;
      return newProps;
    });
  };

  const adjustLoopParams = (id, params) => {
    setLoopParams((loopParams) => {
      const newParams = { ...loopParams };
      newParams[id] = params;
      return newParams;
    });
  };

  const generateBlock = (file) => {
    var new_block = {
      id: uuidv4(),
      name: file[0].name,
      path: file[0].name,
      rate: 0,
      deltarate: 0,
      amp: 5,
      attack: 0,
      release: 0,
      start: 0,
      finish: 100,
    };

    // Auto Add to group 1:
    setItemGroups({
      ...itemGroups,
      loop1: [...itemGroups.loop1, new_block.id],
    });
    setItemProps({ ...itemProps, loop1: [...itemProps.loop1, new_block] });
  };

  const generateSleepBlock = () => {
    // log all items in loop1
    console.log(itemProps.loop1);
    var new_block = {
      id: uuidv4(),
      name: "Sleep",
      sleeptime: 20
    }
    // Auto Add to group 1:
    setItemGroups({
      ...itemGroups,
      loop1: [...itemGroups.loop1, new_block.id],
    });
    setItemProps({ ...itemProps, loop1: [...itemProps.loop1, new_block] });
  };

  return (
    <div style={{ width: '100%' }}>
      <h1
        style={{ textAlign: 'center', marginBottom: '0px', paddingTop: '30px' }}
      >
        Sound Blocks
      </h1>
      <br />
      <h2 style={{ textAlign: 'center', marginTop: '0px' }}>
        Music Editing Software
      </h2>
        <ToolsMenu
          addGroup={addGroup}
          exportData={exportData}
          removeLastGroup={removeLastGroup}
          sleepBlock={generateSleepBlock}
          showTooltip= { showTooltip }
          setShowTooltip= { setShowTooltip }
        />
      <DndContext
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TooltipContext.Provider
        value={ {showTooltip} }
      >
            <Workspace
              itemProps={itemProps}
              itemGroups={itemGroups}
              loopParams={loopParams}
              activeId={activeId}
              adjustProperties={adjustProperties}
              adjustLoopParams={adjustLoopParams}
            />
          </TooltipContext.Provider>
          <div
            style={{
              background: 'white',
              width: '20%',
              borderRadius: '10px',
              padding: '10px',
              margin: '5px',
            }}
          >
            <h2 style={{ textAlign: 'center' }}>Upload Samples</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <UploadFile createBlock={generateBlock} />
              <BlockDeleteButton onClick={deleteBlock} />
            </div>
          </div>
        </div>
      </DndContext>
    </div>
  );
}
export default App;
