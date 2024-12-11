import { DataSource } from './dataSource';
import { IRendererProps } from '..';
import { makeAutoObservable } from 'mobx';

export class Engine {
	dataSource: DataSource;

	constructor(props: IRendererProps) {
		makeAutoObservable(this);
		this.dataSource = new DataSource(props);
	}
}
