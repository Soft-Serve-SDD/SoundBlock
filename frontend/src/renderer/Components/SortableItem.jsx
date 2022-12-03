import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import grip from '../../../assets/icons/grip-vertical.svg';
import Item from './Item';
import Sleep from './Sleep';

const SortableItem = ({ id, props, adjustProperties }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isDragging ? 'transparent' : 'white',
    // small rounded corners outline
    // border: '2px solid rgba(0, 0, 0, 1)',
    borderRadius: '10px',
    margin: '10px',
  };

  const image_style = {
    rotate: '90deg',
  };

  // if props.name is 'Sleep', render Sleep component
  if (props.name === 'Sleep') {
    return (
      <li style={style} ref={setNodeRef}>
        <Sleep id={id} props={props} adjustProperties={adjustProperties} />
        <div className="grip" {...listeners} {...attributes}>
          <img
            width="30"
            rotate="20"
            src={grip}
            alt="grip"
            style={image_style}
          />
        </div>
      </li>
    );
  }

  return (
    <li style={style} ref={setNodeRef}>
      <Item id={id} props={props} adjustProperties={adjustProperties} />
      <div className="grip" {...listeners} {...attributes}>
        <img width="30" rotate="20" src={grip} alt="grip" style={image_style} />
      </div>
    </li>
  );
};

export default SortableItem;
