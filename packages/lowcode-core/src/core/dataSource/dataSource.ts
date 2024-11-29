import { makeAutoObservable, reaction } from 'mobx';
import dataSourceField from './dataSourceField';
import { DataSourceField } from './_types';
import { forEach } from 'lodash-es';

class DataSource {
	fields: Record<string, any>[] = [];

	constructor() {
		makeAutoObservable(this);

		this.init();
	}

	init() {
		forEach(this.fields, (field) => {
			field.init();
		});
	}

	register(field: DataSourceField) {
		this.fields.push(new dataSourceField(field));
	}
}

export default DataSource;
