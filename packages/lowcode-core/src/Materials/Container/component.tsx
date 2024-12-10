import React, { forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { useDrop } from '../../editor/hooks/useDrop';
import { DragType } from '../_consts';
import Engine, { Element } from '../../core/model/engine';
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
		accept: [DragType.Common, DragType.Container],
		moveCard: (element: Element, id, monitor: DropTargetMonitor) => {
			const elementHasId = engine.schemas.hasInElement(
				element.id,
				parentElement
			);
			const rootHasElement = engine.schemas.has(element.id);

			console.log(rootHasElement, 'rootHasElement424');

			if (monitor.didDrop()) {
				return;
			}

			// 从外部拖拽
			// 根有 element
			if (!rootHasElement) {
				engine.schemas.addToElement(element, parentElement);
				// 改变顺序
			} else {
				engine.schemas.remove(element.id);
				engine.schemas.addToElement(element, parentElement);
			}
		},
		deps: [engine, id, parentElement],
		id,
	});

	useImperativeHandle(ref, () => ({}));

	return (
		<Root
			className={className}
			ref={_nodeRef}
			style={style}
			{...props}
		>
			{id}
			<div
				// ref={_nodeRef}
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
