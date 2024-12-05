import React from 'react';
import styled from 'styled-components';
import materials from '../../../../materials';
import MaterialItem from '../DraggableItem';
import { CustomDragLayer } from './DraggableLayout';

import { Button } from '@arco-design/web-react';

interface IMaterialPanelProps {
	className?: string;
	style?: React.CSSProperties;
}

const Root = styled.div`
	padding: 0 4px;

	.material-list {
		display: flex;
		gap: 4px;
	}
`;

const MaterialPanel: React.FC<IMaterialPanelProps> = ({
	className,
	style,
	engine,
}) => {
	return (
		<Root>
			<h3>物料列表</h3>
			<div className="material-list">
				<CustomDragLayer />
				{materials.map((material, index) => {
					if (material.meta.configure?.notShowInMenu) return;
					return (
						<MaterialItem
							metaData={material.meta}
							component={material.component}
							key={index}
							engine={engine}
						/>
					);
				})}
			</div>
			<Button
				style={{
					marginTop: 20,
				}}
				status="danger"
				onClick={() => {
					engine.reset();
				}}
			>
				清空
			</Button>
		</Root>
	);
};

export default MaterialPanel;
