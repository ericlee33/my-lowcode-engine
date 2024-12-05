import React, { useState, useEffect, useRef } from 'react';
import Layout from './Layout';
import Engine from '../core/model/Engine';
import { $$_editor_json_schema } from './constants/cache';

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
	return ready && <Layout engine={engine.current} />;
};

export default Editor;
