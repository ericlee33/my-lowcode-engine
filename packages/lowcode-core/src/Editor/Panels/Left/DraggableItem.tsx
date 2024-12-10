import { useDrag } from 'react-dnd';
import { DragType } from '../../../materials/_consts';
// import { Button } from '@arco-design/web-react';
import { MetaData } from '../../../materials/_types';
import { generateId } from '../../../utils';
import Engine from '../../../core/model/engine';
import { useEffect } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import { IconApps } from '@arco-design/web-react/icon';

const StyledMaterial = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid #d1d1d1;
	border-radius: 2px;
	font-size: 12px;
	white-space: nowrap;
	background-color: white;
	padding: 10px;
	cursor: move;
	width: 46%;
	height: 36px;
	box-sizing: border-box;
`;
interface IDraggableItemProps {
	metaData: MetaData;
	component: React.FC<any>;
	engine: Engine;
}

// 容器接受容器，按钮接受非新物料
const DraggableItem: React.FC<IDraggableItemProps> = (props) => {
	const { metaData, engine } = props;
	const dragType = metaData.dev.canvas.dragType;

	const [{ isDragging }, drag, preview] = useDrag(() => ({
		type: dragType,
		// 传递的信息
		item: () => ({ type: metaData.type, id: generateId(), children: [] }),
		end: (item, monitor) => {
			// 获取 drop 通过 drop 回调 return 的数据
			const dropResult = monitor.getDropResult();
			if (!monitor.didDrop()) {
				// engine.remove(item.id);
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
			engine.schema.setSelectedId('');
		}
	}, [isDragging]);

	useEffect(() => {
		preview(getEmptyImage(), { captureDraggingState: true });
	}, []);

	return (
		<StyledMaterial ref={drag}>
			<IconApps
				style={{
					marginRight: 4,
				}}
			/>
			{metaData.title}
		</StyledMaterial>
	);
};

export default DraggableItem;
