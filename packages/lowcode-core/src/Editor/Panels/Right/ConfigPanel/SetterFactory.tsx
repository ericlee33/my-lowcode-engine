import React from 'react';
import { Form } from '@arco-design/web-react';
import InputSetter from './Setters/InputSetter';

interface ISetterRendererProps {
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  setter: any;
}

export const createSetter = ({ name, setter }: ISetterRendererProps) => {
  const renderSetter = () => {
    switch (setter.componentName) {
      case 'StringSetter': {
        return <InputSetter />;
      }
    }
  };

  return (
    <Form.Item label={name} field={name}>
      {renderSetter()}
    </Form.Item>
  );
};
