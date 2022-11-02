import { DndContext } from '@dnd-kit/core';
import { PlayBlock, SampleBlock } from 'renderer/Blocks/draggableBlocks';

// import { Draggable } from '../Components/draggable';

export default function Canvas() {
  return (
    <DndContext>
      <PlayBlock />
      <PlayBlock />
      <SampleBlock />
      <SampleBlock />
      <SampleBlock />
    </DndContext>
  );
}
