import React, { useEffect, useRef, useState } from 'react';
import { Element, Editor } from '../editor/model/editor';
import Materials from '../materials';
import { observer } from 'mobx-react-lite';
import DropWrapper from '../editor/core/DropWrapper';
import { ElementProps } from './types/element';
import { Engine } from './model/engine';
import SchemasParser from './core/SchemasParser';
import { Spin } from '@arco-design/web-react';

export type IRendererProps = {
	/** 编辑器内使用 */
	inEditor?: boolean;
	/** dsl */
	rootSchema: Editor['rootSchema'];
};

const Renderer: React.FC<IRendererProps> = observer((props) => {
	const [ready, setReady] = useState(false);
	const engine = useRef<Engine>();

	const initEngine = async () => {
		if (!engine.current) {
			engine.current = new Engine(props);
		}
		await engine.current.dataSource.init();
		setReady(true);
	};

	useEffect(() => {
		initEngine();
	}, []);

	return !ready ? (
		<Spin
			block
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		/>
	) : (
		<SchemasParser
			{...props}
			engine={engine.current}
		/>
	);
});

export default Renderer;
