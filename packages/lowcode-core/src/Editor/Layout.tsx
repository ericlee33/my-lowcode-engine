import React, { useState } from 'react';
import styled from 'styled-components';

import Canvas from './Panels/Canvas';
import MaterialPanel from './Panels/Left/Material';
import RightPanels from './Panels/Right';
import '@arco-design/web-react/dist/css/arco.css';
import { Button, Tabs } from '@arco-design/web-react';
import { IconApps, IconSettings } from '@arco-design/web-react/icon';
import SourceCodePanel from './Panels/Left/SourceCode';
import '@arco-design/web-react/dist/css/arco.css';
import { $$_editor_json_schema } from './constants/cache';
import { useSchemaContext } from './store/SchemaContext';
import EngineCore from '../core/model/EngineCore';
import Renderer from '../Renderer';

interface IEditorProps {
	className?: string;
	style?: React.CSSProperties;
	engineCore: EngineCore;
}

const Root = styled.div`
	height: 100vh;
	width: 100vw;

	.header {
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #e1e1e1;

		.logo {
			color: #1da;
			font-size: 20px;
		}

		.btns {
			margin-right: 20px;
		}
	}

	.editor-area {
		display: flex;

		.left {
			width: 300px;
			.arco-tabs-header-title {
				padding: 8px 14px !important;
				font-size: 18px !important;
			}
			.arco-tabs-content-vertical {
				padding-left: 0;
			}
		}

		.center {
			min-height: 100vh;
			flex: 1;
		}

		.right {
			width: 280px;
		}

		.arco-tabs {
			height: 100%;
		}
	}
`;

const Editor: React.FC<IEditorProps> = (props) => {
	const { engineCore } = props;

	const onClear = () => {
		localStorage.setItem($$_editor_json_schema, JSON.stringify([]));
	};

	return (
		<Root>
			<div className="header">
				<span className="logo">Eric's Low Code</span>
				<span className="btns">
					<Button
						type="primary"
						onClick={() => {}}
					>
						预览
					</Button>
				</span>
			</div>
			<div className="left"></div>
			<div className="editor-area">
				<div className="left">
					<Tabs
						defaultActiveTab="material"
						tabPosition="left"
						size="large"
					>
						<Tabs.TabPane
							key="material"
							title={<IconApps />}
						>
							<MaterialPanel
								style={{
									marginTop: '10px',
								}}
							/>
							<div
								onClick={() => {
									onClear();
									schema.reset();
								}}
							>
								清空
							</div>
						</Tabs.TabPane>
						<Tabs.TabPane title={<IconSettings />}>
							<SourceCodePanel engineCore={engineCore} />
						</Tabs.TabPane>
					</Tabs>
				</div>
				<div className="center">
					<Renderer engineCore={engineCore} />
					{/* <Canvas
						schema={schema}
						// onSave={onSave}
					/> */}
				</div>
				<div className="right">
					<RightPanels />
				</div>
			</div>
		</Root>
	);
};

export default Editor;
