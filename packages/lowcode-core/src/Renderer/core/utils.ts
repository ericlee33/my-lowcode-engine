import { isObject } from 'lodash-es';

export const replaceVariable = (props, context: Record<string, any>) => {
	if (!props || !isObject(props)) {
		return props;
	}

	const newValue = {};

	for (let key in props) {
		const result = [];
		const value = props[key] as string;
		if (Array.isArray(value)) {
			for (let item of value) {
				result.push(replaceVariable(item, context));
			}
			newValue[key] = result;
		} else {
			if (typeof value === 'string' && value.includes('${')) {
				const variable = value.match(/\$\{(.*?)\}/)?.[1];
				console.log(value.match(/\$\{(.*?)\}/), 'value.match(/${(.*?)}/)');
				const result = context[variable] ?? `\${${variable}}`;

				newValue[key] = result;
			} else {
				newValue[key] = props[key];
			}
		}
	}

	return newValue;
};
