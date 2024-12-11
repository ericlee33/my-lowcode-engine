import React from 'react';
import { Element, Editor } from '../editor/model/editor';
import Materials from '../materials';
import { observer } from 'mobx-react-lite';
import DropWrapper from '../editor/core/DropWrapper';
import { ElementProps } from './types/element';

type IRendererProps = {
	/** 编辑器内使用 */
	inEditor?: boolean;
	/** dsl */
	rootSchema: Editor['rootSchema'];
};

const Renderer: React.FC<IRendererProps> = observer((props) => {
	const { inEditor, rootSchema } = props;

	const renderElements = (elements: Element[] = []) => {
		const nodes: React.ReactElement[] = [];
		for (const element of elements) {
			const componentInfo = Materials.find(
				(material) => material.meta.type === element.type
			);

			const elementProps: ElementProps = {
				element,
				componentInfo,
				componentConfig: element.props,
			};

			const renderInnerComponent = (props) =>
				React.createElement(componentInfo.component, props);

			let Component = !componentInfo
				? () => <div>不存在{element.type}物料</div>
				: (props) =>
						inEditor ? (
							<DropWrapper {...elementProps}>
								{renderInnerComponent(props)}
							</DropWrapper>
						) : (
							renderInnerComponent(props)
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

export default Renderer;
