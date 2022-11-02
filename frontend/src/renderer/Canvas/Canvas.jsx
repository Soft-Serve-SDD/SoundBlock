import React, { useState, useRef } from 'react';

import { DndContext, DragOverlay } from '@dnd-kit/core';

import { DraggableStory } from '../Components/draggable';
// import {Droppable} from '../Components/droppable';

export default function Canvas() {
  return (
    <DndContext>
      <DraggableStory>Canvas call</DraggableStory>

      <DraggableStory>
        <div style={{ border: '1px solid black' }}>Dummy Canvas call 2</div>
      </DraggableStory>
    </DndContext>
  );
}
