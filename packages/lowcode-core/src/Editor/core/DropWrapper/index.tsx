import React, { useEffect, useRef } from 'react';
import { DragType } from '../../../materials/_consts';
import { Element } from '../../model/editor';
import { useEditor } from '../../hooks/useEditor';
import {
  useDrag,
  useDrop,
  DragSourceMonitor,
  DropTargetMonitor,
} from 'react-dnd';
import { observer } from 'mobx-react-lite';
import Toolbar from './Toolbar';
import { ElementProps } from '../../../renderer/types/element';

interface IDropWrapper extends ElementProps {}

const DropWrapper: React.FC<IDropWrapper> = observer((props) => {
  const { children, element, componentInfo } = props;
  const { id, parentId } = element;
  const { meta } = componentInfo;
  const { dev } = meta;

  const { dragable = true, dropable = true } = dev ?? {};
  const { editor } = useEditor();
  const nodeRef = useRef<HTMLDivElement>();

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DragType.Common,
      // 传递的信息
      item: () => element,
      end: (item, monitor) => {
        // 获取 drop 通过 drop 回调 return 的数据
        const dropResult = monitor.getDropResult();
        if (!monitor.didDrop()) {
          // console.log(item.id, 'ididd');
          // editor.remove(item.id);
        }
        if (item && dropResult) {
          // console.log(item, 333, dropResult);
        }
      },
      canDrag: (item: DragSourceMonitor) => {
        const isDragging = item.isDragging();
        return !isDragging;
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id]
  );
  useEffect(() => {
    if (isDragging) {
      editor.canvas.setSelectedId('');
    }
  }, [isDragging]);

  const [{ isOver }, drop] = useDrop(
    {
      accept: [DragType.Common],
      drop: (
        /** 抛来的 element */
        element: Element,
        monitor: DropTargetMonitor
      ) => {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          return;
        }
        const hasElement = editor.schemas.has(element.id);
        if (element.id === id) {
          return;
        }

        if (!hasElement) {
          editor.schemas.add({ ...element, parentId }, id);
        } else {
          // parent 相同，需要特殊处理
          if (element.parentId === parentId) {
            const parent = editor.schemas.get(element.parentId);
            const dropIdx = parent.children.findIndex((item) => item.id === id);
            const dragIdx = parent.children.findIndex(
              (item) => item.id === element.id
            );
            editor.schemas.remove(element.id);

            // 由于先删掉了，如果拖的元素在前面，需要补齐 index
            // if (dragIdx < dropIdx) {
            if (dragIdx + 1 < dropIdx) {
              editor.schemas.insertAfterParentIdx(
                element,
                parent.children,
                dropIdx + 1
              );
            } else {
              editor.schemas.insertAfterParentIdx(
                element,
                parent.children,
                dropIdx
              );
            }
            return;
          }
          // 删除
          editor.schemas.remove(element.id);
          // 插入
          editor.schemas.insertAfter({ ...element, parentId }, id);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({
          shallow: true,
        }),
      }),
    },
    [editor, id, parentId]
  );

  if (dropable) {
    drop(nodeRef);
  }
  if (dragable) {
    drag(nodeRef);
  }

  if (!dragable && !dragable) {
    return children;
  }

  let border = 'initial';

  const isSelected = editor.canvas.selectedId === id;

  if (isOver || isSelected) {
    border = '1px solid blue';
  }

  return (
    <div
      style={{
        marginBottom: 10,
        border,
        display: 'inline-flex',
        alignItems: 'flex-start',
      }}
      ref={nodeRef}
      onClickCapture={() => {
        editor.canvas.setSelectedId(id);
      }}
    >
      {isSelected && (
        <div
          style={{
            position: 'relative',
          }}
        >
          <Toolbar />
        </div>
      )}
      <div
        style={
          {
            // pointerEvents: 'none',
          }
        }
      >
        {children}
      </div>
    </div>
  );
});

export default DropWrapper;
