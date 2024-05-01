import { MetaData } from '../_types';

export const ButtonMeta: MetaData = {
  type: 'Button',
  title: '按钮',
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
};
