import React, { useState } from 'react';
import { Button, Space } from 'antd';

export default function HooksCom() {
  const [count, setCount] = useState(0);

  const handlerClick = () => {
    // debugger;
    console.log(1111);
    setCount(() => count + 1);
    console.log(count);

    setTimeout(() => {
      console.log(333);
      console.log(count);
      setCount(count + 3);
      setCount(count + 4);
      console.log(count);
      console.log('---------');
    }, 0);

    console.log(2222);
    setCount(count + 2);
    console.log(count);
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
