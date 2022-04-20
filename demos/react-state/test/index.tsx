import { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Button, Space } from 'antd';

import './index.less';
import 'antd/dist/antd.css';

function App() {
  const [count, setCount] = useState(0);
  const handlerClick2 = () => {
    setCount(count + 1);
    setCount(count + 2);
  };
  const handlerClick = () => {
    setCount(count + 1);
    setCount(count + 2);
    setTimeout(() => {
      setCount(count + 4);
    }, 0);
    handlerClick2();
  };
  return (
    <div>
      <Space>
        <p>count: {count}</p>
        <Button onClick={handlerClick}>useState click</Button>
      </Space>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
