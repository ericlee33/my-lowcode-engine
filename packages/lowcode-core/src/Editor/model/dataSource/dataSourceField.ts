import { makeAutoObservable, reaction } from 'mobx';
import { IDataSourceField } from '../../../types/dataSource';

class DataSourceField {
	constructor(props: IDataSourceField) {
		makeAutoObservable(this);

		this.init();
	}

	init() {
		reaction(
			() => this.values,
			(values) => {
				console.log(values, 'values');
			}
		);
	}
}

export default DataSourceField;
