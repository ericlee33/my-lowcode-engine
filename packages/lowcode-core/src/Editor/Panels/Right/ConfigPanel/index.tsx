import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Empty, Form } from '@arco-design/web-react';
import { createSetter } from './SetterFactory';
import { getMetaByType } from '../../../utils/materials';
import { Editor } from '../../../model/editor';
import { observer } from 'mobx-react-lite';
import { Input } from '@arco-design/web-react';
import { mergeWith } from 'lodash-es';

interface IConfigPanelProps {
  editor: Editor;
}

const Root = styled.div`
  padding: 0 10px;
`;

const ConfigPanel: React.FC<IConfigPanelProps> = observer((props) => {
  const { editor } = props;
  const [form] = Form.useForm();
  const element = editor.schemas.get(editor.schemas.selectedId);
  const meta = getMetaByType(element?.type);
  const componentInfo = meta?.configure;

  useEffect(() => {
    const curValue = element?.props ?? {};

    const value = componentInfo?.props.reduce((initialValueMap, item) => {
      initialValueMap[item.name] = item.setter.initialValue;
      return initialValueMap;
    }, {});

    const mergedValue = mergeWith(value, curValue);
    form.setFieldsValue(mergedValue);
  }, [form, element, componentInfo]);

  const renderSetters = () => {
    if (!meta) {
      return <Empty />;
    }
    if (!meta.configure.props) {
      return <Empty description="该组件无配置" />;
    }
    return componentInfo.props.map((prop) => createSetter(prop));
  };

  return (
    <Root>
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        form={form}
        onValuesChange={(_, values) => {
          editor.schemas.setElementProps(element, values);
        }}
      >
        <div>基本信息</div>
        <Form.Item label="id">
          <Input disabled value={editor.schemas.selectedId} />
        </Form.Item>
        <div>组件配置</div>
        {renderSetters()}
      </Form>
    </Root>
  );
});

export default ConfigPanel;
