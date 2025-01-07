import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Trigger } from '@arco-design/web-react';
import DebugPanel from './DebugPanel';

interface IFooterProps {
  className?: string;
  style?: React.CSSProperties;
}

const Root = styled.div`
  display: flex;
  justify-content: space-between;

  .left {
    margin-left: 8px;
  }

  .right {
  }
`;

const Footer: React.FC<IFooterProps> = (props) => {
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const { className, style } = props;

  return (
    <Root className={className} style={style}>
      <div className="left">内核版本 1.0.0</div>

      <div className="right">
        <Trigger
          popup={() => <DebugPanel onClose={() => setShowDebugPanel(false)} />}
          popupVisible={showDebugPanel}
          onClick={() => setShowDebugPanel(true)}
          position="top"
          trigger="click"
        >
          <Button size="mini" type="text">
            Debug
          </Button>
        </Trigger>
      </div>
    </Root>
  );
};

export default Footer;
