<<<<<<< Updated upstream
import React, { useMemo } from 'react';
=======
import React, { useEffect, useMemo } from 'react';
>>>>>>> Stashed changes
import styled from 'styled-components';
import { Empty, Table, TableProps } from '@arco-design/web-react';
import { ElementProps } from '../../renderer/types/element';

interface ITableProps extends ElementProps<TableProps> {}

const Root = styled(Table)``;

const TableComponent: React.FC<ITableProps> = (props) => {
  const { componentConfig } = props;
  const { columns, data } = componentConfig ?? {};

<<<<<<< Updated upstream
  const tableData = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return [];
    }

    return data;
  }, [data]);

  return columns ? (
    <Root columns={columns} data={tableData} />
  ) : (
    // <Root
    // 	columns={columns}
    // 	data={[]}
    // />
    <Empty description="请先定义列" />
  );
=======
	const tableData = useMemo(() => {
		if (Array.isArray(data)) {
			return data;
		}

		return [];
	}, [data]);

	useEffect(() => {
		throw new Error('123');
	}, []);

	return columns ? (
		<Root
			columns={columns}
			data={tableData}
		/>
	) : (
		<Empty description="请先定义列" />
	);
>>>>>>> Stashed changes
};

export default TableComponent;
