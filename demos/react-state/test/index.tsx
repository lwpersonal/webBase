import React from 'react';
import ReactDOM from 'react-dom/client';

import HooksCom from './components/hooksCom';
import ClassCom from './components/classCom';

import InputTest from './components/InputTest';

import './index.less';
import 'antd/dist/antd.css';

class App extends React.Component {
  render() {
    return (
      <div className='wrap'>
        <HooksCom />
        <ClassCom />

        <InputTest />
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
