/* External */
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';

/* Components */
import SortableItem from './SortableItem';

/* Styles */
import '../styles/Droppable.css';

const Droppable = ({ id, items, props, adjustProperties, children }) => {
  const { setNodeRef } = useDroppable({ id });

  var props_ids = {};
  // console.log(items);
  for (let i = 0; i < items.length; i++) {
    props_ids[items[i]] = props[i];
  }

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <ul className="droppable" ref={setNodeRef}>
        {children}
        {items.map((item) => (
          <SortableItem
            key={item}
            id={item}
            props={props_ids[item]}
            adjustProperties={adjustProperties}
          />
        ))}
      </ul>
    </SortableContext>
  );
};

export default Droppable;
