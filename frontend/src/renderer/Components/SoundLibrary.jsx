import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import UploadFile from "../Menu/UploadFile";
import { Draggable } from "./draggable";
import { AudioBlock } from "../Blocks/draggableBlocks";
const SoundLibrary = () => {
  const [uploadedBlocks, setUploadedBlocks] = useState([]);

  const generateBlock = (file) => {
    var new_block = {
      id: uuidv4(),
      name: file[0].name,
      path: file[0].name,
      rate: 1,
      deltarate: 0,
      amp: 1,
      attack: 1, 
      release: 1, 
      start: 1, 
      finish: 1
    }

    setUploadedBlocks([...uploadedBlocks, new_block])
  };

  const deleteBlock = (id) => {
    setActiveBlocks(uploadedBlocks.filter((block) => block.id !== id));
  };

  const adjustProperties = (block, updatedBlock) => {
    const newBlocksState = uploadedBlocks.map(b => {
      if (b.id == block.id){
       return updatedBlock
      }
      return b
    })
    setUploadedBlocks(newBlocksState)
  }


  return (
    <React.Fragment>
      <div style={{ width: '25%', background: 'white', height: 'calc(100vh - 200px)' }}>
        <div>
          <h1 style={{color: 'grey',display: 'flex', justifyContent: 'center' }}>Sound Library</h1>
          <UploadFile createBlock={generateBlock} />
          {uploadedBlocks.map((block) => (
            <Draggable key={block.name} id={block.id}>
              <AudioBlock adjustProperties={adjustProperties} blockInfo = {block}/>
            </Draggable>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SoundLibrary