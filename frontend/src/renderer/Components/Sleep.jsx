import React from 'react';

import '../styles/Sleep.css';
import { Basic } from 'react-dial-knob';

const Sleep = ({ id, dragOverlay, props, adjustProperties }) => {
  // console.log('Item id: ', id);
  // console.log('Item props: ', props);

  const style = {
    cursor: dragOverlay ? 'grabbing' : 'grab',
  };

  const setSleepTime = (val) => {
    adjustProperties(id, { ...props, sleeptime: val });
  };

  const diameter = 65;
  const default_values = {
    sleeptime: 0,
  };

  const setDefault = () => {
    adjustProperties(id, { ...props, ...default_values });
  };

  return (
    // 3 x 2 grid of Basic knobs
    <React.Fragment>
      <h3 style={{ textAlign: 'center', paddingTop: '5px' }}>{props.name}</h3>

      <div style={style} className="sleep">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Basic
            diameter={diameter}
            min={0}
            max={100}
            step={1}
            value={props.sleeptime}
            onValueChange={setSleepTime}
            ariaLabelledBy={'sleeptime'}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sleep;
