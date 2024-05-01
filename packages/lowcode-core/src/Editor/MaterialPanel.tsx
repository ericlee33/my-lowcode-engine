import React from 'react';
import styled from 'styled-components';
import materials from '../Materials';
import MaterialItem from './DraggableItem';

interface IMaterialPanelProps {
  className?: string;
  style?: React.CSSProperties;
}

const Root = styled.div`
  cursor: 'move';
`;

const MaterialPanel: React.FC<IMaterialPanelProps> = ({ className, style }) => {
  return (
    <Root className={className} style={style}>
      {materials.map((material, index) => (
        <MaterialItem
          metaData={material.meta}
          component={material.component}
          key={index}
        />
      ))}
    </Root>
  );
};

export default MaterialPanel;
