import { makeAutoObservable, reaction } from 'mobx';
import { IDataSourceField, ApiField } from '../../types/dataSource';
import { request } from '../core/request';

class DataSourceField {
	$field: IDataSourceField;
	name: string;
	id: string;

	value: any;

	constructor(field: IDataSourceField) {
		makeAutoObservable(this);
		this.$field = field;
		this.name = field.name;

		this.init();
	}

	async init() {
		const { type } = this.$field;
		switch (type) {
			case 'api': {
				const { api } = this.$field as ApiField;
				const result = await request(api);

				this.value = result;
				break;
			}
		}
		// reaction(
		// 	() => this.values,
		// 	(values) => {
		// 		console.log(values, 'values');
		// 	}
		// );
	}
}

export default DataSourceField;
