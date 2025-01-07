import React from 'react';
import styled from 'styled-components';
import { Tabs } from '@arco-design/web-react';
import { IconClose, IconDragDotVertical } from '@arco-design/web-react/icon';
import Network from './Network';
import Draggable from 'react-draggable'; // The default

interface IDebugPanelProps {
  className?: string;
  style?: React.CSSProperties;
  onClose: () => void;
}

const Root = styled.div`
  height: 400px;
  width: 500px;
  background-color: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
`;

const DebugPanel: React.FC<IDebugPanelProps> = (props) => {
  const { onClose } = props;
  return (
    <Draggable handle=".drag-handler">
      <Root>
        <Tabs
          type="text"
          size="mini"
          renderTabHeader={(props, DefaultTabHeader) => (
            <div
              className="drag-handler"
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'move',
              }}
            >
              <IconDragDotVertical
                style={{
                  cursor: 'move',
                }}
              />
              <DefaultTabHeader
                style={{
                  flex: 1,
                }}
                {...props}
              />
            </div>
          )}
          extra={
            <IconClose
              style={{
                cursor: 'pointer',
              }}
              onClick={onClose}
            />
          }
        >
          <Tabs.TabPane title="console" key="console">
            <Network />
          </Tabs.TabPane>
          <Tabs.TabPane title="network" key="network">
            <Network />
          </Tabs.TabPane>
        </Tabs>
      </Root>
    </Draggable>
  );
};

export default DebugPanel;
