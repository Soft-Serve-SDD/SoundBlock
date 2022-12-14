import { Basic } from 'react-dial-knob';
import React from 'react';

const LoopChild = ({ id, params, adjustLoopParams }) => {
  // TODO: setup above ability to have sleep delay in each loop lane
  const setSleep = (val) => {
    // adjustLoopParams(id, {...params, sleep: val})
  };

  const setIterations = (val) => {
    adjustLoopParams(id, { ...params, iterations: val });
  };

  const setInterval = (val) => {
    adjustLoopParams(id, { ...params, interval: val });
  };

  const defaults = {
    sleep: 0,
    iterations: 1,
    interval: 100,
  };

  const setDefaults = () => {
    adjustLoopParams(id, { ...params, ...defaults });
  };

  React.useEffect(() => {
    setDefaults();
  }, []);

  const diameter = 65;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <Basic
          diameter={diameter}
          min={0}
          max={32}
          step={1}
          value={params.iterations}
          onValueChange={setIterations}
          ariaLabelledBy={'Iteration'}
        />
        <label id={'Iteration'}>Iteration</label>
      </div>
    </div>
  );
};

export default LoopChild;
