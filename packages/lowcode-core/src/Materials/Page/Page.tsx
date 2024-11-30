import React, { forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { ItemTypes } from '../../Editor/ItemTypes';
import EngineCore from '../../core/model/EngineCore';
import { useDrop } from '../../Editor/hooks/useDrop';

interface IContainerProps {
	className?: string;
	style?: React.CSSProperties;
	engineCore: EngineCore;
	parentId: string;
}

const Root = styled.div`
	border: 1px solid #e1e1e1;
	height: 100vh;
	padding: 10px;
`;

const Page = forwardRef<{}, IContainerProps>((props, ref) => {
	const { className, style, children, engineCore, parentId } = props;

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
