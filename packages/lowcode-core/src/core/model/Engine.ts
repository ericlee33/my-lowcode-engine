import { makeAutoObservable, reaction } from 'mobx';
import Schemas from './schemas';
import { DataSource } from './dataSource';
import { EngineSchemaRoot } from '../types/schema';
import { generateId } from '../../utils';
import { $$_editor_json_schema } from '../../editor/constants/cache';

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

export type EngineProps = {
	schema?: EngineSchemaRoot;
};

export class Engine {
	schemas: Schemas;
	dataSource: DataSource;

	private $schema: EngineSchemaRoot;
	private $disposers = [];

	private createDefaultSchema(config: Partial<EngineSchemaRoot>) {
		return {
			version: 1,
			createTimestamp: new Date().getTime(),
			...config,
		} as EngineSchemaRoot;
	}

	constructor(props: EngineProps) {
		makeAutoObservable(this);
		this.schemas = new Schemas(props);
		this.dataSource = new DataSource(props);
		this.$schema =
			// 基础属性，version 等
			props.schema ??
			this.createDefaultSchema({
				schemas: this.schemas.root,
				// dataSource: this.dataSource ??
				dataSource: [],
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

	get rootSchema() {
		return {
			...this.$schema,
			schemas: this.schemas.root,
			dataSource: this.dataSource,
		};
	}

	reset() {
		this.schemas.reset();
	}

	destory() {
		this.schemas.destroy();
	}
}
