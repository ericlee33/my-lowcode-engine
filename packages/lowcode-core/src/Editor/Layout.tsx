import React, { useState } from 'react';
import styled from 'styled-components';

import MaterialPanel from './panels/Left/Material';
import DataSource from './panels/Left/DataSource';
import RightPanels from './panels/Right';
import '@arco-design/web-react/dist/css/arco.css';
import { Button, Tabs, ResizeBox } from '@arco-design/web-react';
import {
	IconStorage,
	IconApps,
	IconSettings,
} from '@arco-design/web-react/icon';
import SourceCodePanel from './panels/Left/SourceCode';
import '@arco-design/theme-line/index.less';
import { Editor } from './model/editor';
import Renderer from '../renderer';

interface IEditorProps {
	className?: string;
	style?: React.CSSProperties;
	editor: Editor;
}

const Root = styled.div`
	height: 100vh;
	width: 100vw;

	.header {
		width: 100%;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #e1e1e1;

		.logo {
			margin-left: 4px;
			color: #b0b0b0;
			background: radial-gradient(
				495.98% 195.09% at 144.79% 10.71%,
				#ff8a01 0,
				#b051b9 22.37%,
				#672bff 45.54%,
				#06f 99.99%
			);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			font-size: 20px;
		}

		.btns {
			margin-right: 20px;
		}
	}
`;

const StyledTabs = styled(Tabs)`
	.arco-tabs-header-title {
		padding: 2px 10px !important;
		font-size: 16px !important;
	}
`;

const Layout: React.FC<IEditorProps> = (props) => {
	const { editor } = props;

	const panels = [
		{
			min: 0.2,
			size: 0.2,
			max: 0.5,
			content: (
				<StyledTabs
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
							editor={editor}
						/>
					</Tabs.TabPane>
					{/* <IconOrderedList /> */}
					<Tabs.TabPane
						key="dataSource"
						title={<IconStorage />}
					>
						<DataSource
							style={{
								marginTop: '10px',
							}}
							editor={editor}
						/>
					</Tabs.TabPane>
					<Tabs.TabPane title={<IconSettings />}>
						<SourceCodePanel editor={editor} />
					</Tabs.TabPane>
				</StyledTabs>
			),
		},
		{
			size: 0.6,
			content: <Renderer editor={editor} />,
		},
		{
			min: 0.2,
			size: 0.2,
			max: 0.3,
			content: <RightPanels editor={editor} />,
		},

		// <div className="center">
		// </div>,
		// <div className="right">
		// <RightPanels editor={editor} />,
		// </div>,
	];

	return (
		<Root>
			<div className="header">
				<span className="logo">Eric's Low Code</span>
				<span className="btns">
					<Button
						type="outline"
						onClick={() => {}}
					>
						预览
					</Button>
				</span>
			</div>
			{/* <div className="editor-area"> */}
			<ResizeBox.SplitGroup
				className="editor-area"
				style={{
					// height: 200,
					// width: 500,
					// border: '1px solid var(--color-border)',
					height: '100%',
				}}
				panes={panels}
			/>
			{/* </div> */}
		</Root>
	);
};

export default Layout;
