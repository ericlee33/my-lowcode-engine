import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../ItemTypes';
// import { Button } from '@arco-design/web-react';
import { MetaData } from '../../../Materials/_types';
import { generateId } from '../../../utils';
import EngineCore from '../../../core/model/EngineCore';

const style = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	cursor: 'move',
};

interface IDraggableItemProps {
	metaData: MetaData;
	component: React.FC<any>;
	engineCore: EngineCore;
}

const DraggableItem: React.FC<IDraggableItemProps> = ({
	metaData,
	engineCore,
}) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: ItemTypes.BOX,
		// 传递的信息
		item: () => ({ type: metaData.type, id: generateId(), children: [] }),
		end: (item, monitor) => {
			// 获取 drop 通过 drop 回调 return 的数据
			const dropResult = monitor.getDropResult();
			if (!monitor.didDrop()) {
				console.log(item.id, 'ididd');
				engineCore.remove(item.id);
			}
			if (item && dropResult) {
				// console.log(item, 333, dropResult);
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
		<button
			ref={drag}
			style={{ ...style, opacity }}
		>
			{metaData.title}
		</button>
	);
};

export default DraggableItem;
