import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { Button } from '@arco-design/web-react';
import { MetaData } from '../Materials/_types';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
};

interface IDraggableItemProps {
  metaData: MetaData;
  component: React.FC<any>;
}

const DraggableItem: React.FC<IDraggableItemProps> = ({ metaData }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    // 传递的信息
    item: { type: metaData.type },
    end: (item, monitor) => {
      // 获取 drop 通过 drop 回调 return 的数据
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        console.log(item, 333, dropResult);
      }
    },
    canDrag: true,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const opacity = isDragging ? 0.4 : 1;

  return (
    <Button ref={drag} style={{ ...style, opacity }}>
      {metaData.title}
    </Button>
  );
};

export default DraggableItem;
