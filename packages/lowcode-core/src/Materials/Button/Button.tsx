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
	parentId: string;
	ref: React.ForwardedRef<ThisType<typeof Button>>;
	forwardedRef: React.ForwardedRef<ThisType<typeof Button>>;
	engineCore: EngineCore;
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

	const [{ isDragging, opacity }, drag] = useDrag(
		() => ({
			type: ItemTypes.BOX,
			// 传递的信息
			item: () => ({ type: ButtonMeta.type, id: id, children: [] }),
			end: (item, monitor) => {
				// 获取 drop 通过 drop 回调 return 的数据
				const dropResult = monitor.getDropResult();
				if (!monitor.didDrop()) {
					// console.log(item.id, 'ididd');
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
				opacity: monitor.isDragging() ? 0 : 1,
			}),
		}),
		[id]
	);

	const [{ canDrop, isOver }, { nodeRef: _nodeRef }] = useDrop({
		accept: ItemTypes.BOX,
		deps: [engineCore, id],
		moveCard: (
			/** 抛来的 element */
			element: Element,
			/** 当前被释放元素的 id */
			id: string
		) => {
			const hasElement = engineCore.has(element.id);
			if (element.id === id) {
				// return engineCore.remove(element.id);
				return;
			}

			if (!hasElement) {
				engineCore.add({ ...element, parentId }, id);
			} else {
				console.log(element.id, id, 'idd');
				// 删除
				engineCore.remove(element.id);
				// 插入
				engineCore.insertAfter(element, id);
			}
		},
		ref: nodeRef,
		id: id,
	});

	return (
		<div
			style={{
				marginBottom: 10,
				// opacity: opacity,
				border: isOver ? '1px solid blue' : '',
			}}
			ref={drag(_nodeRef)}
		>
			<div
				onClick={(e) => {
					e.preventDefault();
				}}
				className={className}
				style={style}
				{...props}
				// onClick={onClick}
			>
				{text || `默认值${id}`}
				{/* {render ? '隐藏的孩子' : ''} */}
			</div>
		</div>
	);
};

export default Button;
