import React, { useState } from 'react';
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
    extra: new Date().getTime(),
  });
  const activeConfigItem = SCRIPT_LIST.find(item => item.label === activeKey);
  const commonProps = {
    name: renderData?.name,
  };
  const onChange = value => {
    setActiveKey(value);
    setRenderData(pre => ({ ...pre, name: value }));
  };

  const onChangeActivePropsName = () => {
    setRenderData(pre => ({
      ...pre,
      name: `${pre.name.split('_')[0]}_${new Date().getTime()}`,
    }));
  };

  const onChangeActivePropsExtra = () => {
    setRenderData(pre => ({
      ...pre,
      extra: new Date().getTime(),
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
          showSearch
          onChange={onChange}
          value={activeKey}
        />
      }
    >
      {activeConfigItem?.el ? (
        <div className="components-container">
          <Space>
            <Button type="primary" onClick={onChangeActivePropsName}>
              change active props.name
            </Button>
            <Button type="primary" onClick={onChangeActivePropsExtra}>
              change not active props.name
            </Button>
            <Button type="primary" onClick={() => window.location.reload()}>
              reload
            </Button>
          </Space>
          <div className="components-content">
            <Card
              size="small"
              className="components-content-card"
              title="实验组"
            >
              {React.createElement(activeConfigItem.el, {
                ...commonProps,
                mark: '1', // 实验组
              })}
            </Card>

            <Card
              size="small"
              className="components-content-card"
              title="对照组"
            >
              {React.createElement(activeConfigItem.contrast, {
                ...commonProps,
                mark: '2', // 对照组
              })}
            </Card>
          </div>
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
