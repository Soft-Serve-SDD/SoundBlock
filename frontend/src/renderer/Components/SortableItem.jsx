import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import grip from '../../../assets/icons/grip-vertical.svg';
import Item from './Item';

const SortableItem = ({ id, props, adjustProperties}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  
  console.log('sortable props: ', props);
//   props = props[parseInt(id)];

  console.log('sortable id: ', id);
//   console.log('sortable id: ', parseInt(id));
//   console.log('sortable props: ', props);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li style={style} ref={setNodeRef}>
      <Item id={id} props={props} adjustProperties={adjustProperties}/>
      <img width="20" alt="icon" src={grip} {...listeners} {...attributes} />
    </li>
  );
};

export default SortableItem;



// return (
//   <li style={style} ref={setNodeRef} {...attributes} {...listeners}>
//     <Item id={id} props={props} adjustProperties={adjustProperties}/>
//   </li>
// );