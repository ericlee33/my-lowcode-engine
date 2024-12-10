import React, { useEffect, useRef } from 'react';
import { DragType } from '../../../materials/_consts';
import { Engine, Element } from '../../../core/model/engine';
import {
	useDrag,
	useDrop,
	DragSourceMonitor,
	DropTargetMonitor,
} from 'react-dnd';
import { MetaData } from '../../../materials/_types';
import { observer } from 'mobx-react-lite';
import Toolbar from './Toolbar';

interface IDropWrapper {
	type: string;
	id: string;
	parentId?: string;
	engine: Engine;
	dev?: MetaData['dev'];
	componentChildren: any;
}

const DropWrapper: React.FC<IDropWrapper> = observer((props) => {
	const { type, id, engine, parentId, children, dev, componentChildren } =
		props;
	const { dragable = true, dropable = true } = dev ?? {};
	let nodeRef = useRef<HTMLDivElement>();

	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: DragType.Common,
			// 传递的信息
			item: () => ({
				type: type,
				id: id,
				children: componentChildren,
				parentId,
			}),
			end: (item, monitor) => {
				// 获取 drop 通过 drop 回调 return 的数据
				const dropResult = monitor.getDropResult();
				if (!monitor.didDrop()) {
					// console.log(item.id, 'ididd');
					// engine.remove(item.id);
				}
				if (item && dropResult) {
					// console.log(item, 333, dropResult);
				}
			},
			canDrag: (item: DragSourceMonitor) => {
				const isDragging = item.isDragging();
				return !isDragging;
			},
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
		}),
		[id]
	);
	useEffect(() => {
		if (isDragging) {
			engine.schemas.setSelectedId('');
		}
	}, [isDragging]);

	const [{ isOver }, drop] = useDrop(
		{
			accept: [DragType.Common],
			drop: (
				/** 抛来的 element */
				element: Element,
				monitor: DropTargetMonitor
			) => {
				const didDrop = monitor.didDrop();
				if (didDrop) {
					return;
				}
				const hasElement = engine.schemas.has(element.id);
				if (element.id === id) {
					return;
				}

				if (!hasElement) {
					engine.schemas.add({ ...element, parentId }, id);
				} else {
					// parent 相同，需要特殊处理
					if (element.parentId === parentId) {
						const parent = engine.schemas.get(element.parentId);
						const dropIdx = parent.children.findIndex((item) => item.id === id);
						const dragIdx = parent.children.findIndex(
							(item) => item.id === element.id
						);
						console.log(element.id, 'test');
						engine.schemas.remove(element.id);
						console.log(element.id, 'test');

						// 由于先删掉了，如果拖的元素在前面，需要补齐 index
						// if (dragIdx < dropIdx) {
						if (dragIdx + 1 < dropIdx) {
							engine.schemas.insertAfterParentIdx(
								element,
								parent.children,
								dropIdx + 1
							);
						} else {
							engine.schemas.insertAfterParentIdx(
								element,
								parent.children,
								dropIdx
							);
						}
						return;
					}
					// 删除
					engine.schemas.remove(element.id);
					// 插入
					engine.schemas.insertAfter({ ...element, parentId }, id);
				}
			},
			collect: (monitor) => ({
				isOver: monitor.isOver({
					shallow: true,
				}),
			}),
		},
		[engine, id, parentId]
	);

	if (dropable) {
		drop(nodeRef);
	}
	if (dragable) {
		drag(nodeRef);
	}

	if (!dragable && !dragable) {
		return children;
	}

	let border = 'initial';

	const isSelected = engine.schemas.selectedId === id;

	if (isOver || isSelected) {
		border = '1px solid blue';
	}

	return (
		<div
			style={{
				marginBottom: 10,
				border,
			}}
			ref={nodeRef}
			onClickCapture={() => {
				engine.schemas.setSelectedId(id);
			}}
		>
			{isSelected && (
				<div
					style={{
						position: 'relative',
					}}
				>
					<Toolbar />
				</div>
			)}
			<div
				style={
					{
						// pointerEvents: 'none',
					}
				}
			>
				{children}
			</div>
		</div>
	);
});

export default DropWrapper;
