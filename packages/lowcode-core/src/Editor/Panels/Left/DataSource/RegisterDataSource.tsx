import React from 'react';
import { Form, Radio, Button, Input } from '@arco-design/web-react';
import { useEditor } from '../../../hooks/useEditor';
import { generateId } from '../../../../utils';

interface IRegisterDataSource {}

const RegisterDataSource: React.FC<IRegisterDataSource> = (props) => {
  const { editor } = useEditor();
  return (
    <Form
      onSubmit={(values) => {
        editor.dataSource.add(values);
      }}
      initialValues={{
        id: generateId(),
        type: 'api',
      }}
    >
      <Form.Item
        label="名称"
        field="name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="id"
        field="id"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        label="类型"
        field="type"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Radio.Group
          options={[
            {
              label: 'API',
              value: 'api',
            },
            {
              label: '函数',
              value: 'func',
            },
          ]}
        />
      </Form.Item>
      <Form.Item
        label="接口地址"
        field="api"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 5,
        }}
      >
        <Button type="primary" htmlType="submit">
          添加
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterDataSource;
