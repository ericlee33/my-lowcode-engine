import React from 'react';
import Engine, { Element } from '../core/model/Engine';
import Materials from '../materials';
import { observer } from 'mobx-react';
import DropWrapper from '../editor/core/DropWrapper';

type IRendererProps = {
	engine: Engine;
};

const Renderer: React.FC<IRendererProps> = observer((props) => {
	const { engine } = props;

	const renderElements = (
		elements: Element[],
		parentId: undefined | string
	) => {
		const nodes: React.ReactElement[] = [];
		for (let element of elements) {
			const material = Materials.find(
				(material) => material.meta.type === element.type
			);

			const Component = (props) => (
				<DropWrapper
					type={material.meta.type}
					parentId={parentId}
					id={element.id}
					engine={engine}
					dev={material.meta?.dev}
				>
					{React.createElement(material.component, props)}
				</DropWrapper>
			);

			nodes.push(
				React.createElement(
					Component,
					{
						parentId,
						engine,
						id: element.id,
						componentConfig: element.props ?? {},
					},
					renderElements(element.children, element.id)
				)
			);
		}
		return nodes;
	};

	return <>{renderElements(engine.schmea, undefined)}</>;
});

export default Renderer;
