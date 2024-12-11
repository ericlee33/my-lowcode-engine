import { makeAutoObservable } from 'mobx';

export class Canvas {
	selectedId?: string;

	constructor() {
		makeAutoObservable(this);
	}

	setSelectedId(id: string) {
		this.selectedId = id;
	}
}
