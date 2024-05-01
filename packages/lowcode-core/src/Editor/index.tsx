import React from 'react';
import { SchemaContextProvider } from './store/SchemaContext';
import Layout from './Layout';

interface IEditorProps {}

const Editor: React.FC<IEditorProps> = () => {
  return (
    <SchemaContextProvider>
      <Layout />
    </SchemaContextProvider>
  );
};

export default Editor;
