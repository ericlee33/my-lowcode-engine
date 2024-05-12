import React, { useImperativeHandle, useState } from 'react';
import styled from 'styled-components';
import { Button as ArcoButton, ButtonProps } from '@arco-design/web-react';
import { dispatchEvent } from '../../Renderer/core';
import { useSchemaContext } from '../../Editor/store/SchemaContext';
import { useScoped } from '../../Editor/store/ScopedContext';

interface IButtonProps extends ButtonProps {
  className?: string;
  style?: React.CSSProperties;
  text?: string;
  id: string;
  ref: React.ForwardedRef<ThisType<typeof Button>>;
  forwardedRef: React.ForwardedRef<ThisType<typeof Button>>;
}

const Root = styled(ArcoButton)``;

const Button: React.FC<IButtonProps> = ({
  className,
  style,
  text,
  forwardedRef,
  id,
  ...props
}) => {
  const [render, setRender] = useState(false);
  const { schemaConfig } = useSchemaContext();
  const { componentContext } = useScoped();

  const switchChildNodeRender = () => {
    console.log(id, 'render1');
    // setRender((render) => {
    //   console.log(render, 'render');
    //   return !render;
    // });
    setRender((render) => !render);
  };

  useImperativeHandle(forwardedRef, () => ({
    switchChildNodeRender,
  }));

  const onClick = (event) => {
    dispatchEvent({
      event,
      id,
      schemaConfig,
      componentContext: componentContext.current,
    });
  };

  return (
    <Root className={className} style={style} {...props} onClick={onClick}>
      {text || '默认值'}
      {render ? '隐藏的孩子' : ''}
    </Root>
  );
};

export default Button;
