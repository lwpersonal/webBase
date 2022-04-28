import React from 'react';
import { Space } from 'antd';
import ReactDOM from 'react-dom/client';

import HooksCom from '../components/HooksCom';
import ClassCom from '../components/ClassCom';

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
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
