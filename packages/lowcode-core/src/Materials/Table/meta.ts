import { MetaData } from '../_types';
import { DragType } from '../_consts';

export const Meta: MetaData = {
	type: 'Table',
	title: '表格',
	configure: {
		props: [
			{
				name: 'data',
				propType: 'string',
				description: '绑定数据',
				setter: {
					componentName: 'StringSetter',
					isRequired: false,
					initialValue: '',
				},
			},
			{
				name: 'columns',
				propType: 'string',
				description: '这是用于描述姓名',
				setter: {
					componentName: 'JsonSetter',
					isRequired: false,
					initialValue: '',
					props: {
						editorProps: {
							height: 900,
						},
					},
				},
			},
		],
		defaultValues: {
			columns: [
				{
					title: 'Name',
					dataIndex: 'name',
				},
				{
					title: 'Salary',
					dataIndex: 'salary',
				},
				{
					title: 'Address',
					dataIndex: 'address',
				},
				{
					title: 'Email',
					dataIndex: 'email',
				},
			],
		},
	},
	dev: {
		canvas: {
			dragType: DragType.Common,
		},
	},
};
