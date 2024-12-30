import { IDataSourceField } from './dataSource';

export type Element = {
	// 物料类型
	type: string;
	// uuid
	id: string;
	// 子节点
	children: Element[];
	// 物料属性
	props?: Record<string, any>;
	// 父亲 id
	parentId: string | null;
};

export type ISchemas = Element[];

export type EditorSchemaRoot = {
	/** 数据源 */
	dataSource: IDataSourceField[];
	/** 页面 schema */
	schemas: ISchemas;
	createTimestamp: number;
	// 协议版本
	version: 1;
};
