import React, { useState, useRef, useEffect } from 'react';
import {
  DndContext,
  useDraggable,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Coordinates } from '@dnd-kit/utilities';

// used to generate random id
import { nanoid } from 'nanoid';

const defaultCoordinates = {
  x: 0,
  y: 0,
};

// types for the parameters
interface Props {
  children?: React.ReactNode;
}

interface DraggableProps {
  style?: React.CSSProperties;
  top?: number;
  left?: number;
  children?: React.ReactNode;
}

export function DraggableStory({ children }: Props) {
  const [{ x, y }, setCoordinates] = useState<Coordinates>(defaultCoordinates);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={({ delta }) => {
        setCoordinates(({ x, y }: Coordinates) => {
          return {
            x: x + delta.x,
            y: y + delta.y,
          };
        });
      }}
    >
      <DraggableItem top={y} left={x}>
        {children}
      </DraggableItem>
    </DndContext>
  );
}

function DraggableItem({ style, top, left, children }: DraggableProps) {
  const id = useRef(nanoid());
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id.current,
  });

  const styles = {
    transform: CSS.Translate.toString(transform),
    top: `${top}px`,
    left: `${left}px`,
  };

  return (
    <button style={styles} ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </button>
  );
}
