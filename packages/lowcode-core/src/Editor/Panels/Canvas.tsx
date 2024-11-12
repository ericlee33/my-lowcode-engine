import { useDrop } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';
import materials from '../../Materials';
import Renderer from '../../Renderer';
import styled from 'styled-components';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const style: React.CSSProperties = {
  height: '100%',
  color: 'white',
  textAlign: 'center',
};

const Root = styled.div`
  .test-abc {
    background: #e1e1e1;
  }
`;

interface ICanvasProps {
  schemaConfig: any;
  onSave: (schemaConfig: any) => void;
}

const Canvas: React.FC<ICanvasProps> = ({ schemaConfig, onSave }) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop: (
        item: {
          type: string;
        }
        // monitor
      ) => {
        const result = {
          type: item.type,
          id: Math.random().toString().slice(0, 5),
        };

        onSave(result);

        return {
          test: '123',
        };
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        // // 获取来自拖拽组件的数据
        // item: monitor.getItem<{
        //   metaData: MetaData;
        //   component: React.ComponentType;
        // }>(),
      }),
    }),
    [schemaConfig]
  );

  const overAndCanCrop = canDrop && isOver;
  const borderProps: React.CSSProperties = {
    borderWidth: '0 1px 1px 1px',
    borderStyle: 'solid',
    borderColor: '#e1e1e1',
  };

  if (overAndCanCrop) {
    borderProps.borderWidth = '1px';
    borderProps.borderStyle = 'dotted';
    borderProps.borderColor = 'blue';
  } else if (canDrop) {
    borderProps.borderWidth = '1px';
    borderProps.borderColor = 'blue';
  }

  const layout = [
    { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
  ];

  // const onLayoutChange = () => {

  // }

  return (
    <Root ref={drop} style={{ ...style, ...borderProps }}>
      {/* <Renderer schemaConfig={schemaConfig} /> */}
      <ResponsiveGridLayout
        className="layout"
        layout={layout}

        rowHeight={30}
        width={1200}
        // onLayoutChange={(layout, layouts) =>
        //   this.onLayoutChange(layout, layouts)
        // }
      >
        <div className="test-abc" key="a">
          a
        </div>
        <div className="test-abc" key="b">
          b
        </div>
        <div className="test-abc" key="c">
          c
        </div>
      </ResponsiveGridLayout>
    </Root>
  );
};

export default Canvas;
