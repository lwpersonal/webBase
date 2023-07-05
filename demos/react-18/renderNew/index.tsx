import React, { useEffect } from 'react';
import { Space } from 'antd';
import ReactDOM from 'react-dom/client';

import HooksCom from '../components/HooksCom';
import ClassCom from '../components/ClassCom';

import './index.less';
import 'antd/dist/antd.css';

function TestEl(props) {
  // useEffect(() => {
  //   console.log('test el props ', props.type);
  // }, [props.type]);
  return <div>test el {props.type}</div>;
}

class App extends React.Component {
  render() {
    return (
      <div className="wrap">
        <TestEl type="react" />
        {TestEl({ type: 'fun' })}
        <Space>
          function: <HooksCom />
        </Space>
        <br />
        <Space>
          class: <ClassCom />
        </Space>
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />,
);
