import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';
import { ItemTypes } from '../../editor/ItemTypes';
import Engine, { Element } from '../../core/model/Engine';
import { useDrop } from '../../editor/hooks/useDrop';

interface IContainerProps {
	className?: string;
	style?: React.CSSProperties;
	engine: Engine;
	id: string;
}

const Root = styled.div`
	border: 1px solid #e1e1e1;
	height: 100vh;
	padding: 10px;
	border-top: 0;
`;

const Page = forwardRef<{}, IContainerProps>((props, ref) => {
	const nodeRef = useRef();
	const { className, style, children, engine, id } = props;

	// -> hover 既放置，接下来做排序
	const [{ canDrop, isOver }, { nodeRef: _nodeRef }] = useDrop({
		accept: ItemTypes.BOX,
		deps: [engine],
		moveCard: (element: Element, id: string) => {
			/**
			 * 1、如果此时拖拽的组件是 Box 组件，则 dragIndex 为 undefined，则此时修改，则此时修改 cardList 中的占位元素的位置即可
			 * 2、如果此时拖拽的组件是 Card 组件，则 dragIndex 不为 undefined，此时替换 dragIndex 和 hoverIndex 位置的元素即可
			 */
			const hasElement = engine.has(element.id);

			if (!hasElement) {
				engine.add({ ...element, parentId: id }, id);
				// 为拖拽中的元素注入 parentId，避免在拽到 button 移动顺序之后之后不符合预期
				element.parentId = id;
			}
		},
		ref: nodeRef,
		id,
	});

	return (
		<Root
			ref={_nodeRef}
			className={className}
			style={{ ...style, border: isOver ? '1px solid blue' : '' }}
			{...props}
		>
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
