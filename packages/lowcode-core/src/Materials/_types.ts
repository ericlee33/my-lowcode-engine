export type MetaData = {
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
};
