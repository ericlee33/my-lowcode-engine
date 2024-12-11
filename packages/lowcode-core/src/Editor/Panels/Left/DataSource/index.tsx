import React, { useState } from 'react';
import { List, Button, Popover } from '@arco-design/web-react';
import { IconDelete, IconEdit } from '@arco-design/web-react/icon';
import RegisterDataSource from './RegisterDataSource';
import { useEditor } from '../../../hooks/useEditor';
import { observer } from 'mobx-react-lite';

interface IDataSourceProps {}

const DataSource: React.FC<IDataSourceProps> = observer((props) => {
	const [addPopupVisible, setAddPopupVisible] = useState(false);
	const [editPopupVisible, setEditPopupVisible] = useState(false);
	const { editor } = useEditor();

	const render = (item, index) => {
		const actions = [
			<Popover
				onVisibleChange={(visible) => setEditPopupVisible(visible)}
				popupVisible={editPopupVisible}
				trigger="click"
				position="right"
				title={'添加数据源'}
				content={
					<RegisterDataSource
						mode="edit"
						initialValues={item}
						afterSubmit={() => {
							setEditPopupVisible(false);
						}}
					/>
				}
				triggerProps={{
					popupStyle: {
						width: 500,
					},
				}}
			>
				<span className="list-demo-actions-icon">
					<IconEdit onClick={() => setEditPopupVisible(true)} />
				</span>
			</Popover>,
			<span className="list-demo-actions-icon">
				<IconDelete
					onClick={() => {
						editor.dataSource.remove(item.id);
					}}
				/>
			</span>,
		];
		return (
			<List.Item
				key={index}
				actions={actions}
			>
				<List.Item.Meta
					title={item.name}
					description={item.api}
				/>
			</List.Item>
		);
	};

	return (
		<div
			style={{
				paddingRight: 6,
			}}
		>
			<Popover
				onVisibleChange={(visible) => setAddPopupVisible(visible)}
				popupVisible={addPopupVisible}
				trigger="click"
				position="right"
				title={'添加数据源'}
				content={
					<RegisterDataSource
						afterSubmit={() => {
							setAddPopupVisible(false);
						}}
					/>
				}
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
					size="mini"
					onClick={() => setAddPopupVisible(true)}
				>
					添加数据源
				</Button>
			</Popover>
			<List
				className="list-demo-actions"
				style={{ marginBottom: 48, marginTop: 10 }}
				dataSource={editor.dataSource.value.map((item) => ({ ...item }))}
				render={render}
			/>
		</div>
	);
});

export default DataSource;
