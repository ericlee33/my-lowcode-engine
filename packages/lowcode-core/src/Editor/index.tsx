import React, { useState, useEffect, useRef } from 'react';
import Layout from './Layout';
import { Editor as EditorModel } from './model/editor';
import { $$_editor_json_schema } from './constants/cache';
import { EditorContextProvider } from './hooks/useEditor';

interface IEditorProps {}

const Editor: React.FC<IEditorProps> = () => {
	const [ready, setReady] = useState(false);
	const editor = useRef<EditorModel>();

	useEffect(() => {
		let cachedSchema;
		try {
			cachedSchema = JSON.parse(localStorage.getItem($$_editor_json_schema));
		} catch {}

		editor.current = new EditorModel({
			schema: cachedSchema,
		});

		setReady(true);
	}, []);
	return (
		ready && (
			<EditorContextProvider editor={editor.current}>
				<Layout editor={editor.current} />
			</EditorContextProvider>
		)
	);
};

export default Editor;
