import { makeAutoObservable, reaction } from 'mobx';
import { generateId } from '../../../utils';
import { find, findIndex, forEach } from 'lodash-es';
import { $$_editor_json_schema } from '../../../editor/constants/cache';
import { EngineProps } from '../Engine';
import { ISchemas, Element } from '../../types/schema';

// 页面 Schema
class Schemas {
	static createDefaultSchema = () =>
		[
			{
				type: 'page',
				id: generateId(),
				children: [],
				parentId: null,
			},
		] as ISchemas;

	// dsl 入口
	get root() {
		return this.$schema;
	}

	private $schema: ISchemas;
	private $disposers = [];

	selectedId?: string;

	constructor(props: EngineProps) {
		makeAutoObservable(this);
		this.$schema = props.schema?.schemas ?? Schemas.createDefaultSchema();
	}

	has(id: string) {
		const element = this.traverse(this.root, id)[0];
		return !!element;
	}

	hasInElement(id: string, rootElement?: Element) {
		const rootElements = rootElement ? [rootElement] : this.root;
		const element = this.traverse(rootElements, id)[0];
		return !!element;
	}

	get(id: string): Element | null {
		return this.traverse(this.root, id)[0];
	}

	add(compoent: Element, id: string) {
		const [target] = this.traverse(this.root, id);
		target.children.push(compoent);
	}

	addToElement(compoent: Element, rootElement: Element) {
		rootElement.children.push(compoent);
	}

	remove(id: string) {
		return this.$remove(this.root, id);
	}

	insertAfter(element: Element, id: string) {
		const [, parent] = this.traverse(this.root, id);
		const insertIndex = parent.findIndex((item) => item.id === id);
		// console.log(parent[0].id, parent, id, insertIndex, 'insertIndex');
		parent.splice(insertIndex, 0, element);
	}

	insertAfterParentIdx(element: Element, parent: Element[], idx: number) {
		// console.log(parent[0].id, parent, id, insertIndex, 'insertIndex');
		parent.splice(idx, 0, element);
	}

	$remove(children: Element[], id: string) {
		const componentIndex = findIndex(
			children,
			(component) => component.id === id
		);
		if (componentIndex > -1) {
			children.splice(componentIndex, 1);

			return;
		}
		for (const component of children) {
			this.$remove(component.children, id);
		}

		console.error('没有找到 remove 元素');
	}

	private traverse(children: Element[], id: string): [Element, Element[]] {
		const component = find(children, (component) => component.id === id);
		if (component) {
			return [component, children];
		}

		for (const component of children) {
			const result = this.traverse(component.children, id);
			const element = result[0];
			if (element) {
				return result;
			}
		}

		return [null, []];
	}

	setElementProps(element: Element, value) {
		element.props = {
			...element.props,
			...value,
		};
	}

	reset(schema?) {
		this.$schema = schema ?? Schemas.createDefaultSchema();
	}

	setSelectedId(id: string) {
		this.selectedId = id;
	}

	destroy() {
		forEach(this.$disposers, (disposer) => {
			disposer();
		});
	}

	// swap(aId: string, bId: string) {
	// 	const [, aFatherNode] = this.traverse(this.root.schemas, aId);
	// 	const [eleB] = this.traverse(this.root.schemas, bId);

	// 	const aIdx = aFatherNode.findIndex((item) => item.id === aId);
	// 	aFatherNode.splice(aIdx, 1, eleB);

	// 	const [, bFatherNode] = this.traverse(this.root.schemas, bId);
	// 	const [eleA] = this.traverse(this.root.schemas, aId);

	// 	const bIdx = bFatherNode.findIndex((item) => item.id === bId);
	// 	bFatherNode.splice(bIdx, 1, eleA);
	// }
}

export default Schemas;