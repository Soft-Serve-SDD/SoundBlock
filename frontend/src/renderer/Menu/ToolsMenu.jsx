/* External */
import React from 'react';

/* Components */
import {PlayButton, DownloadButton, LoopButton} from './Buttons';
import LoopDeleteButton from './LoopDeleteButton';

// All Tools for adjusting workspace interface are here
// Props are used to pass state back to parent (App.jsx)
function ToolsMenu(props) {
  return (
    <div
      style={{
        background: 'white',
        margin: '5px',
        borderRadius: '5px',
        display: 'flex',
      }}
    >
      <div style={{ marginLeft: '15px', marginRight: '15px' }}>
        <h4>PlayBack</h4>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PlayButton onClick={()=> props.exportData(false)}/>
        </div>
      </div>
      <div style={{ marginLeft: '15px', marginRight: '15px' }}>
          <h4>&nbsp; Export</h4>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <DownloadButton onClick={() => props.exportData(true)} />
        </div>
      </div>

      <div style={{ marginLeft: '15px', marginRight: '15px' }}>
        <h4>Add Looping Group</h4>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoopButton onClick={props.addGroup} />
        </div>
      </div>

      <div
        style={{
          marginLeft: '15px',
          marginRight: '10px',
          marginBottom: '-20px',
        }}
      >
        <h4>Remove Looping Group</h4>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoopDeleteButton onClick={props.removeLastGroup} />
        </div>
      </div>
    </div>
  );
}

export default ToolsMenu;
