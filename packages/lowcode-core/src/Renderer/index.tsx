import React from 'react';
import EngineCore, { Element } from '../core/model/EngineCore';
import Materials from '../Materials';
import { observer } from 'mobx-react';

type IRendererProps = {
	engineCore: EngineCore;
};

const Renderer: React.FC<IRendererProps> = observer((props) => {
	const { engineCore } = props;
	console.log(engineCore, '23');

	const renderElements = (elements: Element[]) => {
		const nodes: React.ReactElement[] = [];
		for (let element of elements) {
			const material = Materials.find(
				(material) => material.meta.type === element.type
			);

			nodes.push(
				React.createElement(
					material.component,
					{
						parentId: element.id,
						engineCore,
						id: element.id,
					},
					renderElements(element.children)
				)
			);
		}
		return nodes;
	};

	// return <>{renderElements(engineCore.schmea)}</>;
	return <>{renderElements(engineCore.schmea)}</>;
});

export default Renderer;
