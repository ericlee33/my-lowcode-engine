import { makeAutoObservable, reaction } from 'mobx';
import dataSourceField from './dataSourceField';
import { DataSourceField } from '../../types/dataSource';
import { forEach } from 'lodash-es';
import { EngineProps } from '../engine';

class DataSource {
	fields: Record<string, any>[] = [];
	$dataSource;

	constructor(props: EngineProps) {
		makeAutoObservable(this);
		this.$dataSource = props.schema?.dataSource;

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
