import React, { useState } from 'react';
import { Button, Space } from 'antd';
import RenderEl from './common/Render';

export default function HooksCom() {
  const [count, setCount] = useState(0);

  const handlerClick = () => {
    setCount(count + 1);
    console.log(count);

    setTimeout(() => {
      console.log(count);
      setCount(count + 3);
      console.log(count);
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
        <p key={count + 'function'}>
          count: {count}
          <RenderEl />
        </p>
      </Space>
    </div>
  );
}
