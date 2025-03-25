import { makeAutoObservable, reaction } from 'mobx';
import { Schemas } from './schemas';
import { Canvas } from './canvas';
import { DataSourceResgister } from './dataSourceResgister';
import { EditorSchemaRoot } from '../../types/schema';
import { $$_editor_json_schema } from '../constants/cache';
import { pick } from 'lodash-es';

export type Element = {
  /** uuid */
  id: string;
  /** widget type */
  type: string;
  // 物料属性
  props?: Record<string, any>;
  children: Element[];
  // 父亲 id，降低查询时间
  parentId: string | null;
};

export type EditorProps = {
  schema?: EditorSchemaRoot;
};

export class Editor {
  schemas: Schemas;
  dataSource: DataSourceResgister;
  canvas: Canvas;

  $schema: EditorSchemaRoot;
  private $disposers = [];

  private createDefaultSchema(config: Partial<EditorSchemaRoot>) {
    return {
      version: 1,
      createTimestamp: new Date().getTime(),
      ...config,
    } as EditorSchemaRoot;
  }

  get rootSchema() {
    const schema = {
      version: 1,
      createTimestamp: new Date().getTime(),
      ...pick(this.$schema, ['version', 'createTimestamp']),
      schemas: this.schemas.value,
      dataSource: this.dataSource.value,
    };
    return schema;
  }

  constructor(props: EditorProps) {
    makeAutoObservable(this);
    this.schemas = new Schemas(props);
    this.dataSource = new DataSourceResgister(props);
    this.canvas = new Canvas();
    this.$schema =
      // 基础属性，version 等
      props.schema ??
      this.createDefaultSchema({
        schemas: this.schemas.value,
        dataSource: this.dataSource.value,
      });

    const disposer = reaction(
      () => {
        return JSON.stringify(this.rootSchema);
      },
      ($schema) => {
        localStorage.setItem($$_editor_json_schema, $schema);
      }
    );

    this.$disposers.push(disposer);
  }

  reset() {
    this.schemas.reset();
    this.dataSource.reset();
  }

  destory() {
    this.$disposers.forEach((disposer) => disposer());
  }
}
