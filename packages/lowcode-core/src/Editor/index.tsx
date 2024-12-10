import React, { useState, useEffect, useRef } from 'react';
import Layout from './Layout';
import Engine from '../core/model/engine';
import { $$_editor_json_schema } from './constants/cache';
import { EngineContextProvider } from './hooks/useEngine';

interface IEditorProps {}

const Editor: React.FC<IEditorProps> = () => {
	const [ready, setReady] = useState(false);
	const engine = useRef<Engine>();

	useEffect(() => {
		let cachedSchema;
		try {
			cachedSchema = JSON.parse(localStorage.getItem($$_editor_json_schema));
		} catch {}

		engine.current = new Engine({
			schema: cachedSchema,
		});

		setReady(true);
	}, []);
	return (
		ready && (
			<EngineContextProvider engine={engine.current}>
				<Layout engine={engine.current} />
			</EngineContextProvider>
		)
	);
};

export default Editor;
