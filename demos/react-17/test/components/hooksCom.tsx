import React, { useState } from 'react';
import { Button, Space } from 'antd';

export default function HooksCom() {
  const [count, setCount] = useState(0);

  const handlerClick = () => {
    // debugger;
    setCount(count + 1);
    console.log(count);

    setTimeout(() => {
      console.log(count);
      setCount(count + 3);
      setCount(count + 4);
      console.log(count);
      console.log('---------');
    }, 0);

    setCount(count + 2);
    console.log(count);
  };
  return (
    <div>
      <Space>
        <Button onClick={handlerClick}>useState click</Button>
        <p>count: {count}</p>
      </Space>
    </div>
  );
}
