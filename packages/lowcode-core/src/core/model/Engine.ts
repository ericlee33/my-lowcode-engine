import { makeAutoObservable, reaction } from 'mobx';
import { generateId } from '../../utils';
import { find, map, findIndex, forEach } from 'lodash-es';
import { $$_editor_json_schema } from '../../editor/constants/cache';

export type Element = {
	/** uuid */
	id: string;
	/** widget type */
	type: string;
	props?: Record<string, any>;
	children: Element[];
	parentId: string | null;
};

type SchemaControllerProps = {
	schema?: Element[];
};

class Engine {
	static DefaultSchema = [
		{
			type: 'page',
			id: generateId(),
			children: [],
			parentId: null,
		},
	];

	get schmea() {
		return this.$schema;
	}

	private $schema: Element[];
	private $disposers = [];

	selectedId?: string;

	constructor(props: SchemaControllerProps) {
		makeAutoObservable(this);
		this.$schema = props.schema ?? Engine.DefaultSchema;

		const disposer = reaction(
			() => {
				return JSON.stringify(this.$schema);
			},
			($schema) => {
				localStorage.setItem($$_editor_json_schema, $schema);
			}
		);

		this.$disposers.push(disposer);
	}

	has(id: string) {
		const element = this.traverse(this.$schema, id)[0];
		return !!element;
	}

	get(id: string): Element | null {
		return this.traverse(this.$schema, id)[0];
	}

	add(compoent: Element, id: string) {
		const [target] = this.traverse(this.$schema, id);
		target.children.push(compoent);
	}

	remove(id: string) {
		return this.$remove(this.$schema, id);
	}

	swap(aId: string, bId: string) {
		const [, aFatherNode] = this.traverse(this.$schema, aId);
		const [eleB] = this.traverse(this.$schema, bId);

		const aIdx = aFatherNode.findIndex((item) => item.id === aId);
		aFatherNode.splice(aIdx, 1, eleB);

		const [, bFatherNode] = this.traverse(this.$schema, bId);
		const [eleA] = this.traverse(this.$schema, aId);

		const bIdx = bFatherNode.findIndex((item) => item.id === bId);
		bFatherNode.splice(bIdx, 1, eleA);
	}

	insertAfter(element: Element, id: string) {
		const [, parent] = this.traverse(this.$schema, id);
		const insertIndex = parent.findIndex((item) => item.id === id);
		// console.log(parent[0].id, parent, id, insertIndex, 'insertIndex');
		parent.splice(insertIndex, 0, element);
	}

	insertAfterParentIdx(element: Element, parent: Element[], idx: number) {
		// console.log(parent[0].id, parent, id, insertIndex, 'insertIndex');
		parent.splice(idx, 0, element);
	}

	$remove(children: Element[], id: string) {
		const compoentIndex = findIndex(children, (compoent) => compoent.id === id);
		if (compoentIndex > -1) {
			children.splice(compoentIndex, 1);

			return;
		}
		for (const component of children) {
			return this.$remove(component.children, id);
		}

		console.error('没有找到 remove 元素');
	}

	private traverse(children: Element[], id: string): [Element, Element[]] {
		const compoent = find(children, (compoent) => compoent.id === id);
		if (compoent) {
			return [compoent, children];
		}

		for (const component of children) {
			return this.traverse(component.children, id);
		}

		return [null, []];
	}

	setElementProps(element: Element, value) {
		element.props = {
			...element.props,
			...value,
		};
	}

	reset() {
		this.$schema = Engine.DefaultSchema;
	}

	setSelectedId(id: string) {
		this.selectedId = id;
	}

	destroy() {
		forEach(this.$disposers, (disposer) => {
			disposer();
		});
	}
}

export default Engine;