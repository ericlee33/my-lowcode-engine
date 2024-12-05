import React from 'react';
import styled from 'styled-components';
import { Tabs } from '@arco-design/web-react';
import ConfigPanel from './ConfigPanel';
import EventPanel from './EventPanel';

interface IRightPanelsProps {}

const Root = styled(Tabs)``;

const RightPanels: React.FC<IRightPanelsProps> = (props) => {
	const { engine } = props;
	return (
		<Root>
			<Tabs.TabPane
				key="config"
				title="属性"
			>
				<ConfigPanel engine={engine} />
			</Tabs.TabPane>
			<Tabs.TabPane
				key="event"
				title="事件"
			>
				<EventPanel />
			</Tabs.TabPane>
		</Root>
	);
};

export default RightPanels;
