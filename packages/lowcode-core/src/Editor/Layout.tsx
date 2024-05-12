import React, { useState } from 'react';
import styled from 'styled-components';

import Canvas from './Panels/Canvas';
import MaterialPanel from './Panels/Left/Material';
import RightPanels from './Panels/Right';
import '@arco-design/web-react/dist/css/arco.css';
import { $$_editor_json_schema } from './constants/cache';
import { useSchemaContext } from './store/SchemaContext';
import { Tabs } from '@arco-design/web-react';
import { IconApps, IconSettings } from '@arco-design/web-react/icon';
import SourceCodePanel from './Panels/Left/SourceCode';

interface IEditorProps {
  className?: string;
  style?: React.CSSProperties;
}

const Root = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;

  .left {
    width: 300px;
    .arco-tabs-header-title {
      padding: 8px 14px !important;
      font-size: 18px !important;
    }
    .arco-tabs-content-vertical {
      padding-left: 0;
    }
  }

  .center {
    min-height: 100vh;
    flex: 1;
  }

  .right {
    min-width: 300px;
  }

  .arco-tabs {
    height: 100%;
  }
`;

const Editor: React.FC<IEditorProps> = () => {
  const { schemaConfig, setSchemaConfig } = useSchemaContext();
  const onSave = setSchemaConfig;

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
        <Tabs defaultActiveTab="material" tabPosition="left" size="large">
          <Tabs.TabPane key="material" title={<IconApps />}>
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
          </Tabs.TabPane>
          <Tabs.TabPane title={<IconSettings />}>
            <SourceCodePanel />
          </Tabs.TabPane>
        </Tabs>
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
