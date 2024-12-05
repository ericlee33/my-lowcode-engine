import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../ItemTypes';
// import { Button } from '@arco-design/web-react';
import { MetaData } from '../../../materials/_types';
import { generateId } from '../../../utils';
import Engine from '../../../core/model/Engine';
import { useEffect } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import styled from 'styled-components';

const StyledMaterial = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid #e1e1e1;
	font-size: 12px;
	white-space: nowrap;
	background-color: white;
	padding: 0.5rem 1rem;
	cursor: move;
	flex: 1;
	height: 60px;
`;
interface IDraggableItemProps {
	metaData: MetaData;
	component: React.FC<any>;
	engine: Engine;
}

const DraggableItem: React.FC<IDraggableItemProps> = ({ metaData, engine }) => {
	const [{ isDragging }, drag, preview] = useDrag(() => ({
		type: ItemTypes.BOX,
		// 传递的信息
		item: () => ({ type: metaData.type, id: generateId(), children: [] }),
		end: (item, monitor) => {
			// 获取 drop 通过 drop 回调 return 的数据
			const dropResult = monitor.getDropResult();
			if (!monitor.didDrop()) {
				engine.remove(item.id);
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

	useEffect(() => {
		if (isDragging) {
			engine.setSelectedId('');
		}
	}, [isDragging]);

	useEffect(() => {
		preview(getEmptyImage(), { captureDraggingState: true });
	}, []);

	return <StyledMaterial ref={drag}>{metaData.title}</StyledMaterial>;
};

export default DraggableItem;
