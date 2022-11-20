import { renderers } from './fields';
import { Draggable } from '../Components/draggable';
import Slider from '../Components/Slider';
import { useState } from 'react';
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

export function SampleBlock() {
  const Component = renderers['sample'];
  return (
    <Draggable handle={true}>
      <Component />
    </Draggable>
  );
}

export function AudioBlock(Props) {   
  const { adjustProperties, blockInfo } = Props
  console.log(blockInfo)
  const [name, setName ] = useState(blockInfo.name)
  const [file, setFile] = useState(blockInfo.file)

  
  const setRate = (rate) => {
    adjustProperties(blockInfo, rate)
  }

  const setAmp = (amp) => {
    adjustProperties(blockInfo, amp)
  }

  const setAttack = (attack) => {
    adjustProperties(blockInfo, attack)
  }

  const setRelease = (release) => {
    adjustProperties(blockInfo, release)
  }

  const setStart = (start) => {
    adjustProperties(blockInfo, start)
  }

  const setFinish = (finish) => {
    adjustProperties(blockInfo, finish)
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
