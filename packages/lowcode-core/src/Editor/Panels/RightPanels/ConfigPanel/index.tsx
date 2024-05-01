import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSchemaContext } from '../../../store/SchemaContext';
import { useConfigById } from '../../../../Renderer/core';
import { Empty, Form } from '@arco-design/web-react';
import { createSetter } from './SetterFactory';
import { getMetaByType } from '../../../utils/materials';
import { useDeepCompareEffect } from 'ahooks';

interface IConfigPanelProps {
  className?: string;
  style?: React.CSSProperties;
}

const Root = styled(Form)``;

const ConfigPanel: React.FC<IConfigPanelProps> = ({ className, style }) => {
  const [form] = Form.useForm();
  const { schemaConfig, selectedId, setSchemaConfig } = useSchemaContext();
  const componentInfo = useConfigById(selectedId);
  const meta = getMetaByType(componentInfo?.type);

  useDeepCompareEffect(() => {
    form.setFieldsValue(componentInfo?.props);
  }, [componentInfo?.props, form]);

  const renderSetters = () => {
    if (!meta) {
      return <Empty />;
    }
    if (!meta.configure.props) {
      return <Empty description="该组件无配置" />;
    }
    return meta.configure.props.map((prop) => createSetter(prop));
  };

  return (
    <Root
      form={form}
      className={className}
      style={style}
      onValuesChange={(_, values) => {
        setSchemaConfig((schemaConfig) => {
          const curIndex = schemaConfig.findIndex(
            (item) => item.id === selectedId
          );
          schemaConfig[curIndex].props = values;

          console.log(schemaConfig, 'schemaConfig');
          return [...schemaConfig];
        });
      }}
    >
      <div>配置器</div>
      {renderSetters()}
    </Root>
  );
};

export default ConfigPanel;
