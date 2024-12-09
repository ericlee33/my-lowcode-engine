import { DragType } from './_consts';

export type MetaData = {
	/** 物料类型 */
	type: string;
	title: string;
	configure: {
		props: {
			name: string;
			propType: string;
			description: string;
			defaultValue: string;
			extraProps: {
				setValue: (target: any, value: any) => void;
			};
			setter: {
				componentName: string;
				isRequired: boolean;
				/** 存量组件，没有值的情况加载 initialValue */
				initialValue: string;
			};
		}[];
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
