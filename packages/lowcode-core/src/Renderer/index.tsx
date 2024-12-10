import React from 'react';
import Engine, { Element } from '../core/model/engine';
import Materials from '../materials';
import { observer } from 'mobx-react-lite';
import DropWrapper from '../editor/core/DropWrapper';

type IRendererProps = {
	engine: Engine;
};

const Renderer: React.FC<IRendererProps> = observer((props) => {
	const { engine } = props;

	const renderElements = (
		elements: Element[] = [],
		parentId: undefined | string
	) => {
		const nodes: React.ReactElement[] = [];
		for (const element of elements) {
			const material = Materials.find(
				(material) => material.meta.type === element.type
			);

			const Component = !material
				? () => <div>不存在${element.type}物料</div>
				: (props) => (
						<DropWrapper
							type={material.meta.type}
							parentId={parentId}
							id={element.id}
							engine={engine}
							dev={material.meta?.dev}
							componentChildren={element.children}
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
						parentElement: element,
						componentChildren: element.children,
					},
					renderElements(element.children, element.id)
				)
			);
		}
		return nodes;
	};

	return <>{renderElements(engine.schema.root, undefined)}</>;
});

export default Renderer;
