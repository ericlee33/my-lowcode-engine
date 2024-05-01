import React, { useState } from 'react';
import styled from 'styled-components';

import Canvas from './Panels/Canvas';
import MaterialPanel from './Panels/LeftPanels/MaterialPanel';
import RightPanels from './Panels/RightPanels';
import '@arco-design/web-react/dist/css/arco.css';
import { $$_editor_json_schema } from './constants/cache';
import { useSchemaContext } from './store/SchemaContext';

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

  .right {
    min-width: 200px;
  }
`;

const Editor: React.FC<IEditorProps> = () => {
  const { schemaConfig, setSchemaConfig } = useSchemaContext();
  const onSave = (jsonSchema) => {
    setSchemaConfig(jsonSchema);
    localStorage.setItem($$_editor_json_schema, JSON.stringify(jsonSchema));
  };

  const onClear = () => {
    localStorage.setItem($$_editor_json_schema, JSON.stringify([]));
  };

  return (
    <Root>
      <div className="left">
        <div
          style={{
            color: '#1da',
            borderBottom: '1px solid #e1e1e1',
            fontSize: '20px',
          }}
        >
          Eric's Low Code
        </div>
        <MaterialPanel
          style={{
            marginTop: '10px',
          }}
        />
        <div
          onClick={() => {
            onClear();
            setSchemaConfig([]);
          }}
        >
          清空
        </div>
      </div>
      <div className="center">
        <Canvas schemaConfig={schemaConfig} onSave={onSave} />
      </div>
      <div className="right">
        <RightPanels />
      </div>
    </Root>
  );
};

export default Editor;
