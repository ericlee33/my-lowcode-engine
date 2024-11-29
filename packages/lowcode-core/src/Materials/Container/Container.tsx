import React, { Children, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';

interface IContainerProps {
	className?: string;
	style?: React.CSSProperties;
}

const Root = styled.div`
	border: 1px solid #e1e1e1;
	height: 100px;
`;

const Container = forwardRef<
	{},
	IContainerProps & {
		actions: any[];
	} & {
		children: React.ReactNode;
	}
>(({ className, style, ...props }, ref) => {
	const { children } = props;
	useImperativeHandle(ref, () => ({}));

	return (
		<Root
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
