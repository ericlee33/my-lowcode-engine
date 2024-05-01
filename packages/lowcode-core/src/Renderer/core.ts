import materials from '../Materials';

export const findComponentByType = (type: string) => {
  return materials.find((material) => material.meta.type === type).component;
};
