import React, { useContext } from 'react';
import Engine from '../../core/model/engine';

const EngineContext = React.createContext<{
	engine: Engine;
}>({} as any);

export const EngineContextProvider: React.FC<{
	engine: Engine;
}> = (props) => {
	const { children, engine } = props;
	return (
		<EngineContext.Provider
			value={{
				engine,
			}}
		>
			{children}
		</EngineContext.Provider>
	);
};

export const useEngine = () => {
	return useContext(EngineContext);
};
