import React, { forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { DragType } from '../_consts';
import { Element } from '../../editor/model/editor';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { useEditor } from '../../editor/hooks/useEditor';
import { ElementProps } from '../../renderer/types/element';

interface IContainerProps extends ElementProps {}

const Root = styled.div`
	border: 1px solid #e1e1e1;
	min-height: 130px;
	padding: 10px 10px;
`;

const Container = forwardRef<{}, IContainerProps>((props, ref) => {
	const { element, children } = props;
	const { id } = element;
	const { editor } = useEditor();

	const [{ isOver }, drop] = useDrop(
		{
			accept: [DragType.Common, DragType.Container],
			drop: (dropElement: Element, monitor: DropTargetMonitor) => {
				// const elementHasId = editor.schemas.hasInElement(
				// 	dropElement.id,
				// 	parentElement
				// );
				const rootHasElement = editor.schemas.has(dropElement.id);

				if (monitor.didDrop()) {
					return;
				}

				// 从外部拖拽
				// 根有 dropElement
				if (!rootHasElement) {
					editor.schemas.addToElement(dropElement, element);
					// 改变顺序
				} else {
					editor.schemas.remove(dropElement.id);
					editor.schemas.addToElement(dropElement, element);
				}
			},
			collect: (monitor) => ({
				isOver: monitor.isOver({
					shallow: true,
				}),
			}),
		},
		[editor, id, element]
	);

	useImperativeHandle(ref, () => ({}));

	return (
		<Root ref={drop}>
			{/* {id} */}
			<div
				// ref={drop}
				style={{ border: isOver ? '1px solid blue' : '' }}
			>
				{children}
			</div>
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
