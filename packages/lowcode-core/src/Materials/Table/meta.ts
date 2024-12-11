import { MetaData } from '../_types';
import { DragType } from '../_consts';

export const Meta: MetaData = {
  type: 'Table',
  title: '表格',
  configure: {
    props: [
      {
        name: 'columns',
        propType: 'string',
        description: '这是用于描述姓名',
        defaultValue: [
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
        extraProps: {
          setValue: (target, value) => {
            if (value === '123') {
              target.getProps().setPropValue('age', 2);
            }
          },
        },
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
  },
  dev: {
    canvas: {
      dragType: DragType.Common,
    },
  },
};
