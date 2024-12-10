type FieldBase<T> = {
	type: T;
	name: string;
	id: string;
};

type FieldType = 'func' | 'api' | '';

export type IDataSourceField<T extends FieldType = ''> = FieldBase<T> &
	(T extends 'func'
		? {
				func: string;
		  }
		: T extends 'api'
		? {
				api: string;
		  }
		: {
				// expression: string;
		  });
