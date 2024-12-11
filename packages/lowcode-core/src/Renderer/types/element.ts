import type { ReactElement } from 'react';
import type { Element } from '../../editor/model/editor';
import { MetaData } from '../../materials/_types';

export type ElementProps<C extends Record<string, any> = {}> = {
	// id: string;
	// parentId: string;
	// parentElement: Element;

	/** 当前节点 */
	element: Element;
	// parent: {
	// 	id: string;
	// 	element: Element;
	// };
	/** 当前物料信息 */
	componentInfo: {
		meta: MetaData;
		component: React.ReactNode;
	};
	componentConfig: C;
};
