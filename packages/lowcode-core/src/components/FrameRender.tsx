import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface FrameRenderProps {
  children?: React.ReactNode;
}

export const FrameRender: React.FC<FrameRenderProps> = ({
  children,
  ...props
}) => {
  const ref = React.useRef<HTMLIFrameElement>(null);
  const [nodes, setNodes] = useState(null);

  const onLoad = () => {
    const mountNode = ref?.current?.contentWindow?.document.body;
    if (mountNode) {
      console.log(mountNode, 'mountNode', createPortal(children, mountNode));
      setNodes(createPortal(children, mountNode));
    }
    setNodes(null);
  };

  return (
    <iframe
      {...props}
      ref={ref}
      width="100%"
      height="100%"
      style={{
        border: 'none',
      }}
      onLoad={() => {
        onLoad();
        // console.log(mountNode, 'mountNode', children);
        // mountNode ? createPortal(children, mountNode) : null;
      }}
    >
      {nodes}
    </iframe>
  );
};
