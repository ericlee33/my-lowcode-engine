import React, { useRef, RefAttributes, useCallback } from 'react';
import { useDrop as useDropBase, DropTargetMonitor, XYCoord } from 'react-dnd';

export const useDrop = (params: {
  accept: string;
  deps: any[];
  moveCard: any;
  ref?: undefined | RefAttributes<any>;
  /** hover 元素的 id */
  id: string;
}) => {
  const { accept, deps, ref, moveCard, id } = params;
  const _nodeRef = useRef();

  let nodeRef = ref ?? _nodeRef;

  const [{ canDrop, isOver }, drop] = useDropBase(
    () => ({
      accept,
      drop: (item: Element, monitor) => {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          return;
        }
        moveCard(item, id, monitor);
      },
      // hover: (...rest) => handleHover(...rest),
      collect: (monitor) => ({
        isOver: monitor.isOver({
          shallow: true,
        }),
        canDrop: monitor.canDrop(),

        // // 获取来自拖拽组件的数据
        // item: monitor.getItem<{
        //   metaData: MetaData;
        //   component: React.ComponentType;
        // }>(),
      }),
    }),
    [deps]
  );

  nodeRef = drop(nodeRef);

  return [
    {
      isOver,
      canDrop,
    },
    { nodeRef },
  ];
};
