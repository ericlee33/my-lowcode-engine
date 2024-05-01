import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import materials from '../Materials';
import Renderer from '../Renderer';

const style: React.CSSProperties = {
  height: '100%',
  color: 'white',
  textAlign: 'center',
};

interface ICanvasProps {
  jsonSchema: any;
  onSave: (jsonSchema: any) => void;
}

const Canvas: React.FC<ICanvasProps> = ({ jsonSchema, onSave }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop:
      (
        item: {
          type: string;
        },
        monitor
      ) =>
      () => {
        const meta = materials.find(
          (material) => material.meta.type === item.type
        )?.meta;
        onSave([
          ...jsonSchema,
          {
            type: item.type,
          },
        ]);

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
  }));

  console.log(jsonSchema, ' jsonSchema');
  const overAndCanCrop = canDrop && isOver;
  let border = '2px solid #111';

  if (overAndCanCrop) {
    border = '2px dotted blue';
  } else if (canDrop) {
    border = '2px solid blue';
  }
  return (
    <div ref={drop} style={{ ...style, border }}>
      <Renderer jsonSchema={jsonSchema} />
    </div>
  );
};

export default Canvas;
