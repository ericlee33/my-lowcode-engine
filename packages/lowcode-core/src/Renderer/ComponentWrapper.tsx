import React from 'react';
import styled from 'styled-components';
import { SchemaConfig } from './_types';
import { useSchemaContext } from '../Editor/store/SchemaContext';

interface IComponentWrapperProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  item: SchemaConfig;
}

const Root = styled.div`
  position: relative;
  .mask {
    position: absolute;
    z-index: 999;
    width: 100%;
    height: 100%;
  }
`;

const ComponentWrapper: React.FC<IComponentWrapperProps> = ({
  className,
  style,
  children,
  item,
}) => {
  const { selectedId, setSelectedId } = useSchemaContext();
  return (
    <Root
      className={className}
      style={{
        ...style,
        border: selectedId === item.id ? '1px solid blue' : 'initial',
      }}
      onClick={(e) => {
        setSelectedId(item.id);
        // e.stopPropagation();
      }}
    >
      <div className="mask"></div>
      {children}
    </Root>
  );
};

export default ComponentWrapper;
