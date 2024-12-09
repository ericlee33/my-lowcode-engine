import React, { useImperativeHandle } from 'react';
import styled from 'styled-components';
import { Input as ArcoInput, InputProps } from '@arco-design/web-react';

interface IInputProps extends InputProps {
	className?: string;
	style?: React.CSSProperties;
	initialValue: any;
	value: any;
	onChange: (value: any) => void;
}

const Root = styled(ArcoInput)``;

const Input: React.FC<IInputProps> & {
	actions: any[];
} = (props) => {
	const { onChange, style, className, componentConfig } = props;
	const { initialValue } = componentConfig ?? {};

	// const abc = () => {
	// 	console.log('abc');
	// };

	// const onClear = () => {
	// 	const { onChange } = props;
	// 	onChange('');
	// };

	// useImperativeHandle(forwardedRef, () => ({
	// 	abc,
	// 	onClear,
	// }));

	return (
		<Root
			className={className}
			style={style}
			defaultValue={initialValue}
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
