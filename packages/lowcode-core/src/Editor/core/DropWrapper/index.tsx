import React, { useRef } from 'react';
import { Button as ArcoButton } from '@arco-design/web-react';
import { ItemTypes } from '../../ItemTypes';
import Engine, { Element } from '../../../core/model/Engine';
import { useDrop } from '../../hooks/useDrop';
import { useDrag } from 'react-dnd';
import { MetaData } from '../../../materials/_types';
import { observer } from 'mobx-react';

interface IDropWrapper {
	type: string;
	id: string;
	parentId?: string;
	engine: Engine;
	dev?: MetaData['dev'];
}

const DropWrapper: React.FC<IDropWrapper> = observer((props) => {
	const { type, id, engine, parentId, children, dev } = props;
	const { dragable = true, dropable = true } = dev ?? {};
	const nodeRef = useRef();

	const [, drag] = useDrag(
		() => ({
			type: ItemTypes.BOX,
			// 传递的信息
			item: () => ({ type: type, id: id, children: [], parentId }),
			end: (item, monitor) => {
				// 获取 drop 通过 drop 回调 return 的数据
				const dropResult = monitor.getDropResult();
				if (!monitor.didDrop()) {
					// console.log(item.id, 'ididd');
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
				opacity: monitor.isDragging() ? 0 : 1,
			}),
		}),
		[id]
	);

	const [{ canDrop, isOver }, { nodeRef: _nodeRef }] = useDrop({
		accept: ItemTypes.BOX,
		deps: [engine, id],
		moveCard: (
			/** 抛来的 element */
			element: Element,
			/** 当前被释放元素的 id */
			id: string
		) => {
			const hasElement = engine.has(element.id);
			if (element.id === id) {
				// return engine.remove(element.id);
				return;
			}

			if (!hasElement) {
				engine.add({ ...element, parentId }, id);
			} else {
				// parent 相同，需要特殊处理
				if (element.parentId === parentId) {
					const parent = engine.get(element.parentId);
					const dropIdx = parent.children.findIndex((item) => item.id === id);
					const dragIdx = parent.children.findIndex(
						(item) => item.id === element.id
					);
					engine.remove(element.id);

					// 由于先删掉了，如果拖的元素在前面，需要补齐 index
					// if (dragIdx < dropIdx) {
					if (dragIdx + 1 < dropIdx) {
						engine.insertAfterParentIdx(element, parent.children, dropIdx + 1);
					} else {
						engine.insertAfterParentIdx(element, parent.children, dropIdx);
					}
					return;
				}
				// 删除
				engine.remove(element.id);
				// 插入
				engine.insertAfter(element, id);
			}
		},
		ref: nodeRef,
		id: id,
	});

	let ref;

	if (dropable) {
		ref = _nodeRef;
	}
	if (dragable) {
		ref = drag(ref);
	}

	if (!ref) {
		return children;
	}

	let border = 'initial';

	if (engine.selectedId === id) {
		border = '1px solid blue';
	}
	if (isOver) {
		border = '1px solid blue';
	}

	return (
		<div
			style={{
				marginBottom: 10,
				border,
			}}
			ref={ref}
			onClick={() => {
				engine.setSelectedId(id);
			}}
		>
			<div
				style={{
					pointerEvents: 'none',
				}}
			>
				{children}
			</div>
		</div>
	);
});

export default DropWrapper;