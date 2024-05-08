import React, { useImperativeHandle } from 'react';
import styled from 'styled-components';
import { Input as ArcoInput, InputProps } from '@arco-design/web-react';

interface IInputProps extends InputProps {
  className?: string;
  style?: React.CSSProperties;
  forwardedRef: React.ForwardedRef<ThisType<typeof Input>>;
}

const Root = styled(ArcoInput)``;

const Input: React.FC<IInputProps> = ({
  className,
  style,
  forwardedRef,
  ...props
}) => {
  const abc = () => {
    console.log('abc');
  };

  useImperativeHandle(forwardedRef, () => ({
    abc,
  }));

  return <Root className={className} style={style} {...props} />;
};

export default Input;
