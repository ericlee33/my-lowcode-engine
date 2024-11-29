import React, { forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../Editor/ItemTypes';
import EngineCore from '../../core/model/EngineCore';

interface IContainerProps {
	className?: string;
	style?: React.CSSProperties;
	engineCore: EngineCore;
	parentId: string;
}

const Root = styled.div`
	border: 1px solid #e1e1e1;
	height: 100px;
`;

const Page = forwardRef<{}, IContainerProps>((props, ref) => {
	const { className, style, children, engineCore, parentId } = props;

	const [{ canDrop, isOver }, drop] = useDrop(
		() => ({
			accept: ItemTypes.BOX,
			drop: (
				item: {
					type: string;
				}
				// monitor
			) => {
				const element = {
					type: item.type,
					id: Math.random().toString().slice(0, 5),
					children: [],
				};

				engineCore.add(element, parentId);

				return {
					test: '123',
				};
			},
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
		[engineCore]
	);

	return (
		<Root
			ref={drop}
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
