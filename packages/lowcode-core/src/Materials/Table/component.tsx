import React from 'react';
import styled from 'styled-components';
import { Empty, Table, TableProps } from '@arco-design/web-react';
import { ElementProps } from '../../renderer/types/element';

interface ITableProps extends ElementProps<TableProps> {}

const Root = styled(Table)``;

const TableComponent: React.FC<ITableProps> = (props) => {
	const { componentConfig } = props;
	const {
		columns,
		// , data
	} = componentConfig ?? {};

	return columns ? (
		// <Root columns={columns} data={data} />
		<Root
			columns={columns}
			data={[]}
		/>
	) : (
		<Empty description="请先定义列" />
	);
};

export default TableComponent;
