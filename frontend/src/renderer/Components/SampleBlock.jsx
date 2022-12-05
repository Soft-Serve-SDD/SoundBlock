import React from 'react';

import '../styles/Item.css';
import { Basic } from 'react-dial-knob';
import { useContext } from 'react';
import { TooltipContext } from '../Context/context';

const SampleBlock = ({ id, dragOverlay, props, adjustProperties }) => {
  // console.log('Item id: ', id);
  // console.log('Item props: ', props);
  const { showTooltip } = useContext(TooltipContext);

  const style = {
    cursor: dragOverlay ? 'grabbing' : 'grab',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
  };

  const setRate = (val) => {
    adjustProperties(id, { ...props, rate: val });
  };

  const setAmp = (val) => {
    adjustProperties(id, { ...props, amp: val });
  };

  const setAttack = (val) => {
    adjustProperties(id, { ...props, attack: val });
  };

  // const setRelease = (val) => {
  // //   adjustProperties(id, {...props, release: val})
  // }

  const setStart = (val) => {
    adjustProperties(id, { ...props, start: val });
  };

  const setFinish = (val) => {
    adjustProperties(id, { ...props, finish: val });
  };

  const setDeltaRate = (val) => {
    adjustProperties(id, { ...props, deltarate: val });
  };

  const diameter = 65;
  const default_values = {
    rate: 0,
    deltarate: 0,
    amp: 5,
    attack: 0,
    release: 0,
    start: 0,
    finish: 100,
  };

  const setDefault = () => {
    adjustProperties(id, { ...props, ...default_values });
  };

  // on create, setDefault
  // React.useEffect(() => {
  //   setDefault()
  // }, [])

  return (
    // 3 x 2 grid of Basic knobs
    <React.Fragment>
      <h3 style={{ textAlign: 'center', paddingTop: '5px' }}>
        {props.name.split('.')[0]}
      </h3>

      <div style={style} className="item">
        <div style={{ gridColumn: '1', gridRow: '1' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Basic
              diameter={diameter}
              min={-24}
              max={24}
              step={1}
              value={props.rate}
              onValueChange={setRate}
              ariaLabelledBy={'rate'}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span
              data-text="modify tones"
              id={'rate'}
              class={showTooltip && 'tooltip'}
            >
              Semitones
            </span>
          </div>
        </div>
        <div style={{ gridColumn: '2', gridRow: '1' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Basic
              diameter={diameter}
              min={-10}
              max={10}
              step={1}
              value={props.deltarate}
              onValueChange={setDeltaRate}
              ariaLabelledBy={'deltarate'}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span
              data-text="modify speed"
              id={'deltarate'}
              style={{ textAlign: 'center' }}
              class={showTooltip && 'tooltip'}
            >
              Rate Change
            </span>
          </div>
        </div>
        <div style={{ gridColumn: '3', gridRow: '1' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Basic
              diameter={diameter}
              min={0}
              max={10}
              step={1}
              value={props.amp}
              onValueChange={setAmp}
              ariaLabelledBy={'amp'}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span
              data-text="modify loudness"
              id={'amp'}
              style={{ textAlign: 'center' }}
              class={showTooltip && 'tooltip'}
            >
              Amp
            </span>
          </div>
        </div>
        <div style={{ gridColumn: '1', gridRow: '2' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Basic
              diameter={diameter}
              min={0}
              max={10}
              step={1}
              value={props.attack}
              onValueChange={setAttack}
              ariaLabelledBy={'attack'}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span
              data-text="modify attack"
              id={'attack'}
              style={{ textAlign: 'center' }}
              class={showTooltip && 'tooltip'}
            >
              Attack
            </span>
          </div>
        </div>
        <div style={{ gridColumn: '2', gridRow: '2' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Basic
              diameter={diameter}
              min={0}
              max={100}
              step={1}
              value={props.start}
              onValueChange={setStart}
              ariaLabelledBy={'start'}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span
              data-text="modify start"
              id={'start'}
              style={{ textAlign: 'center' }}
              class={showTooltip && 'tooltip'}
            >
              Start
            </span>
          </div>
        </div>
        <div style={{ gridColumn: '3', gridRow: '2' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Basic
              diameter={diameter}
              min={0}
              max={100}
              step={1}
              value={props.finish}
              onValueChange={setFinish}
              ariaLabelledBy={'finish'}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span
              data-text="modify finish"
              id={'finish'}
              style={{ textAlign: 'center' }}
              class={showTooltip && 'tooltip'}
            >
              Finish
            </span>
          </div>
        </div>
        <div style={{ gridColumn: '1', gridRow: '3', gridColumnEnd: 'span 3' }}>
          <button onClick={setDefault} style={{ backgroundColor: 'aqua' }}>
            Reset
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SampleBlock;
