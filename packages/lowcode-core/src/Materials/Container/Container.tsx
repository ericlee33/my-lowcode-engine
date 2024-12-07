import React, { Children, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { useDrop } from '../../editor/hooks/useDrop';
import { ItemTypes } from '../../editor/ItemTypes';
import Engine, { Element } from '../../core/model/Engine';

interface IContainerProps {
	className?: string;
	style?: React.CSSProperties;
	id: string;
	parentId: string;
	parentElement: Element;
	engine: Engine;
}

const Root = styled.div`
	border: 1px solid #e1e1e1;
	min-height: 130px;
	padding: 10px;
`;

const Container = forwardRef<
	{},
	IContainerProps & {
		actions: any[];
	} & {
		children: React.ReactNode;
	}
>((props, ref) => {
	const { className, style, engine, id, parentId, parentElement, children } =
		props;

	const [{ canDrop, isOver }, { nodeRef: _nodeRef }] = useDrop({
		accept: ItemTypes.BOX,
		moveCard: (
			element: Element,
			id
			// monitor
		) => {
			const elementHasId = engine.hasInElement(element.id, parentElement);
			const rootHasElement = engine.has(element.id);
			console.log(engine.schmea, element.id, elementHasId, 'hasElement');
			if (!rootHasElement) {
				engine.addToElement(element, parentElement);
			} else if (!elementHasId) {
				engine.remove(element.id);
				engine.addToElement(element, parentElement);
			}
		},
		deps: [engine, id, parentElement],
		id,
	});

	useImperativeHandle(ref, () => ({}));

	return (
		<Root
			ref={_nodeRef}
			className={className}
			style={style}
			{...props}
		>
			{parentId}
			{children}
		</Root>
	);
});

Container.actions = [
	{
		label: '清空',
		value: 'onClear',
	},
];

export default Container;
