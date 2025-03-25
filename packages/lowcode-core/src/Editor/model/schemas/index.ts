import { observable, makeAutoObservable, reaction, comparer } from 'mobx';
import { generateId } from '../../../utils';
import { cloneDeep, find, findIndex, forEach, isEqual } from 'lodash-es';
import { $$_editor_json_schema } from '../../constants/cache';
import { EditorProps } from '../editor';
import { ISchemas, Element } from '../../../types/schema';

// 页面 Schema
export class Schemas {
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
  get value() {
    return this.$schema;
  }

  $schema: ISchemas;
  private $disposers = [];

  constructor(props: EditorProps) {
    makeAutoObservable(
      this,
      {
        // $schema: observable,
      },
      {
        // equals: isEqual,
      }
    );
    this.$schema = props.schema?.schemas ?? Schemas.createDefaultSchema();
  }

  has(id: string) {
    const element = this.traverse(this.value, id)[0];
    return !!element;
  }

  hasInElement(id: string, rootElement?: Element) {
    const rootElements = rootElement ? [rootElement] : this.value;
    const element = this.traverse(rootElements, id)[0];
    return !!element;
  }

  get(id: string): Element | null {
    return this.traverse(this.value, id)[0];
  }

  add(compoent: Element, id: string) {
    const [target] = this.traverse(this.value, id);
    target.children.push(compoent);
  }

  addToElement(compoent: Element, rootElement: Element) {
    rootElement.children.push(compoent);
  }

  remove(id: string) {
    return this.$remove(this.value, id);
  }

  insertAfter(element: Element, id: string) {
    const [, parent] = this.traverse(this.value, id);
    const insertIndex = parent.findIndex((item) => item.id === id);
    // console.log(parent[0].id, parent, id, insertIndex, 'insertIndex');
    parent.splice(insertIndex, 0, element);
  }

  insertAfterParentIdx(element: Element, parent: Element[], idx: number) {
    // console.log(parent[0].id, parent, id, insertIndex, 'insertIndex');
    parent.splice(idx, 0, element);
  }

  private $remove(children: Element[], id: string) {
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
    const newSchemas = cloneDeep(schema ?? Schemas.createDefaultSchema());
    // this.$schema.length = 0
    Object.assign(this.$schema, newSchemas);
  }

  destroy() {
    forEach(this.$disposers, (disposer) => {
      disposer();
    });
  }

  // swap(aId: string, bId: string) {
  // 	const [, aFatherNode] = this.traverse(this.value.schemas, aId);
  // 	const [eleB] = this.traverse(this.value.schemas, bId);

  // 	const aIdx = aFatherNode.findIndex((item) => item.id === aId);
  // 	aFatherNode.splice(aIdx, 1, eleB);

  // 	const [, bFatherNode] = this.traverse(this.value.schemas, bId);
  // 	const [eleA] = this.traverse(this.value.schemas, aId);

  // 	const bIdx = bFatherNode.findIndex((item) => item.id === bId);
  // 	bFatherNode.splice(bIdx, 1, eleA);
  // }
}
