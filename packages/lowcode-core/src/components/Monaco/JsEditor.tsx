import React, { useState, useEffect, useMemo } from 'react';
import { EditorProps } from '@monaco-editor/react';

import MonacoEditor, { IEditorProps } from './MonacoEditor';

export interface IJsEditorProps extends IEditorProps {
	editorProps?: EditorProps;
}

const JsEditor: React.FC<IJsEditorProps> = (props) => {
	const { value, onChange, editorProps } = props;

	return (
		<MonacoEditor
			editorProps={{
				language: 'javascript',
				...editorProps,
			}}
			onChange={onChange}
			value={value}
		/>
	);
};

export default JsEditor;
