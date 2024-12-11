import React from 'react';
import { Element } from '../../editor/model/editor';
import Materials from '../../materials';
import { observer } from 'mobx-react-lite';
import DropWrapper from '../../editor/core/DropWrapper';
import { ElementProps } from '../types/element';
import { IRendererProps } from '..';
import { Engine } from '../model/engine';
import { replaceVariable } from './utils';

type ISchemasParser = IRendererProps & {
	engine: Engine;
};

const SchemasParser: React.FC<ISchemasParser> = observer((props) => {
	const { inEditor, rootSchema, engine } = props;

	const renderElements = (elements: Element[] = []) => {
		const nodes: React.ReactElement[] = [];
		for (const element of elements) {
			const componentInfo = Materials.find(
				(material) => material.meta.type === element.type
			);

			const componentConfig = replaceVariable(
				element.props,
				engine.dataSource.valueMap
			);
			// console.log(componentConfig, engine.dataSource.valueMap);
			// console.log(engine.dataSource.valueMap['test']);
			console.log(componentConfig);
			/** 上下文 */
			const elementProps: ElementProps = {
				element,
				componentInfo,
				componentConfig,
			};

			const withDropWrapper = (children) => {
				return inEditor ? (
					<DropWrapper {...elementProps}>{children}</DropWrapper>
				) : (
					children
				);
			};

			let Component = !componentInfo
				? () => <div>不存在{element.type}物料</div>
				: (props) =>
						withDropWrapper(
							React.createElement(componentInfo.component, props)
						);

			nodes.push(
				<Component {...elementProps}>
					{renderElements(element.children)}
				</Component>
			);
		}
		return nodes;
	};

	return <>{renderElements(rootSchema.schemas)}</>;
});

export default SchemasParser;
