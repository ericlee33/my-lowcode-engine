import React, { useState } from 'react';
import styled from 'styled-components';

import MaterialPanel from './panels/Left/Material';
import DataSource from './panels/Left/DataSource';
import RightPanels from './panels/Right';
import '@arco-design/web-react/dist/css/arco.css';
import { Button, Tabs } from '@arco-design/web-react';
import {
  IconStorage,
  IconApps,
  IconSettings,
} from '@arco-design/web-react/icon';
import SourceCodePanel from './panels/Left/SourceCode';
import '@arco-design/web-react/dist/css/arco.css';
import Engine from '../core/model/Engine';
import Renderer from '../renderer';

interface IEditorProps {
  className?: string;
  style?: React.CSSProperties;
  engine: Engine;
}

const Root = styled.div`
  height: 100vh;
  width: 100vw;

  .header {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e1e1e1;

    .logo {
      margin-left: 4px;
      color: #b0b0b0;
      background: radial-gradient(
        495.98% 195.09% at 144.79% 10.71%,
        #ff8a01 0,
        #b051b9 22.37%,
        #672bff 45.54%,
        #06f 99.99%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 20px;
    }

    .btns {
      margin-right: 20px;
    }
  }

  .editor-area {
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
      width: 280px;
    }

    .arco-tabs {
      height: 100%;
    }
  }
`;

const Editor: React.FC<IEditorProps> = (props) => {
  const { engine } = props;

  return (
    <Root>
      <div className="header">
        <span className="logo">Eric's Low Code</span>
        <span className="btns">
          <Button type="outline" onClick={() => {}}>
            预览
          </Button>
        </span>
      </div>
      <div className="left"></div>
      <div className="editor-area">
        <div className="left">
          <Tabs defaultActiveTab="material" tabPosition="left" size="large">
            <Tabs.TabPane key="material" title={<IconApps />}>
              <MaterialPanel
                style={{
                  marginTop: '10px',
                }}
                engine={engine}
              />
            </Tabs.TabPane>
            <Tabs.TabPane key="dataSource" title={<IconStorage />}>
              <DataSource
                style={{
                  marginTop: '10px',
                }}
                engine={engine}
              />
            </Tabs.TabPane>
            <Tabs.TabPane title={<IconSettings />}>
              <SourceCodePanel engine={engine} />
            </Tabs.TabPane>
          </Tabs>
        </div>
        <div className="center">
          <Renderer engine={engine} />
        </div>
        <div className="right">
          <RightPanels engine={engine} />
        </div>
      </div>
    </Root>
  );
};

export default Editor;
