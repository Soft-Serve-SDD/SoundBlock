/* External */
import React from 'react';

/* Components */
import UploadFile from './UploadFile';
import BlockDeleteButton from './BlockDeleteButton';

function LibraryMenu(props) {
  const title = "Upload Samples";
  const {generateBlock, deleteBlock} = props;
  return (
    <div
      style={{
        background: 'white',
        width: '20%',
        borderRadius: '10px',
        padding: '10px',
        margin: '5px',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <UploadFile createBlock={generateBlock} />
        <BlockDeleteButton onClick={deleteBlock} />
      </div>
    </div>
  );
}

export default LibraryMenu;
