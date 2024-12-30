import React from 'react';
import JSONEditor, {
	IJsonEditorProps,
} from '../../../../../components/Monaco/JsonEditor';

interface IJsonSetterProps extends IJsonEditorProps {
	className?: string;
	style?: React.CSSProperties;
	onChange?: (value: Record<string, any>) => void;
	value?: Record<string, any>;
}

const JsonSetter: React.FC<IJsonSetterProps> = (props) => {
	const { onChange, value, ...rest } = props;

	return (
		<JSONEditor
			editorProps={{
				height: 200,
			}}
			onChange={onChange}
			value={value}
			{...rest}
		/>
	);
};

export default JsonSetter;
