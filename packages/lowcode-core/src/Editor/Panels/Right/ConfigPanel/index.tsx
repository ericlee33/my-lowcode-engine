import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Empty, Form } from '@arco-design/web-react';
import { createSetter } from './SetterFactory';
import { getMetaByType } from '../../../utils/materials';
import { useDeepCompareEffect } from 'ahooks';
import Engine from '../../../../core/model/Engine';
import { observer } from 'mobx-react';
import { Input } from '@arco-design/web-react';
import { Divider } from '@arco-design/web-react';

interface IConfigPanelProps {
	engine: Engine;
}

const Root = styled.div`
	padding: 0 10px;
`;

const ConfigPanel: React.FC<IConfigPanelProps> = observer((props) => {
	const { engine } = props;
	const [form] = Form.useForm();
	const element = engine.get(engine.selectedId);
	const meta = getMetaByType(element?.type);
	const componentInfo = meta?.configure;

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
		<Root>
			<Form
				labelCol={{
					span: 8,
				}}
				wrapperCol={{
					span: 16,
				}}
				form={form}
				onValuesChange={(_, values) => {
					engine.setElementProps(element, values);
				}}
			>
				<div>基本信息</div>
				<Form.Item label="id">
					<Input
						disabled
						value={engine.selectedId}
					/>
				</Form.Item>
				<div>组件配置</div>
				{renderSetters()}
			</Form>
		</Root>
	);
});

export default ConfigPanel;
