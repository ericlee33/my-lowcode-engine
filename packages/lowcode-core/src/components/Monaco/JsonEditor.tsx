import React, { useState, useEffect, useMemo } from 'react';
import { EditorProps } from '@monaco-editor/react';

import Editor from './MonacoEditor';

export interface IJsonEditorProps {
	className?: string;
	style?: React.CSSProperties;
	onChange?: (value: Record<string, any>) => void;
	value?: Record<string, any>;
	editorProps?: EditorProps;
}

const JsonEditor: React.FC<IJsonEditorProps> = (props) => {
	const { value: _value, onChange: _onChange, editorProps } = props;

	const onChange = (value) => {
		try {
			const objectValue = JSON.parse(value);
			_onChange?.(objectValue);
		} catch {
			console.error('Json Editor 解析异常');
		}
	};

	const value = useMemo(() => {
		return JSON.stringify(_value, null, 2);
	}, [_value]);

	return (
		<Editor
			editorProps={{
				language: 'json',
				...editorProps,
			}}
			onChange={onChange}
			value={value}
		/>
	);
};

export default JsonEditor;
