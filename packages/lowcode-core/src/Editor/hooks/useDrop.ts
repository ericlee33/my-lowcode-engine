import React, { forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { useDrop as useDropBase } from 'react-dnd';
import { ItemTypes } from '../../Editor/ItemTypes';
import EngineCore from '../../core/model/EngineCore';
import { generateId } from '../../utils';
import { Element } from '../../core/model/EngineCore';

export const useDrop = (params: {
	accept: string;
	deps: any[];
	onDrop: (
		element: Element,
		params: {
			type: string;
		}
	) => any;
}) => {
	const { accept, deps, onDrop } = params;

	const [{ canDrop, isOver }, drop] = useDropBase(
		() => ({
			accept,
			drop: (params: { type: string }, monitor) => {
				const didDrop = monitor.didDrop();
				if (didDrop) {
					return;
				}
				const element = {
					type: params.type,
					id: generateId(),
					children: [],
				};

				onDrop(element, params);
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
		[deps]
	);

	return [
		{
			isOver,
			canDrop,
		},
		drop,
	];
};
