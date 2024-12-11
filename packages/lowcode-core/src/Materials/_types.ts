import { DragType } from './_consts';
import { Editor } from '../editor/model/editor';

export type MetaData = {
  /** 物料类型 */
  type: string;
  title: string;
  configure: {
    props: {
      name: string;
      propType: string;
      description: string;
      /** 生成 dsl 时，使用的 value */
      defaultValue: any;
      // extraProps: {
      //   setValue: (target: any, value: any) => void;
      // };
      setter: {
        componentName: string;
        isRequired: boolean;
        /** 存量组件，没有值的情况加载 initialValue */
        initialValue: string;
        // setter 大小
        props?: Record<string, any>;
      };
    }[];
    notShowInMenu?: boolean;
  };
  /** 开发环境 */
  dev?: {
    dragable?: boolean;
    dropable?: boolean;
    canvas: {
      /** 拖拽类型 */
      dragType: DragType;
    };
  };
};

export type IComponentProps<P = any> = {
  componentConfig: P;
  id: string;
  parentId: string;
  parentElement: Element;
  editor: Editor;
};
