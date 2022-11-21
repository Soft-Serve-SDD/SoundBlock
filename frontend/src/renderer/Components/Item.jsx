import React from "react";

import "./Item.css";
import { Basic } from 'react-dial-knob'

// const Item = ({ id, dragOverlay, props, adjustProperties}) => {
//   const style = {
//     cursor: dragOverlay ? "grabbing" : "grab",
//   };

//   console.log("Item id: ", id)
//   console.log('Item props: ', props)

//   return (
//     <div style={style} className="item">
//       Item {id} 
//       {/* Rate: {props.rate} */}
//     </div>
//   );
// };

// export default Item;


const Item = ({ id, dragOverlay, props, adjustProperties}) => {  

    console.log("Item id: ", id)
    console.log('Item props: ', props)
    
    const style = {
        cursor: dragOverlay ? "grabbing" : "grab",
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
    };

    const setRate = (val) => {
      adjustProperties(props, {...props, rate: val})
    }
  
    const setAmp = (val) => {
      adjustProperties(props, {...props, amp: val})
    }
  
    const setAttack = (val) => {
      adjustProperties(props, {...props, attack: val})
    }
  
    // const setRelease = (val) => {
    // //   adjustProperties(props, {...props, release: val})
    // }
  
    const setStart = (val) => {
      adjustProperties(props, {...props, start: val})
    }
  
    const setFinish = (val) => {
      adjustProperties(props, {...props, finish: val})
  
    }
  
    const setDeltaRate = (val) => {
      adjustProperties(props, {...props, deltarate: val})
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
    //   adjustProperties(props, {...props, ...default_values})
    }
  
    // on create, setDefault
    React.useEffect(() => {
      setDefault()
    }, [])
  
    return (
      // 3 x 2 grid of Basic knobs
      <div style={style} className="item">
        <div style={{gridColumn: '1', gridRow: '1'}}>
          <Basic
            diameter={diameter}
            min={-24}
            max={24}
            step={1}
            value={props.rate}
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
            value={props.deltarate}
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
            value={props.amp}
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
            value={props.attack}
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
            value={props.start}
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
            value={props.finish}
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
  

export default Item;


