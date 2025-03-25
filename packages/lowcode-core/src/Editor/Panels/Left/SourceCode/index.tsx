import React from 'react';
import JSONEditor from '../../../../components/Monaco/JsonEditor';
import { observer } from 'mobx-react-lite';
import { Editor as EditorModel } from '../../../model/editor';

interface ISourceCodeProps {
  className?: string;
  style?: React.CSSProperties;
  editor: EditorModel;
}

const SourceCode: React.FC<ISourceCodeProps> = observer((props) => {
  const { editor } = props;

  const onChange = (value) => {
    editor.schemas.reset(value?.schemas || []);
  };

  const value = editor.rootSchema;

  return (
    <JSONEditor
      editorProps={{ height: '93vh' }}
      value={value}
      onChange={onChange}
    />
  );
});

export default SourceCode;
