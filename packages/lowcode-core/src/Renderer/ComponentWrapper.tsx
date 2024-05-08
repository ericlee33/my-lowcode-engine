import React, { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { SchemaConfig } from './_types';
import { useSchemaContext } from '../Editor/store/SchemaContext';

import { findComponentByType } from './core';
import { useScoped } from '../Editor/store/ScopedContext';
import { Empty } from '@arco-design/web-react';

interface IComponentWrapperProps {
  className?: string;
  style?: React.CSSProperties;
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
  item,
}) => {
  const isUnmounted = useRef(false);

  const { selectedId, setSelectedId } = useSchemaContext();
  const {
    componentContext,
    // , setComponentContext
  } = useScoped();

  const Component = findComponentByType(item.type);

  useEffect(() => {
    console.log(123, 4);
    return () => {
      isUnmounted.current = true;
    };
  }, []);

  if (!Component) {
    return <Empty description="未找到组件" />;
  }

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
      {/* <div className="mask"></div> */}
      <Component
        forwardedRef={(ref) => {
          componentContext.current = {
            ...componentContext.current,
            [item.id]: ref,
          };
        }}
        componentContext={componentContext.current}
        id={item.id}
        {...item.props}
      />
    </Root>
  );
};

export default ComponentWrapper;
