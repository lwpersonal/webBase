import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Card, Empty, Button, Select, Space } from 'antd';
import { SCRIPT_LIST } from './const';
import type { TRenderData } from './interface';

import 'antd/dist/antd.css';
import './index.less';

const defaultKey = 'ShouldComponentUpdate';

function ComponentsTabs() {
  const [activeKey, setActiveKey] = useState(defaultKey);
  const [renderData, setRenderData] = useState<TRenderData>({
    name: defaultKey,
    extra: new Date().getTime(),
    other: {
      count: 0,
    },
  });
  const activeConfigItem = SCRIPT_LIST.find(item => item.label === activeKey);
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

  const onChangeActivePropsOther = () => {
    setRenderData(pre => ({
      ...pre,
      other: { count: pre.other.count + 1 },
    }));
  };

  const onChangeActivePropsOtherCount = () => {
    setRenderData(pre => {
      const other = pre.other;
      other.count += 1;
      return {
        ...pre,
        other,
      };
    });
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
              change active props.extra
            </Button>

            <Button type="primary" onClick={onChangeActivePropsOther}>
              change active props.other
            </Button>

            <Button type="primary" onClick={onChangeActivePropsOtherCount}>
              change active props.other.count
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
                ...renderData,
                mark: '1', // 实验组
              })}
            </Card>

            <Card
              size="small"
              className="components-content-card"
              title="对照组"
            >
              {React.createElement(activeConfigItem.contrast, {
                ...renderData,
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
