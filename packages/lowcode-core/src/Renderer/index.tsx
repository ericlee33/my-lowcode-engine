import React from 'react';
import styled from 'styled-components';

import { findComponentByType } from './core';
interface IRendererProps {
  className?: string;
  style?: React.CSSProperties;
  // json 协议
  jsonSchema: any;
}

const Root = styled.div``;

const Renderer: React.FC<IRendererProps> = ({
  className,
  style,
  jsonSchema,
}) => {
  return (
    <Root className={className} style={style}>
      {jsonSchema.map((item) => {
        const Component = findComponentByType(item.type);
        return <Component />;
      })}
    </Root>
  );
};

export default Renderer;
