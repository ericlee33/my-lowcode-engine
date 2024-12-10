type FieldBase<T> = {
	type: T;
};

type FieldType = 'func' | 'api';

export type DataSourceField<T extends FieldType = 'func'> = FieldBase<T> &
	T extends 'func'
	? {
			func: string;
	  }
	: T extends 'api'
	? {
			api: string;
	  }
	: {
			// expression: string;
	  };
