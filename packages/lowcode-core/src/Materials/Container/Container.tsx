import React, { Children, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { useDrop } from '../../editor/hooks/useDrop';
import { ItemTypes } from '../../editor/ItemTypes';

interface IContainerProps {
	className?: string;
	style?: React.CSSProperties;
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
>(({ className, style, engine, parentId, ...props }, ref) => {
	const [{ canDrop, isOver }, drop] = useDrop({
		accept: ItemTypes.BOX,
		onDrop: (
			element,
			item: {
				type: string;
			}
			// monitor
		) => {
			engine.add(element, parentId);

			return {
				test: '123',
			};
		},
		deps: [engine],
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
