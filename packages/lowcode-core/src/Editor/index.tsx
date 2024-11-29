import React, { useState, useEffect, useRef } from 'react';
import { SchemaContextProvider } from './store/SchemaContext';
import Layout from './Layout';
import EngineCore from '../core/model/EngineCore';
import { $$_editor_json_schema } from './constants/cache';

interface IEditorProps {}

const Editor: React.FC<IEditorProps> = () => {
	const [ready, setReady] = useState(false);
	const engineCore = useRef<EngineCore>();

	useEffect(() => {
		let cachedSchema;
		try {
			cachedSchema = JSON.parse(localStorage.getItem($$_editor_json_schema));
		} catch {}

		engineCore.current = new EngineCore({
			schema: cachedSchema,
		});
		console.log(engineCore.current, 'engineCore.current');
		setReady(true);
	}, []);
	return ready && <Layout engineCore={engineCore.current} />;
};

export default Editor;
