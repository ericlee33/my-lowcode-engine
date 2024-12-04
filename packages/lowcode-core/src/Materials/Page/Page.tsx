import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';
import { ItemTypes } from '../../Editor/ItemTypes';
import EngineCore, { Element } from '../../core/model/EngineCore';
import { useDrop } from '../../Editor/hooks/useDrop';

interface IContainerProps {
	className?: string;
	style?: React.CSSProperties;
	engineCore: EngineCore;
	id: string;
}

const Root = styled.div`
	border: 1px solid #e1e1e1;
	height: 100vh;
	padding: 10px;
	background-color: gainsboro;
`;

const Page = forwardRef<{}, IContainerProps>((props, ref) => {
	const nodeRef = useRef();
	const { className, style, children, engineCore, id } = props;

	// -> hover 既放置，接下来做排序
	const [{ canDrop, isOver }, { nodeRef: _nodeRef }] = useDrop({
		accept: ItemTypes.BOX,
		deps: [engineCore],
		moveCard: (element: Element, id: string) => {
			/**
			 * 1、如果此时拖拽的组件是 Box 组件，则 dragIndex 为 undefined，则此时修改，则此时修改 cardList 中的占位元素的位置即可
			 * 2、如果此时拖拽的组件是 Card 组件，则 dragIndex 不为 undefined，此时替换 dragIndex 和 hoverIndex 位置的元素即可
			 */
			const hasElement = engineCore.has(element.id);

			if (!hasElement) {
				console.log(id, 'iddd');
				engineCore.add({ ...element, parentId: id }, id);
			} else {
			}
		},
		ref: nodeRef,
		id,
	});

	return (
		<Root
			ref={_nodeRef}
			className={className}
			style={style}
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
