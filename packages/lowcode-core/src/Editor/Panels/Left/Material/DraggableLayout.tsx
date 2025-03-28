import type { CSSProperties, FC } from 'react';
import type { XYCoord } from 'react-dnd';
import { useDragLayer } from 'react-dnd';

// import { BoxDragPreview } from './BoxDragPreview';
import Materials from '../../../../materials';
import { DragType } from '../../../../materials/_consts';

export function snapToGrid(x: number, y: number): [number, number] {
	const snappedX = Math.round(x / 32) * 32;
	const snappedY = Math.round(y / 32) * 32;
	return [snappedX, snappedY];
}

const layerStyles: CSSProperties = {
	position: 'fixed',
	pointerEvents: 'none',
	zIndex: 100,
	left: 0,
	top: 0,
	width: '100%',
	height: '100%',
};

function getItemStyles(
	initialOffset: XYCoord | null,
	currentOffset: XYCoord | null,
	isSnapToGrid: boolean
) {
	if (!initialOffset || !currentOffset) {
		return {
			display: 'none',
		};
	}

	let { x, y } = currentOffset;

	if (isSnapToGrid) {
		x -= initialOffset.x;
		y -= initialOffset.y;
		[x, y] = snapToGrid(x, y);
		x += initialOffset.x;
		y += initialOffset.y;
	}

	const transform = `translate(${x}px, ${y}px)`;
	return {
		transform,
		WebkitTransform: transform,
	};
}

export interface CustomDragLayerProps {
	snapToGrid: boolean;
}

export const CustomDragLayer: FC<CustomDragLayerProps> = (props) => {
	const { itemType, isDragging, item, initialOffset, currentOffset } =
		useDragLayer((monitor) => ({
			item: monitor.getItem(),
			itemType: monitor.getItemType(),
			initialOffset: monitor.getInitialSourceClientOffset(),
			currentOffset: monitor.getSourceClientOffset(),
			isDragging: monitor.isDragging(),
		}));

	function renderItem() {
		const material = Materials.find(
			(material) => material.meta.type === item.type
		);
		const Component = material.component;

		switch (itemType) {
			default:
				return (
					<Component
						element={item}
						componentConfig={item.props}
					/>
				);
		}
	}

	if (!isDragging) {
		return null;
	}
	return (
		<div style={layerStyles}>
			<div
				style={getItemStyles(initialOffset, currentOffset, props.snapToGrid)}
			>
				{renderItem()}
			</div>
		</div>
	);
};
