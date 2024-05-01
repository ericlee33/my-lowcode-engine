import materials from '../Materials';
import { useSchemaContext } from '../Editor/store/SchemaContext';

export const findComponentByType = (type: string) => {
  return materials.find((material) => material.meta.type === type)?.component;
};

export const useConfigById = (id: string) => {
  const { schemaConfig } = useSchemaContext();

  const item = schemaConfig.find((item) => item.id === id);

  return item;
};
