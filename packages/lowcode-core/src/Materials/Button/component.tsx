import React, { useRef } from 'react';
import { Button as ArcoButton, ButtonProps } from '@arco-design/web-react';
import { ElementProps } from '../../renderer/types/element';

interface IButtonProps extends ElementProps<ButtonProps> {}

const Button: React.FC<IButtonProps> = (props) => {
	const { element } = props;
	const { id, parentId } = element;

	return (
		<ArcoButton
			onClick={(e) => {
				e.preventDefault();
			}}
			// style={{ pointerEvents: 'none' }}
		>
			{`默认值${id.slice(0, 5)}`}
		</ArcoButton>
	);
};

export default Button;
