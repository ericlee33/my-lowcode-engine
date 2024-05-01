import React from 'react';
import styled from 'styled-components';
import { Tabs } from '@arco-design/web-react';
import ConfigPanel from './ConfigPanel';

interface IRightPanelsProps {
  className?: string;
  style?: React.CSSProperties;
}

const Root = styled(Tabs)``;

const RightPanels: React.FC<IRightPanelsProps> = ({ className, style }) => {
  return (
    <Root className={className} style={style}>
      <Tabs.TabPane key="config" title="属性">
        <ConfigPanel />
      </Tabs.TabPane>
      <Tabs.TabPane key="event" title="事件"></Tabs.TabPane>
    </Root>
  );
};

export default RightPanels;
