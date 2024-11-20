import React from 'react';
import styled from 'styled-components';
import { Tabs } from '@arco-design/web-react';
import ConfigPanel from './ConfigPanel';
import EventPanel from './EventPanel';
import { useSchemaContext } from '../../store/SchemaContext';

interface IRightPanelsProps {
  className?: string;
  style?: React.CSSProperties;
}

const Root = styled(Tabs)``;

const RightPanels: React.FC<IRightPanelsProps> = ({ className, style }) => {
  const { selectedId } = useSchemaContext();

  return (
    <Root className={className} style={style}>
      <Tabs.TabPane key="config" title="属性">
        <ConfigPanel key={selectedId} />
      </Tabs.TabPane>
      <Tabs.TabPane key="event" title="事件">
        <EventPanel />
      </Tabs.TabPane>
    </Root>
  );
};

export default RightPanels;
