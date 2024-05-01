import React from 'react';
import styled from 'styled-components';
import { Button as ArcoButton, ButtonProps } from '@arco-design/web-react';

interface IButtonProps extends ButtonProps {
  className?: string;
  style?: React.CSSProperties;
  text?: string;
}

const Root = styled(ArcoButton)``;

const Button: React.FC<IButtonProps> = ({
  className,
  style,
  text,
  ...props
}) => {
  return (
    <Root
      className={className}
      style={style}
      {...props}
      onClick={() => {
        console.log(123);
      }}
    >
      {text || '默认值'}
    </Root>
  );
};

export default Button;
