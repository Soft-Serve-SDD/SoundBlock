// import { renderers } from './fields';
import { Draggable } from '../Components/draggable';

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

  const diameter = 65

  return (
    // 3 x 2 grid of Basic knobs
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)'}}>
      <div style={{gridColumn: '1', gridRow: '1'}}>
        <Basic
          diameter={diameter}
          min={0}
          max={10}
          step={1}
          value={blockInfo.rate}
          onValueChange={setRate}
          ariaLabelledBy={'rate'}
        />
        <label id={'rate'}>Rate</label>
      </div>
      <div style={{gridColumn: '2', gridRow: '1'}}>
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
      <div style={{gridColumn: '3', gridRow: '1'}}>
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
      <div style={{gridColumn: '1', gridRow: '2'}}>
        <Basic
          diameter={diameter}
          min={0}
          max={10}
          step={1}
          value={blockInfo.release}
          onValueChange={setRelease}
          ariaLabelledBy={'release'}
        />
        <label id={'release'}>Release</label>
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
    </div>
  );
}

export function LoopBlock(){
  return (<Div> -- Loop Block --</Div>)
}
