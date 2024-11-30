import React, { Children, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { useDrop } from '../../Editor/hooks/useDrop';
import { ItemTypes } from '../../Editor/ItemTypes';

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
>(({ className, style, engineCore, parentId, ...props }, ref) => {
	const [{ canDrop, isOver }, drop] = useDrop({
		accept: ItemTypes.BOX,
		onDrop: (
			element,
			item: {
				type: string;
			}
			// monitor
		) => {
			engineCore.add(element, parentId);

			return {
				test: '123',
			};
		},
		deps: [engineCore],
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
