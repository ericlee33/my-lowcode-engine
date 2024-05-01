import materials from '../../Materials';

export const getMetaByType = (type: string) => {
  return materials.find((material) => material.meta.type === type)?.meta;
};
