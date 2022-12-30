import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Card, Empty, Button, Select, Space } from 'antd';
import { SCRIPT_LIST } from './const';

import 'antd/dist/antd.css';
import './index.less';

const defaultKey = 'ShouldComponentUpdate';

function ComponentsTabs() {
  const [activeKey, setActiveKey] = useState(defaultKey);
  const [renderData, setRenderData] = useState({
    name: defaultKey,
  });
  const activeConfigItem = SCRIPT_LIST.find(item => item.label === activeKey);
  const onChange = value => {
    setActiveKey(value);
    setRenderData(pre => ({ ...pre, name: value }));
  };

  const onChangeActiveProps = () => {
    setRenderData(pre => ({
      ...pre,
      name: `${pre.name.split('_')[0]}_${new Date().getTime()}`,
    }));
  };

  return (
    <Card
      title="React 渲染调试"
      extra={
        <Select
          style={{ width: 240 }}
          placeholder="请选择渲染组件"
          options={SCRIPT_LIST.map(item => ({
            label: item.label,
            value: item.label,
          }))}
          onChange={onChange}
          value={activeKey}
        />
      }
    >
      {activeConfigItem?.el ? (
        <div>
          <Space>
            <Button onClick={onChangeActiveProps}>
              change active props.name
            </Button>
            <Button onClick={onChangeActiveProps}>
              change !active props.name
            </Button>
          </Space>
          <div style={{ margin: '15px 0 0' }}></div>
          {React.createElement(activeConfigItem.el, {
            name: renderData?.name,
          })}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Card>
  );
}

class App extends React.Component {
  render() {
    return (
      <div className="wrap">
        <ComponentsTabs />
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />,
);
