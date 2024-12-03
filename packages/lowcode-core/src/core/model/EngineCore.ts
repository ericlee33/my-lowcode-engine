import { makeAutoObservable, reaction } from 'mobx';
import { generateId } from '../../utils';
import { find, map, findIndex } from 'lodash-es';
import { $$_editor_json_schema } from '../../Editor/constants/cache';

export type Element = {
	/** uuid */
	id: string;
	/** widget type */
	type: string;
	props?: Record<string, any>;
	children: Element[];
};

type SchemaControllerProps = {
	schema?: Element[];
};

class EngineCore {
	static DefaultSchema = [
		{
			type: 'page',
			id: generateId(),
			children: [],
		},
	];

	get schmea() {
		return this.$schema;
	}

	private $schema: Element[];

	constructor(props: SchemaControllerProps) {
		makeAutoObservable(this);
		console.log(props, 24);
		this.$schema = props.schema ?? EngineCore.DefaultSchema;

		const disposer = reaction(
			() => {
				return JSON.stringify(this.$schema);
			},
			($schema) => {
				console.log($schema, '4242');
				localStorage.setItem($$_editor_json_schema, $schema);
			}
		);
	}

	has(id: string) {
		return !!this.traverse(this.$schema, id);
	}

	add(compoent: Element, id: string) {
		const [target] = this.traverse(this.$schema, id);
		target.children.push(compoent);
	}

	remove(id: string) {
		return this.$remove(this.$schema, id);
	}

	swap(aId: string, bId: string) {
		const [eleA, aFatherNode] = this.traverse(this.$schema, aId);
		const [eleB, bFatherNode] = this.traverse(this.$schema, bId);

		const aIdx = aFatherNode.findIndex((item) => item.id === aId);
		// console.log(aId, bId, aFatherNode, bFatherNode, 44);
		aFatherNode.splice(aIdx, 1, eleB);
		const bIdx = bFatherNode.findIndex((item) => item.id === bId);
		bFatherNode.splice(bIdx, 1, eleA);
	}

	$remove(children: Element[], id: string) {
		const compoentIndex = findIndex(children, (compoent) => compoent.id === id);
		if (compoentIndex > -1) {
			console.log(compoentIndex, children);
			return children.splice(compoentIndex, 1);
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
	}

	reset() {
		this.$schema = EngineCore.DefaultSchema;
	}
}

export default EngineCore;
