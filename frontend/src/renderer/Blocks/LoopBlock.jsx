import { Basic } from 'react-dial-knob'
import React from 'react';

export function LoopChild(Props){
    const { adjustProperties, blockInfo } = Props

    const setSleep = (val) => {
        adjustProperties(blockInfo, {...blockInfo, sleep: val})
    }

    const setIterations = (val) => {
        adjustProperties(blockInfo, {...blockInfo, iterations: val})
    }
    const diameter = 65

    return (<div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)'}}>
    <div style={{gridColumn: '1', gridRow: '1'}}>
    <Basic
      diameter={diameter}
      min={-24}
      max={24}
      step={1}
      value={10}
      onValueChange={setSleep}
      ariaLabelledBy={'SleepTime'}
    />
    <label id={'SleepTime'}>SleepTime</label>
  </div>
    <div style={{gridColumn: '2', gridRow: '1'}}>
    <Basic
      diameter={diameter}
      min={0}
      max={32}
      step={1}
      value={10}
      onValueChange={setIterations}
      ariaLabelledBy={'Iteration'}
    />
    <label id={'Iteration'}>Iteration</label>
    <hline></hline>
  </div>
  </div>);
}