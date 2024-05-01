import { Input } from '@arco-design/web-react';
import React from 'react';
import styled from 'styled-components';

interface IInputSetterProps {
  className?: string;
  style?: React.CSSProperties;
  onChange: (value: string) => void;
  value: string;
}

const Root = styled(Input)``;

const InputSetter: React.FC<IInputSetterProps> = ({
  className,
  style,
  onChange,
  value,
}) => {
  return (
    <Root
      className={className}
      style={style}
      onChange={onChange}
      value={value}
    />
  );
};

export default InputSetter;
