import { v4 as uuid } from 'uuid';

export const generateId = (options?) => {
	return uuid(options);
};
