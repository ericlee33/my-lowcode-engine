import { makeAutoObservable, reaction } from 'mobx';
import { IDataSourceField } from '../../types/dataSource';
import { request } from '../core/request';

class DataSourceField {
  constructor(props: IDataSourceField) {
    makeAutoObservable(this);

    this.init();
  }

  init() {
    // request();
    // reaction(
    // 	() => this.values,
    // 	(values) => {
    // 		console.log(values, 'values');
    // 	}
    // );
  }
}

export default DataSourceField;
