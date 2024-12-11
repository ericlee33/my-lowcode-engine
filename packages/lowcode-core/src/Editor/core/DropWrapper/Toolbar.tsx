import React from 'react';
import { IconDelete } from '@arco-design/web-react/icon';
import styled from 'styled-components';
import { useEditor } from '../../hooks/useEditor';

const Root = styled.div`
	position: absolute;
	top: -16px;
	height: 14px;
	z-index: 1;
	display: flex;
	align-items: center;
	border: 1px solid #333;
	left: -1px;
	cursor: pointer;
`;

interface IToolbar {}

const Toolbar: React.FC<IToolbar> = (props) => {
	const { editor } = useEditor();
	const onDelete = () => {
		editor.schemas.remove(editor.canvas.selectedId);
	};

	return (
		<Root>
			<IconDelete
				onClick={onDelete}
				style={{
					color: 'red',
					background: '#fff',
				}}
			/>
		</Root>
	);
};

export default Toolbar;
