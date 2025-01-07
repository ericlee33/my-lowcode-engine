import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { DragType } from '../_consts';
import { useDrop } from 'react-dnd';
import { Element } from '../../editor/model/editor';
import { useEditor } from '../../editor/hooks/useEditor';
import { ElementProps } from '../../renderer/types/element';

interface IContainerProps extends ElementProps {}

const Root = styled.div`
  border: 1px solid #e1e1e1;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-top: 0;
  border-bottom: none;
`;

const Page = forwardRef<{}, IContainerProps>((props, ref) => {
  const { editor } = useEditor();
  const { children, element } = props;
  const { id } = element;

  // -> hover 既放置，接下来做排序
  const [{ isOver }, drop] = useDrop(
    {
      accept: [DragType.Common, DragType.Container],
      drop: (element: Element) => {
        const hasElement = editor.schemas.has(element.id);

        if (hasElement) {
          editor.schemas.remove(element.id);
        }
        editor.schemas.add({ ...element, parentId: id }, id);
        // 为拖拽中的元素注入 parentId，避免在拽到 button 移动顺序之后之后不符合预期
        element.parentId = id;
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({
          shallow: true,
        }),
      }),
    },
    [editor, id]
  );

  return (
    <Root ref={drop} style={{ border: isOver ? '1px solid blue' : '' }}>
      {children}
    </Root>
  );
});

Page.actions = [
  {
    label: '清空',
    value: 'onClear',
  },
];

export default Page;
