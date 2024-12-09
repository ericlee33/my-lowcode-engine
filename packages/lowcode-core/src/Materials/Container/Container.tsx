import React, { Children, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { useDrop } from '../../editor/hooks/useDrop';
import { ItemTypes } from '../../editor/ItemTypes';
import Engine, { Element } from '../../core/model/Engine';
import { DropTargetMonitor } from 'react-dnd';

interface IContainerProps {
  className?: string;
  style?: React.CSSProperties;
  id: string;
  parentId: string;
  parentElement: Element;
  engine: Engine;
}

const Root = styled.div`
  border: 1px solid #e1e1e1;
  min-height: 130px;
  padding: 40px 10px;
`;

const Container = forwardRef<
  {},
  IContainerProps & {
    actions: any[];
  } & {
    children: React.ReactNode;
  }
>((props, ref) => {
  const { className, style, engine, id, parentId, parentElement, children } =
    props;

  const [{ canDrop, isOver }, { nodeRef: _nodeRef }] = useDrop({
    accept: ItemTypes.BOX,
    moveCard: (element: Element, id, monitor: DropTargetMonitor) => {
      const elementHasId = engine.hasInElement(element.id, parentElement);
      const rootHasElement = engine.has(element.id);
      console.log(parentElement, rootHasElement, elementHasId, '342');
      if (monitor.didDrop()) {
        return;
      }

      // 从外部拖拽
      // 根有 element
      if (!rootHasElement) {
        engine.addToElement(element, parentElement);
        // 改变顺序
      } else {
        engine.remove(element.id);
        engine.addToElement(element, parentElement);
      }
    },
    deps: [engine, id, parentElement],
    id,
  });

  useImperativeHandle(ref, () => ({}));

  return (
    <Root ref={_nodeRef} className={className} style={style} {...props}>
      {id}
      {children}
    </Root>
  );
});

Container.actions = [
  {
    label: '清空',
    value: 'onClear',
  },
];

export default Container;
