import React from 'react';
import styled from 'styled-components';
import materials from '../../../../materials';
import MaterialItem from '../DraggableItem';
import { CustomDragLayer } from './DraggableLayout';

import { Button } from '@arco-design/web-react';
import { useEngine } from '../../../hooks/useEngine';

interface IMaterialPanelProps {
	className?: string;
	style?: React.CSSProperties;
}

const Root = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 0 10px;
	height: 90vh;

	.material-list {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}
`;

const MaterialPanel: React.FC<IMaterialPanelProps> = ({ className, style }) => {
	const { engine } = useEngine();
	return (
		<Root
			className={className}
			style={style}
		>
			<div>
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
			</div>
			<Button
				style={{
					marginTop: 20,
					width: '80px',
				}}
				status="danger"
				onClick={() => {
					engine.schemas.reset();
				}}
			>
				清空
			</Button>
		</Root>
	);
};

export default MaterialPanel;
