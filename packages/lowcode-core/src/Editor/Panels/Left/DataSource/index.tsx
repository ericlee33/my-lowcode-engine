import React from 'react';
import { List, Button, Popover } from '@arco-design/web-react';
import { IconDelete } from '@arco-design/web-react/icon';
import RegisterDataSource from './RegisterDataSource';
import { useEditor } from '../../../hooks/useEditor';
import { observer } from 'mobx-react-lite';

interface IDataSourceProps {}

const DataSource: React.FC<IDataSourceProps> = observer((props) => {
  const { editor } = useEditor();

  const render = (actions, item, index) => (
    <List.Item key={index} actions={actions}>
      <List.Item.Meta title={item.name} />
      <IconDelete
        onClick={() => {
          editor.dataSource.remove(item.id);
        }}
      />
    </List.Item>
  );
  console.log(editor.dataSource.value, 'value.value');

  return (
    <div
      style={{
        paddingRight: 6,
      }}
    >
      <Popover
        trigger="click"
        position="right"
        title={'添加数据源'}
        content={<RegisterDataSource />}
        triggerProps={{
          popupStyle: {
            width: 500,
          },
        }}
      >
        <Button
          style={{
            marginTop: 10,
          }}
          type="outline"
          size="mini"
        >
          添加数据源
        </Button>
      </Popover>
      <List
        className="list-demo-actions"
        style={{ marginBottom: 48, marginTop: 10 }}
        dataSource={editor.dataSource.value.map((item) => ({ ...item }))}
        render={render.bind(null, [
          // <span className='list-demo-actions-icon'>
          //   <IconEdit />
          // </span>,
          // <span className='list-demo-actions-icon'>
          //   <IconDelete />
          // </span>,
        ])}
      />
    </div>
  );
});

export default DataSource;
