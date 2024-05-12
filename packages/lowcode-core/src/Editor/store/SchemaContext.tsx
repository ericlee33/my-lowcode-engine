import React, { useState, useContext, useEffect } from 'react';
import { $$_editor_json_schema } from '../constants/cache';

const SchemaContext = React.createContext<{
  schemaConfig: any;
  setSchemaConfig: (schema: any) => void;
  selectedId: string;
  setSelectedId: (selectedId: any) => void;
}>({} as any);

interface ISchemaContextProvider {
  children: React.ReactNode;
}

interface ISchemaControllerProps {}

class SchemaController {
  constructor(private readonly props: ISchemaControllerProps) {}

  add() {
    this.props;
  }
}

export const SchemaContextProvider: React.FC<ISchemaContextProvider> = ({
  children,
}) => {
  const [selectedId, setSelectedId] = useState();
  const [schemaConfig, setSchemaConfig] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem($$_editor_json_schema)) ?? [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem($$_editor_json_schema, JSON.stringify(schemaConfig));
  }, [schemaConfig]);

  return (
    <SchemaContext.Provider
      value={{
        schemaConfig,
        setSchemaConfig,
        selectedId,
        setSelectedId,
      }}
    >
      {children}
    </SchemaContext.Provider>
  );
};

export const useSchemaContext = () => {
  return useContext(SchemaContext);
};
