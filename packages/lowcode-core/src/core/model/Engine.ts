import { makeAutoObservable } from 'mobx';
import Schema from './schema';

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
	schema?: Element[];
};

class Engine {
	schema: Schema;

	constructor(props: EngineProps) {
		this.schema = new Schema(props);
		makeAutoObservable(this);
	}

	destory() {
		this.schema.destroy();
	}
}

export default Engine;
