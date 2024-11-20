import React from 'react';
import styled from 'styled-components';
import ComponentWrapper from './ComponentWrapper';
import ScopedContextProvider from '../Editor/store/ScopedContext';

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
  console.log(schemaConfig.state, 332);
  return (
    <Root className={className} style={style}>
      <ScopedContextProvider>
        {schemaConfig.state.map((item) => {
          return <ComponentWrapper key={item.id} item={item} />;
        })}
      </ScopedContextProvider>
    </Root>
  );
};

export default Renderer;
