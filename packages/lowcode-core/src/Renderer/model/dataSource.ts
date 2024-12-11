import { makeAutoObservable } from 'mobx';
import dataSourceField from './dataSourceField';
import { IDataSourceField } from '../../types/dataSource';
import { forEach } from 'lodash-es';
// import { EditorProps } from '../../editor';

export class DataSource {
	// fields: Record<string, any>[] = [];
	$dataSource: IDataSourceField[];

	get value() {
		return this.$dataSource;
	}

	constructor(props: EditorProps) {
		makeAutoObservable(this);
		this.$dataSource = props.schema?.dataSource ?? [];

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
}
