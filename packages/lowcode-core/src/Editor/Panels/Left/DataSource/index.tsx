import React from 'react';
import { List, Button, Popover } from '@arco-design/web-react';
import { IconDelete } from '@arco-design/web-react/icon';
import RegisterDataSource from './RegisterDataSource';
import { useEngine } from '../../../hooks/useEngine';
import { observer } from 'mobx-react-lite';

interface IDataSourceProps {}

const DataSource: React.FC<IDataSourceProps> = observer((props) => {
	const { engine } = useEngine();

	const render = (actions, item, index) => (
		<List.Item
			key={index}
			actions={actions}
		>
			<List.Item.Meta title={item.name} />
			<IconDelete
				onClick={() => {
					engine.dataSource.remove(item.id);
				}}
			/>
		</List.Item>
	);
	console.log(engine.dataSource.value, 'value.value');

	return (
		<div>
			<Popover
				position="right"
				title={'添加数据源'}
				content={<RegisterDataSource />}
				triggerProps={{
					popupStyle: {
						width: 500,
					},
				}}
			>
				<Button
					style={{
						marginTop: 10,
					}}
					type="outline"
				>
					添加数据源
				</Button>
			</Popover>
			<List
				className="list-demo-actions"
				style={{ width: 700, marginBottom: 48, marginTop: 10 }}
				dataSource={engine.dataSource.value}
				render={render.bind(null, [
					// <span className='list-demo-actions-icon'>
					//   <IconEdit />
					// </span>,
					// <span className='list-demo-actions-icon'>
					//   <IconDelete />
					// </span>,
				])}
			/>
		</div>
	);
});

export default DataSource;
