import { DragType } from './_consts';

export type Props = {
	name: string;
	propType: string;
	description: string;
	// extraProps: {
	//   setValue: (target: any, value: any) => void;
	// };
	setter: {
		componentName: string;
		isRequired: boolean;
		/** 存量组件，没有值的情况加载 initialValue */
		initialValue: string;
		// setter 大小
		props?: Record<string, any>;
	};
};

export type MetaData = {
	/** 物料类型 */
	type: string;
	title: string;
	configure: {
		props: Props[];
		/** 生成 dsl 时，使用的 value */
		defaultValues: any;
		notShowInMenu?: boolean;
	};
	/** 开发环境 */
	dev?: {
		dragable?: boolean;
		dropable?: boolean;
		canvas: {
			/** 拖拽类型 */
			dragType: DragType;
		};
	};
};
