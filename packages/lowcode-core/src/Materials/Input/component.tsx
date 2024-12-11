import React, { useImperativeHandle } from 'react';
import styled from 'styled-components';
import { Input as ArcoInput, InputProps } from '@arco-design/web-react';
import { ElementProps } from '../../renderer/types/element';

interface IInputProps extends ElementProps<InputProps> {
	value?: any;
	onChange?: (value: any) => void;
}

const Root = styled(ArcoInput)``;

const Input: React.FC<IInputProps> & {
	actions: any[];
} = (props) => {
	const { onChange, componentConfig } = props;
	const { placeholder } = componentConfig ?? {};

	// const onClear = () => {
	// 	const { onChange } = props;
	// 	onChange('');
	// };

	// useImperativeHandle(forwardedRef, () => ({
	// 	onClear,
	// }));

	return <Root placeholder={placeholder} />;
};

Input.actions = [
	{
		label: '清空',
		value: 'onClear',
	},
];

export default Input;
