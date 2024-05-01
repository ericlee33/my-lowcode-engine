import React, { useState } from 'react';
import styled from 'styled-components';

import Canvas from './Canvas';
import MaterialPanel from './MaterialPanel';
import '@arco-design/web-react/dist/css/arco.css';
import { $$_editor_json_schema } from './constants/cache';

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
  const [jsonSchema, setJsonSchemat] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem($$_editor_json_schema)) ?? [];
    } catch {
      return [];
    }
  });
  const onSave = (jsonSchema) => {
    setJsonSchemat(jsonSchema);
    localStorage.setItem($$_editor_json_schema, JSON.stringify(jsonSchema));
  };

  return (
    <Root>
      <div className="left">
        <MaterialPanel />
      </div>
      <div className="center">
        <Canvas jsonSchema={jsonSchema} onSave={onSave} />
      </div>
      <div className="right"></div>
    </Root>
  );
};

export default Editor;
