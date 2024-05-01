import React from 'react';
import styled from 'styled-components';
import ComponentWrapper from './ComponentWrapper';

import { findComponentByType } from './core';
interface IRendererProps {
  className?: string;
  style?: React.CSSProperties;
  // json 协议
  schemaConfig: any;
}

const Root = styled.div`
  .material-item-container {
  }
`;

const Renderer: React.FC<IRendererProps> = ({
  className,
  style,
  schemaConfig,
}) => {
  return (
    <Root className={className} style={style}>
      {schemaConfig.map((item, index) => {
        const Component = findComponentByType(item.type);
        return (
          <ComponentWrapper key={index} item={item}>
            <Component {...item.props} />
          </ComponentWrapper>
        );
      })}
    </Root>
  );
};

export default Renderer;
