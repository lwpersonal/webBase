import React from 'react';
import { Space } from 'antd';
import ReactDOM from 'react-dom';

import HooksCom from './components/hooksCom';
import ClassCom from './components/classCom';

import InputTest from './components/InputTest';

import './index.less';
import 'antd/dist/antd.css';

class App extends React.Component {
  render() {
    return (
      <div className="wrap">
        <Space>
          function: <HooksCom />
        </Space>
        <br />
        <Space>
          class: <ClassCom />
        </Space>
        <InputTest />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
