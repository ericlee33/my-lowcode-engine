import React from 'react';
import { List } from '@arco-design/web-react';

interface IDataSourceProps {}

const DataSource: React.FC<IDataSourceProps> = (props) => {
  const dataSource = new Array(1).fill({
    title: '数据源1',
    description: '描述信息',
  });
  const render = (actions, item, index) => (
    <List.Item key={index} actions={actions}>
      <List.Item.Meta title={item.title} />
    </List.Item>
  );

  return (
    <List
      className="list-demo-actions"
      style={{ width: 700, marginBottom: 48 }}
      dataSource={dataSource}
      render={render.bind(null, [
        // <span className='list-demo-actions-icon'>
        //   <IconEdit />
        // </span>,
        // <span className='list-demo-actions-icon'>
        //   <IconDelete />
        // </span>,
      ])}
    />
  );
};

export default DataSource;
