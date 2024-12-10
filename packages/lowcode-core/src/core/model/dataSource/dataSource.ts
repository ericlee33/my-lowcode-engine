import { makeAutoObservable } from 'mobx';
import dataSourceField from './dataSourceField';
import { IDataSourceField } from '../../types/dataSource';
import { forEach } from 'lodash-es';
import { EngineProps } from '../engine';

class DataSource {
	// fields: Record<string, any>[] = [];
	$dataSource: IDataSourceField[];

	get value() {
		return this.$dataSource;
	}

	constructor(props: EngineProps) {
		makeAutoObservable(this);
		this.$dataSource = props.schema?.dataSource ?? [];

		console.log(this.$dataSource, 'datasource');

		this.init();
	}

	private init() {
		// forEach(this.fields, (field) => {
		// 	field.init();
		// });
	}

	register(field: IDataSourceField) {
		// this.fields.push(new dataSourceField(field));
	}

	add(field: IDataSourceField) {
		this.$dataSource = [...this.$dataSource, field];
	}

	remove(id: string) {
		this.$dataSource = this.$dataSource.filter((item) => item.id !== id);
	}

	reset() {
		this.$dataSource = [];
	}
}

export default DataSource;
