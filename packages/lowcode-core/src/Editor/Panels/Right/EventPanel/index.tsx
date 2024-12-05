import React from 'react';
import styled from 'styled-components';
import { Button } from '@arco-design/web-react';

interface IEventPanelProps {
	className?: string;
	style?: React.CSSProperties;
}

const Root = styled(Button)``;

const EventPanel: React.FC<IEventPanelProps> = ({ className, style }) => {
	// const { selectedId, setSchemaConfig, schemaConfig } = useSchemaContext();

	return (
		<Root
			className={className}
			style={style}
			onClick={() => {
				// const curIndex = schemaConfig.findIndex(
				//   (item) => item.id === selectedId
				// );
				// schemaConfig[curIndex] = {
				//   ...schemaConfig[curIndex],
				//   onEvent: {
				//     click: {
				//       actions: [
				//         {
				//           componentId: 'tabs-change-receiver',
				//           actionType: 'changeActiveKey',
				//           args: {
				//             activeKey: 2,
				//           },
				//         },
				//       ],
				//     },
				//   },
				// };
				// setSchemaConfig(schemaConfig);
			}}
		>
			设置 Event 默认值
		</Root>
	);
};

export default EventPanel;
