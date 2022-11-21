// import { renderers } from './fields';
import { Draggable } from '../Components/draggable';
import { DropTarget } from '../Components/droppable';
import {useDroppable} from '@dnd-kit/core';
import {useDraggable} from '@dnd-kit/core';

// import Slider from '../Components/Slider';
// import { useState } from 'react';
// import simple knobs 
import { Basic } from 'react-dial-knob'
import React from 'react';


export function PlayBlock() {
  const Component = renderers['play'];
  return (
    <Draggable>
      <Component />
    </Draggable>
  );
}

export function AudioBlock(Props) {   
  const { adjustProperties, blockInfo } = Props


  const setRate = (val) => {
    adjustProperties(blockInfo, {...blockInfo, rate: val})
  }

  const setAmp = (val) => {
    adjustProperties(blockInfo, {...blockInfo, amp: val})
  }

  const setAttack = (val) => {
    adjustProperties(blockInfo, {...blockInfo, attack: val})
  }

  const setRelease = (val) => {
    adjustProperties(blockInfo, {...blockInfo, release: val})
  }

  const setStart = (val) => {
    adjustProperties(blockInfo, {...blockInfo, start: val})
  }

  const setFinish = (val) => {
    adjustProperties(blockInfo, {...blockInfo, finish: val})

  }

  const setDeltaRate = (val) => {
    adjustProperties(blockInfo, {...blockInfo, deltarate: val})
  }

  const diameter = 65
  const default_values = {
    rate: 0,
    deltarate: 0,
    amp: 5,
    attack: 0,
    release: 0,
    start: 0,
    finish: 10
  }

  const setDefault = () => {
    adjustProperties(blockInfo, {...blockInfo, ...default_values})
  }

  // on create, setDefault
  React.useEffect(() => {
    setDefault()
  }, [])

  return (
    // 3 x 2 grid of Basic knobs
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)'}}>
      <div style={{gridColumn: '1', gridRow: '1'}}>
        <Basic
          diameter={diameter}
          min={-24}
          max={24}
          step={1}
          value={blockInfo.rate}
          onValueChange={setRate}
          ariaLabelledBy={'rate'}
        />
        <label id={'rate'}>Semitones</label>
      </div>
      <div style={{gridColumn: '2', gridRow: '1'}}>
        <Basic
          diameter={diameter}
          min={0}
          max={10}
          step={1}
          value={blockInfo.deltarate}
          onValueChange={setDeltaRate}
          ariaLabelledBy={'deltarate'}
        />
        <label id={'deltarate'}>Rate Change</label>
      </div>
      <div style={{gridColumn: '3', gridRow: '1'}}>
        <Basic
          diameter={diameter}
          min={0}
          max={10}
          step={1}
          value={blockInfo.amp}
          onValueChange={setAmp}
          ariaLabelledBy={'amp'}
        />
        <label id={'amp'}>Amp</label>
      </div>
      <div style={{gridColumn: '1', gridRow: '2'}}>
        <Basic
          diameter={diameter}
          min={0}
          max={10}
          step={1}
          value={blockInfo.attack}
          onValueChange={setAttack}
          ariaLabelledBy={'attack'}
        />
        <label id={'attack'}>Attack</label>
      </div>
      <div style={{gridColumn: '2', gridRow: '2'}}>
        <Basic
          diameter={diameter}
          min={0}
          max={10}
          step={1}
          value={blockInfo.start}
          onValueChange={setStart}
          ariaLabelledBy={'start'}
        />
        <label id={'start'}>Start</label>
      </div>
      <div style={{gridColumn: '3', gridRow: '2'}}>
        <Basic
          diameter={diameter}
          min={0}
          max={10}
          step={1}
          value={blockInfo.finish}
          onValueChange={setFinish}
          ariaLabelledBy={'finish'}
        />
        <label id={'finish'}>Finish</label>
      </div>
      <div style={{gridColumn: '1', gridRow: '3', gridColumnEnd: 'span 3'}}>
        <button onClick={setDefault} style={{backgroundColor: 'aqua'}}>Reset</button>
      </div>
    </div>

    

  );
}

export function LoopBlock(props) {
  // a droppable block 100px by 100px light gray
  const {isOver, setNodeRef } = useDroppable({
    id: 'loop' + Math.random(),
  });
    const style = {
      color: isOver ? 'green' : undefined,
      width: '300px', height: '300px', backgroundColor: 'lightgray'
    };
    
    return (
      <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}



export function TestDroppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}


export function TestDraggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'draggable1',
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div style={{width: '100px', height: '100px', backgroundColor: 'orange'}}></div>
      {props.children}
    </button>
  );
}
