import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

import { CanvasArea } from './CanvasArea';
import { Box } from './Box';

interface IEditorProps {
  className?: string;
  style?: React.CSSProperties;
}

const Root = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;

  .left {
    min-width: 200px;
  }

  .center {
    min-height: 100vh;
    flex: 1;
  }
`;

const Editor: React.FC<IEditorProps> = () => {
  return (
    <Root>
      <div className="left">
        <Box name="Glass" />
        <Box name="Banana" />
        <Box name="Paper" />
      </div>
      <div className="center">
        <CanvasArea />
      </div>
      <div className="right"></div>
    </Root>
  );
};

export default Editor;
