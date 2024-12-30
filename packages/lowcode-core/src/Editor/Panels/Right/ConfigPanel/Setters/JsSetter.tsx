import React from 'react';
import Editor, {
	IJsEditorProps,
} from '../../../../../components/Monaco/JsEditor';
import { Modal, Button } from '@arco-design/web-react';

interface IJsSetterProps extends IJsEditorProps {
	className?: string;
	style?: React.CSSProperties;
}

const JsSetter: React.FC<IJsSetterProps> = (props) => {
	const [modal, holder] = Modal.useModal();
	const { onChange, value, ...rest } = props;

	const onOpen = () => {
		modal.info({
			title: 'js 函数',
			content: (
				<Editor
					editorProps={{
						height: 200,
						language: 'typescript',
					}}
					onChange={onChange}
					value={value}
					{...rest}
				/>
			),
		});
	};

	return (
		<>
			<Button
				type="primary"
				onClick={onOpen}
			>
				编辑 JS 函数
			</Button>
			{holder}
		</>
	);
};

export default JsSetter;
