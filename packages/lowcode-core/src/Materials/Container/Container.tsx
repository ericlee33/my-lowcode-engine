import React, { Children, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { useDrop } from '../../editor/hooks/useDrop';
import { ItemTypes } from '../../editor/ItemTypes';
import Engine, { Element } from '../../core/model/Engine';

interface IContainerProps {
	className?: string;
	style?: React.CSSProperties;
	id: string;
	parentId: string;
}

const Root = styled.div`
	border: 1px solid #e1e1e1;
	min-height: 30px;
	padding: 10px;
`;

const Container = forwardRef<
	{},
	IContainerProps & {
		actions: any[];
	} & {
		children: React.ReactNode;
	}
>(({ className, style, engine, id, parentId, ...props }, ref) => {
	const [{ canDrop, isOver }, drop] = useDrop({
		accept: ItemTypes.BOX,
		moveCard: (
			element: Element,
			id
			// monitor
		) => {
			const hasElement = engine.has(element.id);
			if (!hasElement) {
				engine.add(element, element.parentId);
			}
		},
		deps: [engine, id],
		id,
	});

	const { children } = props;
	useImperativeHandle(ref, () => ({}));

	return (
		<Root
			ref={drop}
			className={className}
			style={style}
			{...props}
		>
			{parentId}
			{children}
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
