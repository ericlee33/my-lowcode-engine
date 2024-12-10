import React, { useRef } from 'react';
import { Button as ArcoButton, ButtonProps } from '@arco-design/web-react';
import { Engine } from '../../core/model/engine';

interface IButtonProps extends ButtonProps {
	id: string;
	parentId?: string;
	engine: Engine;
}

const Button: React.FC<IButtonProps> = ({ id, engine, parentId, ...props }) => {
	return (
		<ArcoButton
			onClick={(e) => {
				e.preventDefault();
			}}
			// style={{ pointerEvents: 'none' }}
			{...props}
		>
			{`默认值${id.slice(0, 5)}`}
		</ArcoButton>
	);
};

export default Button;
