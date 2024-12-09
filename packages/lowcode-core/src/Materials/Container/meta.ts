import { MetaData } from '../_types';
import { DragType } from '../_consts';

export const InputMeta: MetaData = {
	type: 'Container',
	title: '容器',
	configure: {
		props: [
			{
				name: 'text',
				propType: 'string',
				description: '这是用于描述姓名',
				defaultValue: '张三',
				extraProps: {
					setValue: (target, value) => {
						if (value === '123') {
							target.getProps().setPropValue('age', 2);
						}
					},
				},
				setter: {
					componentName: 'StringSetter',
					isRequired: false,
					initialValue: '',
				},
			},
		],
	},
	dev: {
		canvas: {
			dragType: DragType.Container,
		},
		dropable: false,
		// dragable: false,
	},
};
