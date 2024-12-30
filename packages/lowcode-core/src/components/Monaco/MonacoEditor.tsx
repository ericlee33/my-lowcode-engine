import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import MonacoEditor, { EditorProps } from '@monaco-editor/react';
import { omit } from 'lodash-es';

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

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

export interface IEditorProps {
	className?: string;
	style?: React.CSSProperties;
	onChange?: EditorProps['onChange'];
	value?: EditorProps['value'];
	editorProps?: EditorProps;
}

const Root = styled.div`
	/* 针对 Monaco Editor 的提示框设置更高的 z-index */
	.monaco-editor.suggest-widget {
		z-index: 9999 !important;
	}
`;

const DefaultOptions: EditorProps['options'] = {
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
};

const Editor: React.FC<IEditorProps> = (props) => {
	const { className, style, value, onChange, editorProps } = props;

	const [ready, setReady] = useState(false);
	useEffect(() => {
		loader.init().then(() => setReady(true));
	}, []);

	const mergedEditorProps = useMemo(() => {
		const options = {
			...DefaultOptions,
			...editorProps,
		};

		return {
			options,
			height: 500,
			...omit(editorProps, ['options']),
		};
	}, [editorProps]);

	return (
		<Root
			className={className}
			style={style}
		>
			{!ready ? (
				'loading'
			) : (
				<MonacoEditor
					{...mergedEditorProps}
					onChange={onChange}
					value={value}
				/>
			)}
		</Root>
	);
};

export default Editor;
