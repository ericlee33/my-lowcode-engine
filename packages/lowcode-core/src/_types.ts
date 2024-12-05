import { DataSourceField } from './core/dataSource/_types';

export type Content = {
	type: string;
	id: string;
	children: Content[];
};

export type EngineSchemaRoot = {
	/** 数据源 */
	dataSource: DataSourceField[];
	content: Content;
	version: 1;
};
