import React from 'react';
import { Editor } from '@monaco-editor/react';
import { useSchemaContext } from '../../../store/SchemaContext';

interface ISourceCodeEditorProps {}

const SourceCodeEditor: React.FC<ISourceCodeEditorProps> = (props) => {
  const { schemaConfig, setSchemaConfig } = useSchemaContext();
  return (
    <Editor
      language="json"
      height={1000}
      width="100%"
      value={JSON.stringify(schemaConfig, null, 2)}
    />
  );
};

export default SourceCodeEditor;
