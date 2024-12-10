import { DataSourceField } from '../core/model/dataSource/_types';

export type Element = {
	type: string;
	id: string;
	children: Element[];
};

/** dsl */
export type EngineSchemaRoot = {
	/** 数据源 */
	dataSource: DataSourceField[];
	/** 页面 schema */
	schema: Element[];
	version: 1;
};
