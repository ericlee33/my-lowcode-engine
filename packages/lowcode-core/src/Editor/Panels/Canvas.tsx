import { useDrop } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';
import materials from '../../Materials';
import Renderer from '../../Renderer';

const style: React.CSSProperties = {
  height: '100%',
  color: 'white',
  textAlign: 'center',
};

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
  return (
    <div ref={drop} style={{ ...style, ...borderProps }}>
      <Renderer schemaConfig={schemaConfig} />
    </div>
  );
};

export default Canvas;
