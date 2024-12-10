import { makeAutoObservable, reaction } from 'mobx';
import { DataSourceField } from './_types';

class DataSourceField {
  constructor(props: DataSourceField) {
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
