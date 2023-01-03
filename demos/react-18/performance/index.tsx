import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Card, Empty, Button, Select, Space } from 'antd';
import { Map } from 'immutable';
import type { TRenderData } from './interface';

import ShouldComponentUpdate from './scripts/shouldComponentUpdate';
import ShouldComponentUpdateContrast from './scripts/shouldComponentUpdate/contrast';

import PureComponent from './scripts/PureComponent';
import PureComponentContrast from './scripts/PureComponent/contrast';

import Memo from './scripts/memo';
import MemoContrast from './scripts/memo/contrast';

import Immutable from './scripts/immutable';

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
  const [renderDataImmutable, setRenderDataImmutable] = useState({
    name: defaultKey,
    extra: new Date().getTime(),
    other: Map({
      count: 0,
      info: { age: 14 },
    }),
  });
  const onChange = value => {
    setActiveKey(value);
    setRenderData(pre => ({ ...pre, name: value }));
    setRenderDataImmutable(pre => ({ ...pre, name: value }));
  };

  const buttonEls = [
    // 0
    <Button
      type="primary"
      key="name"
      onClick={() =>
        setRenderData(pre => ({
          ...pre,
          name: `${pre.name.split('_')[0]}_${new Date().getTime()}`,
        }))
      }
    >
      change props.name
    </Button>,
    // 1
    <Button
      type="primary"
      key="extra"
      onClick={() =>
        setRenderData(pre => ({
          ...pre,
          extra: new Date().getTime(),
        }))
      }
    >
      change props.extra
    </Button>,
    // 2
    <Button
      type="primary"
      key="other"
      onClick={() =>
        setRenderData(pre => ({
          ...pre,
          other: { count: pre.other.count + 1 },
        }))
      }
    >
      change props.other
    </Button>,
    // 3
    <Button
      type="primary"
      key="other.count"
      onClick={() =>
        setRenderData(pre => {
          const other = pre.other;
          other.count += 1;
          return {
            ...pre,
            other,
          };
        })
      }
    >
      change props.other.count
    </Button>,
    // 4
    <Button
      type="primary"
      key="props"
      onClick={() => setRenderData(pre => ({ ...pre }))}
    >
      change props
    </Button>,
    // 5
    <Button
      type="primary"
      key="reload"
      onClick={() => window.location.reload()}
    >
      reload
    </Button>,
    // 6
    <Button
      type="primary"
      key="immutableOtherCount"
      onClick={() =>
        setRenderDataImmutable(pre => ({
          ...pre,
          other: pre.other.update('count', () => 1),
        }))
      }
    >
      [immutable] change props.other.count
    </Button>,
    // 7
    <Button
      type="primary"
      key="immutableOtherInfoAge"
      onClick={() =>
        setRenderDataImmutable(pre => ({
          ...pre,
          other: pre.other.updateIn(['info', 'age'], v =>
            typeof v === 'number' ? v + 1 : 19,
          ),
        }))
      }
    >
      [immutable] change props.other.info.age
    </Button>,
  ];

  const SCRIPT_LIST = [
    {
      label: 'ShouldComponentUpdate',
      el: ShouldComponentUpdate, // 实验组
      contrast: ShouldComponentUpdateContrast, // 对照组
      btnIndex: [0, 1, 2, 3, 4, 5],
      props: renderData,
    },
    {
      label: 'PureComponent',
      el: PureComponent,
      contrast: PureComponentContrast,
      btnIndex: [0, 1, 2, 3, 4, 5],
      props: renderData,
    },
    {
      label: 'Memo',
      el: Memo,
      contrast: MemoContrast,
      btnIndex: [0, 1, 2, 3, 4, 5],
      props: renderData,
    },
    {
      label: 'immutable',
      el: Immutable,
      btnIndex: [6, 7, 5],
      props: {
        ...renderDataImmutable,
      },
    },
  ];
  const activeConfigItem = SCRIPT_LIST.find(item => item.label === activeKey);

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
            {activeConfigItem.btnIndex.map(index => buttonEls[index])}
          </Space>
          <div className="components-content">
            <Card
              size="small"
              className="components-content-card"
              title="实验组"
            >
              {React.createElement(activeConfigItem.el, {
                ...activeConfigItem.props,
                mark: '1', // 实验组
              })}
            </Card>

            {activeConfigItem.contrast && (
              <Card
                size="small"
                className="components-content-card"
                title="对照组"
              >
                {React.createElement(activeConfigItem.contrast, {
                  ...activeConfigItem.props,
                  mark: '2', // 对照组
                })}
              </Card>
            )}
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
