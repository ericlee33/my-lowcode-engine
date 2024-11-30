import React, { useImperativeHandle } from 'react';
import styled from 'styled-components';
import { Input as ArcoInput, InputProps } from '@arco-design/web-react';

interface IInputProps extends InputProps {
	className?: string;
	style?: React.CSSProperties;
	forwardedRef: React.ForwardedRef<ThisType<typeof Input>>;
}

const Root = styled(ArcoInput)``;

const Input: React.FC<IInputProps> & {
	actions: any[];
} = ({ className, style, forwardedRef, ...props }) => {
	const abc = () => {
		console.log('abc');
	};

	const onClear = () => {
		const { onChange } = props;
		onChange('');
	};

	useImperativeHandle(forwardedRef, () => ({
		abc,
		onClear,
	}));

	return (
		<Root
			className={className}
			style={style}
		/>
	);
};

Input.actions = [
	{
		label: '清空',
		value: 'onClear',
	},
];

export default Input;
