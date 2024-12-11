import { makeAutoObservable } from 'mobx';
import { IDataSourceField } from '../../types/dataSource';
import { map, forEach } from 'lodash-es';
import DataSourceField from './dataSourceField';
import { IRendererProps } from '..';

export class DataSource {
	fields: DataSourceField[] = [];
	$dataSource: IDataSourceField[];

	ready: boolean = false;

	get value() {
		return this.$dataSource;
	}

	get valueMap() {
		return this.fields.reduce((map, field) => {
			const { name, value } = field;
			map[name] = value;
			return map;
		}, {});
	}

	constructor(props: IRendererProps) {
		makeAutoObservable(this);
		this.$dataSource = props.rootSchema?.dataSource ?? [];

		forEach(this.$dataSource, (field) => {
			this.register(field);
		});
	}

	private register(field: IDataSourceField) {
		this.fields.push(new DataSourceField(field));
	}

	async init() {
		await Promise.all(
			map(this.fields, (field) => {
				return field.init();
			})
		);
	}
}
