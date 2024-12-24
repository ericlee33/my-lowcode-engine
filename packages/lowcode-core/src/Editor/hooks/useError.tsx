import React, { useEffect, useCallback } from 'react';

export const useError = () => {
	const onErorr = useCallback((event) => {
		console.log(event);
	}, []);

	useEffect(() => {
		window.addEventListener('error', onErorr);

		return () => {
			window.removeEventListener('error', onErorr);
		};
	}, []);
};
