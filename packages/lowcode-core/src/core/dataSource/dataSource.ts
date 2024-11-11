import { makeAutoObservable } from 'mobx';

class DataSource {
  constructor() {
    makeAutoObservable(this);
  }

  register() {}
}

export default DataSource;
