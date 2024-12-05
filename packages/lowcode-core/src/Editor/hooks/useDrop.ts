import React, { useCallback, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { useDrop as useDropBase, DropTargetMonitor, XYCoord } from 'react-dnd';
import { ItemTypes } from '../../Editor/ItemTypes';
import EngineCore from '../../core/model/EngineCore';
import { generateId } from '../../utils';
import { Element } from '../../core/model/EngineCore';
import { throttle } from 'lodash-es';

export const useDrop = (params: {
  accept: string;
  deps: any[];
  moveCard: any;
  ref;
  id: string;
}) => {
  const { accept, deps, onDrop, ref, moveCard, id } = params;

  const handleHover = useCallback(
    (item: any, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return;
      }
      const dragId = item.id;
      const hoverId = id;

      // 拖拽元素下标与鼠标悬浮元素下标一致时，不进行操作
      // if (dragId === hoverId) {
      // 	return;
      // }

      // 确定屏幕上矩形范围
      const hoverBoundingRect = ref.current!.getBoundingClientRect();

      // 获取中点垂直坐标
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // 确定鼠标位置
      const clientOffset = monitor.getClientOffset();

      // 获取距顶部距离
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      /**
       * 只在鼠标越过一半物品高度时执行移动。
       *
       * 当向下拖动时，仅当光标低于50%时才移动。
       * 当向上拖动时，仅当光标在50%以上时才移动。
       *
       * 可以防止鼠标位于元素一半高度时元素抖动的状况
       */

      // 向下拖动
      // if (dragId < hoverId && hoverClientY < hoverMiddleY) {
      //   return;
      // }

      // // 向上拖动
      // if (dragId > hoverId && hoverClientY > hoverMiddleY) {
      //   return;
      // }

      // 执行 move 回调函数
      moveCard(item, hoverId);

      /**
       * 如果拖拽的组件为 Box，则 dragId 为 undefined，此时不对 item 的 index 进行修改
       * 如果拖拽的组件为 Card，则将 hoverId 赋值给 item 的 index 属性
       */
      // if (item.index !== undefined) {
      // item.id = hoverId;
      // }
    },
    [id, moveCard, ref]
  );

  const [{ canDrop, isOver }, drop] = useDropBase(
    () => ({
      accept,
      // drop: (item: Element, monitor) => {
      //   // const didDrop = monitor.didDrop();
      //   // if (didDrop) {
      //   // 	return;
      //   // }

      //   moveCard(item, id);
      // },
      hover: (...rest) => handleHover(...rest),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
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

  return [
    {
      isOver,
      canDrop,
    },
    { nodeRef: drop(ref) },
  ];
};
