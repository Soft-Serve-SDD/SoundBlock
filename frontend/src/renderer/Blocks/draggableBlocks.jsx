import { renderers } from './fields';
import { Draggable } from '../Components/draggable';
import Slider from '../Components/Slider';
import { useState } from 'react';
// import simple knobs 
import { Donut } from 'react-dial-knob'
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

// blocks have properties: rate, amp, attack, release, start, finish

  const adjustRate = (rate) => {
    adjustProperties(blockInfo, rate)
  }

  const adjustAmp = (amp) => {
    adjustProperties(blockInfo, amp)
  }

  const adjustAttack = (attack) => {
    adjustProperties(blockInfo, attack)
  }

  const adjustRelease = (release) => {
    adjustProperties(blockInfo, release)
  }

  const adjustStart = (start) => {
    adjustProperties(blockInfo, start)
  }

  const adjustFinish = (finish) => {
    adjustProperties(blockInfo, finish)
  }



  const setValue = (value) => {
    adjustProperties(blockInfo, value)
  }

// return knobs in a 3x2 grid
  var value = 0;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr' }}>
      <div style={{ gridColumn: '1', gridRow: '1' }}>
      <Donut
        diameter={200}
        min={0}
        max={100}
        step={1}
        value={value}
        theme={{
            donutColor: 'blue'
        }}
        onValueChange={setValue}
        ariaLabelledBy={'my-label'}
    >
        <label id={'my-label'}>Some label</label>
    </Donut>
      </div>
    </div>
  );
}