import React from 'react';
import ReactDOM from 'react-dom/client';

import HooksCom from './components/hooksCom';
import ClassCom from './components/classCom';

import './index.less';
import 'antd/dist/antd.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <HooksCom />
        <ClassCom />
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
