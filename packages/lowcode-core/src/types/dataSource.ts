type FieldType = 'func' | 'api' | '';

type FieldBase = {
	type: FieldType;
	name: string;
	id: string;

	initFirst: boolean;
};

export type ApiField = {
	api: string;
};

export type FuncField = {
	func: string;
};

export type IDataSourceField<T extends FieldType = ''> = FieldBase &
	(T extends 'func'
		? FuncField
		: T extends 'api'
		? ApiField
		: {
				// expression: string;
		  });
