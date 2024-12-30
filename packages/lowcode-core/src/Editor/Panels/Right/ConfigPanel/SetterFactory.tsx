import React from 'react';
import { Form } from '@arco-design/web-react';
import InputSetter from './Setters/InputSetter';
import JsonSetter from './Setters/JsonSetter';
import JsSetter from './Setters/JsSetter';

interface ISetterRendererProps {
	className?: string;
	style?: React.CSSProperties;
	name?: string;
	setter: any;
}

export const createSetter = (props: ISetterRendererProps) => {
	const { name, setter } = props;
	const renderSetter = () => {
		let SetterComponent;
		switch (setter.componentName) {
			case 'StringSetter': {
				SetterComponent = InputSetter;
				break;
			}
			case 'JsonSetter': {
				SetterComponent = JsonSetter;
				break;
			}
			case 'JsSetter': {
				SetterComponent = JsSetter;
				break;
			}
		}

		return <SetterComponent {...(setter?.props ?? {})} />;
	};

	return (
		<Form.Item
			label={name}
			field={name}
		>
			{renderSetter()}
		</Form.Item>
	);
};
