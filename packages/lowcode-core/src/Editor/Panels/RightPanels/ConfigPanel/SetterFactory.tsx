import React from 'react';
import { Form } from '@arco-design/web-react';
import InputSetter from './Setters/InputSetter';

interface ISetterRendererProps {
  className?: string;
  style?: React.CSSProperties;
  name?: string;
}

export const createSetter = ({ name }: ISetterRendererProps) => {
  const renderSetter = () => {
    return <InputSetter />;
  };

  return (
    <Form.Item label={name} field={name}>
      {renderSetter()}
    </Form.Item>
  );
};
