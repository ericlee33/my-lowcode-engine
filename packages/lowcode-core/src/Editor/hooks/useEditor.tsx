import React, { useContext } from 'react';
import { Editor } from '../model/editor';

const EditorContext = React.createContext<{
	editor: Editor;
}>({} as any);

export const EditorContextProvider: React.FC<{
	editor: Editor;
}> = (props) => {
	const { children, editor } = props;

	return (
		<EditorContext.Provider
			value={{
				editor,
			}}
		>
			{children}
		</EditorContext.Provider>
	);
};

export const useEditor = () => {
	return useContext(EditorContext);
};
