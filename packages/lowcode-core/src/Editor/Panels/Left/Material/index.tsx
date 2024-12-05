import React from 'react';
import styled from 'styled-components';
import materials from '../../../../Materials';
import MaterialItem from '../DraggableItem';
import { CustomDragLayer } from './DraggableLayout';

interface IMaterialPanelProps {
	className?: string;
	style?: React.CSSProperties;
}

const Root = styled.div`
	cursor: 'move';
`;

const MaterialPanel: React.FC<IMaterialPanelProps> = ({
	className,
	style,
	engineCore,
}) => {
	return (
		<Root
			className={className}
			style={style}
		>
			<CustomDragLayer />
			{materials.map((material, index) => {
				if (material.meta.configure?.notShowInMenu) return;
				return (
					<MaterialItem
						metaData={material.meta}
						component={material.component}
						key={index}
						engineCore={engineCore}
					/>
				);
			})}
		</Root>
	);
};

export default MaterialPanel;
