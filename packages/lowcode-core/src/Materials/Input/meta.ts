import { MetaData } from '../_types';
import { DragType } from '../_consts';

export const InputMeta: MetaData = {
	type: 'Input',
	title: '输入框',
	configure: {
		props: [
			{
				name: 'initialValue',
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
			dragType: DragType.Common,
		},
	},
};
