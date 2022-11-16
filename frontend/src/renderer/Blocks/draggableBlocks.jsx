import { renderers } from './fields';
import { Draggable } from '../Components/draggable';
import Slider from '../Components/Slider';
import { useState } from 'react';
import { Knob } from 'react-rotary-knob';
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



  return (
    <div style={{ border: '1px solid black', borderRadius: '5px' }}>
      <h4 style={{ marginTop: '5px', marginBottom: '0px' }}>{name}</h4>
      <br />
      <h5 style={{ marginTop: '5px', marginBottom: '0px' }}>
        {' '}
        Duration: {Props.duration}
      </h5>
      {/* arrange knobs in a 2x3 grid */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Knob
              style={{ width: '30', height: '30' }}
              min={0}
              max={10}
              unlockDistance={0}
              preciseMode={true}
              value={blockInfo.rate}
              onChange={adjustRate}
            />
            <p style={{ marginTop: 'auto', marginBottom: 'auto' }}>Rate</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Knob
              style={{ width: '30', height: '30' }}
              min={0}
              max={10}
              unlockDistance={0}
              preciseMode={true}
              value={blockInfo.amp}
              onChange={adjustAmp}
            />
            <p style={{ marginTop: 'auto', marginBottom: 'auto' }}>Amp</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Knob
              style={{ width: '30', height: '30' }}
              min={0}
              max={10}
              unlockDistance={0}
              preciseMode={true}
              value={blockInfo.attack}
              onChange={adjustAttack}
            />
            <p style={{ marginTop: 'auto', marginBottom: 'auto' }}>Attack</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Knob
              style={{ width: '30', height: '30' }}
              min={0}
              max={10}
              unlockDistance={0}
              preciseMode={true}
              value={blockInfo.release}
              onChange={adjustRelease}
            />
            <p style={{ marginTop: 'auto', marginBottom: 'auto' }}>Release</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Knob
              style={{ width: '30', height: '30' }}
              min={0}
              max={10}
              unlockDistance={0}
              preciseMode={true}
              value={blockInfo.start}
              onChange={adjustStart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}




