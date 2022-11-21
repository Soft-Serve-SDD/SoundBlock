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

const Droppable = ({ id, items }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <ul className="droppable" ref={setNodeRef}>
        {items.map((item) => (
          <SortableItem key={item} id={item} />
        ))}
      </ul>
    </SortableContext>
  );
};

export default Droppable;
