import { makeAutoObservable } from 'mobx';
import { IDataSourceField } from '../../types/dataSource';
import { EditorProps } from './editor';

export class DataSourceResgister {
	$dataSource: IDataSourceField[];

	get value() {
		return this.$dataSource;
	}

	constructor(props: EditorProps) {
		makeAutoObservable(this);
		this.$dataSource = props.schema?.dataSource ?? [];
	}

	add(field: IDataSourceField) {
		// this.$dataSource = [...this.$dataSource, field];
		this.$dataSource.push(field);
	}

	remove(id: string) {
		this.$dataSource = this.$dataSource.filter((item) => item.id !== id);
	}

	reset() {
		this.$dataSource = [];
	}
}
