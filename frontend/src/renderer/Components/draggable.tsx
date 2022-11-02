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
import grip from '../../../assets/icons/grip-vertical.svg';
// used to generate random id
import { nanoid } from 'nanoid';

const defaultCoordinates = {
  x: 0,
  y: 0,
};

// types for the parameters
interface Props {
  handle?: boolean;
  children?: React.ReactNode;
}

interface DraggableProps {
  handle?: boolean;
  top?: number;
  left?: number;
  children?: React.ReactNode;
}

export function Draggable({ handle, children }: Props) {
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
      <DraggableItem handle={handle} top={y} left={x}>
        {children}
      </DraggableItem>
    </DndContext>
  );
}

function DraggableItem({ handle, top, left, children }: DraggableProps) {
  const id = useRef(nanoid());
  const { listeners, setNodeRef, transform } = useDraggable({
    id: id.current,
  });

  const styles = {
    transform: CSS.Translate.toString(transform),
    top: `${top}px`,
    left: `${left}px`,
  };

  return (
    <button style={styles} ref={setNodeRef} {...(handle ? {} : listeners)}>
      <>
        {children}
        {handle ? (
          <img width="20" alt="icon" src={grip} {...listeners} />
        ) : null}
      </>
    </button>
  );
}
