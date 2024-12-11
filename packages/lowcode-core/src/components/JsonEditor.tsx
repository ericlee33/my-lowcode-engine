import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Editor, { EditorProps } from '@monaco-editor/react';
import { omit } from 'lodash-es';

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

loader.config({ monaco });

export interface IJsonEditorProps {
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: Record<string, any>) => void;
  value?: Record<string, any>;
  editorProps?: EditorProps;
}

const Root = styled.div``;

const JsonEditor: React.FC<IJsonEditorProps> = (props) => {
  const {
    className,
    style,
    value: _value,
    onChange: _onChange,
    editorProps,
  } = props;

  const [ready, setReady] = useState(false);
  useEffect(() => {
    loader.init().then(() => setReady(true));
  }, []);

  const onChange = (value) => {
    try {
      const objectValue = JSON.parse(value);
      _onChange?.(objectValue);
    } catch {
      console.error('Json Editor 解析异常');
    }
  };

  const mergedEditorProps = useMemo(() => {
    const defaultOptions: EditorProps['options'] = {
      lineNumbers: 'off',
      glyphMargin: false,
      tabSize: 2,
      wordWrap: 'on',
      lineDecorationsWidth: 0,
      lineNumbersMinChars: 0,
      selectOnLineNumbers: true,
      scrollBeyondLastLine: false,
      folding: true,
      minimap: {
        enabled: false,
      },
      contextmenu: false,
    };

    const options = {
      ...defaultOptions,
      ...editorProps,
    };

    return {
      language: 'json',
      options,
      ...omit(editorProps, ['options']),
    };
  }, [editorProps]);

  const value = useMemo(() => {
    return JSON.stringify(_value, null, 2);
  }, [_value]);

  return (
    <Root className={className} style={style}>
      {!ready ? (
        'loading'
      ) : (
        <Editor {...mergedEditorProps} onChange={onChange} value={value} />
      )}
    </Root>
  );
};

export default JsonEditor;
