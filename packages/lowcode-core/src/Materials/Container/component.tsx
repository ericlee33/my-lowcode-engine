import React, { forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { DragType } from '../_consts';
import { Editor, Element } from '../../editor/model/editor';
import { DropTargetMonitor, useDrop } from 'react-dnd';

interface IContainerProps {
	className?: string;
	style?: React.CSSProperties;
	id: string;
	parentId: string;
	parentElement: Element;
	editor: Editor;
}

const Root = styled.div`
	border: 1px solid #e1e1e1;
	min-height: 130px;
	padding: 10px 10px;
`;

const Container = forwardRef<
	{},
	IContainerProps & {
		actions: any[];
	} & {
		children: React.ReactNode;
	}
>((props, ref) => {
	const { className, style, editor, id, parentId, parentElement, children } =
		props;

	const [{ isOver }, drop] = useDrop(
		{
			accept: [DragType.Common, DragType.Container],
			drop: (element: Element, monitor: DropTargetMonitor) => {
				const elementHasId = editor.schemas.hasInElement(
					element.id,
					parentElement
				);
				const rootHasElement = editor.schemas.has(element.id);

				if (monitor.didDrop()) {
					return;
				}

				// 从外部拖拽
				// 根有 element
				if (!rootHasElement) {
					editor.schemas.addToElement(element, parentElement);
					// 改变顺序
				} else {
					editor.schemas.remove(element.id);
					editor.schemas.addToElement(element, parentElement);
				}
			},
			collect: (monitor) => ({
				isOver: monitor.isOver({
					shallow: true,
				}),
			}),
		},
		[editor, id, parentElement]
	);

	useImperativeHandle(ref, () => ({}));

	return (
		<Root
			className={className}
			ref={drop}
			style={style}
			{...props}
		>
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
