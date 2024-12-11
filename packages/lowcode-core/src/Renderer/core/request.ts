export const request = (url: string, options?: RequestInit) => {
	return fetch(url, options).then((res) => {
		return res.json();
	});
};
