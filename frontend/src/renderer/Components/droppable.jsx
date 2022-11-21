// import React from 'react';
// import { useDroppable } from '@dnd-kit/core';

// export function DropTarget(props) {
//   const { children, ...rest } = props;
//   const { setNodeRef, isOver } = useDroppable({
//     id: props.id,
//   });

//   return (
//     <div
//       ref={setNodeRef}
//       style={{
//         backgroundColor: isOver ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
//         width: '100%',
//         height: '100%',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//       {...rest}
//     >
//       {children}
//     </div>
//   );
// }



import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

import "./Droppable.css";

const Droppable = ({ id, items, props, adjustProperties, children }) => {
  const { setNodeRef } = useDroppable({ id });

  var props_ids  = {};
  for (let i = 0; i < items.length; i++) {
    props_ids[items[i]] = props[i];
  }


  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <ul className="droppable" ref={setNodeRef}>
        {children}
        <hline></hline>
        {items.map((item) => (
          <SortableItem key={item} id={item} props={props_ids[item]} adjustProperties={adjustProperties} />
        ))}
      </ul>
    </SortableContext>
  );
};

export default Droppable;


