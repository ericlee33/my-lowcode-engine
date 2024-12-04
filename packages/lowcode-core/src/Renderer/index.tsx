import React from 'react';
import EngineCore, { Element } from '../core/model/EngineCore';
import Materials from '../Materials';
import { observer } from 'mobx-react';

type IRendererProps = {
	engineCore: EngineCore;
};

const Renderer: React.FC<IRendererProps> = observer((props) => {
	const { engineCore } = props;

	const renderElements = (
		elements: Element[],
		parentId: undefined | string
	) => {
		const nodes: React.ReactElement[] = [];
		for (let element of elements) {
			const material = Materials.find(
				(material) => material.meta.type === element.type
			);

			nodes.push(
				React.createElement(
					material.component,
					{
						parentId,
						engineCore,
						id: element.id,
					},
					renderElements(element.children, element.id)
				)
			);
		}
		return nodes;
	};

	// return <>{renderElements(engineCore.schmea)}</>;
	return <>{renderElements(engineCore.schmea, undefined)}</>;
});

export default Renderer;
