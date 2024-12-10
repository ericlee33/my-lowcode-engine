import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Editor from '@monaco-editor/react';

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { Engine } from '../../../../core/model/engine';
import { observer } from 'mobx-react-lite';

self.MonacoEnvironment = {
	getWorker(_, label) {
		if (label === 'json') {
			return new jsonWorker();
		}
		if (label === 'css' || label === 'scss' || label === 'less') {
			return new cssWorker();
		}
		if (label === 'html' || label === 'handlebars' || label === 'razor') {
			return new htmlWorker();
		}
		if (label === 'typescript' || label === 'javascript') {
			return new tsWorker();
		}
		return new editorWorker();
	},
};

loader.config({ monaco });

interface ISourceCodePanelProps {
	className?: string;
	style?: React.CSSProperties;
	engine: Engine;
}

const Root = styled.div``;

const SourceCodePanel: React.FC<ISourceCodePanelProps> = observer(
	({ className, style, engine }) => {
		const [ready, setReady] = useState(false);
		useEffect(() => {
			loader.init().then(() => setReady(true));
		}, []);

		const onChange = (value) => {
			engine.schemas.reset(JSON.parse(value));
		};

		return (
			<Root
				className={className}
				style={style}
			>
				{!ready ? (
					'loading'
				) : (
					<Editor
						options={{
							lineNumbers: 'off',
							glyphMargin: false,
							tabSize: 2,
							wordWrap: 'on',
							lineDecorationsWidth: 0,
							lineNumbersMinChars: 0,
							selectOnLineNumbers: true,
							scrollBeyondLastLine: false,
							folding: true,
							minimap: {
								enabled: false,
							},
							contextmenu: false,
							// readOnly: disabled
						}}
						onChange={onChange}
						height="93vh"
						language="json"
						value={JSON.stringify(engine.rootSchema, null, 2)}
					/>
				)}
			</Root>
		);
	}
);

export default SourceCodePanel;
