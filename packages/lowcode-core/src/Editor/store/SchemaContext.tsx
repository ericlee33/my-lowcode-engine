import React, { useState, useContext, useEffect, useMemo } from 'react';
import { useImmer } from 'use-immer';
import { $$_editor_json_schema } from '../constants/cache';

const SchemaContext = React.createContext<{
  schemaConfig: SchemaController;
  selectedId: string;
  setSelectedId: (selectedId: any) => void;
}>({} as any);

interface ISchemaContextProvider {
  children: React.ReactNode;
}

interface ISchemaControllerProps {
  schemaConfig: any;
  setSchemaConfig: (schemaConfig: any) => void;
}

class SchemaController {
  constructor(private readonly props: ISchemaControllerProps) {
    this.add = this.add.bind(this);
    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.reset = this.reset.bind(this);
  }

  get state() {
    return this.props.schemaConfig;
  }

  add(item) {
    const { setSchemaConfig } = this.props;

    setSchemaConfig((schemaConfig) => {
      schemaConfig.push(item);
    });
  }

  get(id: string) {
    return this.state.find((item) => item.id === id);
  }

  update(opts: { id: string; item: any }) {
    const { id, item } = opts;
    const { setSchemaConfig } = this.props;

    setSchemaConfig((schemaConfig) => {
      const curIndex = schemaConfig.findIndex((item) => item.id === id);
      schemaConfig[curIndex] = {
        ...schemaConfig[curIndex],
        ...item,
      };
    });
  }

  remove(id: string) {}

  reset() {
    const { setSchemaConfig } = this.props;
    setSchemaConfig([]);
  }
}

export const SchemaContextProvider: React.FC<ISchemaContextProvider> = ({
  children,
}) => {
  const [selectedId, setSelectedId] = useState();
  const [_schemaConfig, _setSchemaConfig] = useImmer(() => {
    try {
      return JSON.parse(localStorage.getItem($$_editor_json_schema)) ?? [];
    } catch {
      return [];
    }
  });

  const schemaConfig = useMemo(() => {
    return new SchemaController({
      schemaConfig: _schemaConfig,
      setSchemaConfig: _setSchemaConfig,
    });
  }, [_schemaConfig, _setSchemaConfig]);

  useEffect(() => {
    localStorage.setItem(
      $$_editor_json_schema,
      JSON.stringify(schemaConfig.state)
    );
  }, [schemaConfig.state]);

  return (
    <SchemaContext.Provider
      value={{
        schemaConfig,
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
