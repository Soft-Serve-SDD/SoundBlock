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
      {/* arrange small knobs in a 3x2 grid */}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <h6>Rate</h6>
              <Knob
                min={0}
                max={10}
                value={blockInfo.rate}
                unlockDistance={0}
                preciseMode={false}
                onChange={adjustRate}
                style={{ width: '50px', height: '50px' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <h6>Attack</h6>
              <Knob
                min={0}
                max={10}
                value={blockInfo.attack}
                unlockDistance={0}
                preciseMode={false}
                onChange={adjustAttack}
                style={{ width: '50px', height: '50px' }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <h6>Start</h6>
              <Knob
                min={0}
                max={10}
                value={blockInfo.start}
                unlockDistance={0}
                preciseMode={false}
                onChange={adjustStart}
                style={{ width: '50px', height: '50px' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <h6>Amp</h6>
              <Knob
                min={0}
                max={10}
                value={blockInfo.amp}
                unlockDistance={0}
                preciseMode={false}
                onChange={adjustAmp}
                style={{ width: '50px', height: '50px' }}
              />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <h6>Finish</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



