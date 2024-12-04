import React, { useImperativeHandle, useState, useRef } from 'react';
import styled from 'styled-components';
import { Button as ArcoButton, ButtonProps } from '@arco-design/web-react';
import { dispatchEvent } from '../../Renderer/core';
import { useSchemaContext } from '../../Editor/store/SchemaContext';
import { useScoped } from '../../Editor/store/ScopedContext';
import { ItemTypes } from '../../Editor/ItemTypes';
import EngineCore, { Element } from '../../core/model/EngineCore';
import { ButtonMeta } from './meta';
import { useDrop } from '../../Editor/hooks/useDrop';
import { useDrag } from 'react-dnd';
import { generateId } from '../../utils';

interface IButtonProps extends ButtonProps {
  className?: string;
  style?: React.CSSProperties;
  text?: string;
  id: string;
  ref: React.ForwardedRef<ThisType<typeof Button>>;
  forwardedRef: React.ForwardedRef<ThisType<typeof Button>>;
  engineCore: EngineCore;
  parentId: string;
}

const Root = styled(ArcoButton)``;

const Button: React.FC<IButtonProps> = ({
  className,
  style,
  text,
  forwardedRef,
  id,
  engineCore,
  parentId,
  ...props
}) => {
  const nodeRef = useRef();

  // const [render, setRender] = useState(false);
  // const { schemaConfig } = useSchemaContext();
  // const { componentContext } = useScoped();

  // const switchChildNodeRender = () => {
  // 	setRender((render) => !render);
  // };

  // useImperativeHandle(forwardedRef, () => ({
  // 	switchChildNodeRender,
  // }));

  // const onClick = (event) => {
  // 	dispatchEvent({
  // 		event,
  // 		id,
  // 		schemaConfig,
  // 		componentContext: componentContext.current,
  // 	});
  // };

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      // 传递的信息
      item: () => ({ type: ButtonMeta.type, id: parentId, children: [] }),
      end: (item, monitor) => {
        // 获取 drop 通过 drop 回调 return 的数据
        const dropResult = monitor.getDropResult();
        if (!monitor.didDrop()) {
          console.log(item.id, 'ididd');
          engineCore.remove(item.id);
        }
        if (item && dropResult) {
          // console.log(item, 333, dropResult);
        }
      },
      canDrag: true,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [parentId]
  );

  const [{ canDrop, isOver }, { nodeRef: _nodeRef }] = useDrop({
    accept: ItemTypes.BOX,
    deps: [engineCore, parentId],
    moveCard: (element: Element, id: string) => {
      /**
       * 1、如果此时拖拽的组件是 Box 组件，则 dragIndex 为 undefined，则此时修改，则此时修改 cardList 中的占位元素的位置即可
       * 2、如果此时拖拽的组件是 Card 组件，则 dragIndex 不为 undefined，此时替换 dragIndex 和 hoverIndex 位置的元素即可
       */
      const hasElement = engineCore.has(element.id);
      console.log(element, id, hasElement, 'ffdsflsdkfdse');

      if (!hasElement) {
        engineCore.add(element, parentId);
      } else {
        engineCore.swap(element.id, id);
      }
    },
    ref: nodeRef,
    id: parentId,
  });

  return (
    <div
      style={{
        marginBottom: 10,
      }}
      ref={drag(_nodeRef)}
    >
      <Root
        className={className}
        style={style}
        {...props}
        // onClick={onClick}
      >
        {text || `默认值${parentId}`}
        {/* {render ? '隐藏的孩子' : ''} */}
      </Root>
    </div>
  );
};

export default Button;
