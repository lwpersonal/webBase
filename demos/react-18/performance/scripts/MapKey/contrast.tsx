import React from 'react';
import { Input } from 'antd';
import type { TCommonProps } from '../../interface';

const MapKeyEL: React.FC<TCommonProps> = props => {
  const { list } = props;

  return (
    <div>
      {list.map((item, index) => (
        <div key={index}>
          <p>item - {item.id}</p>
          <Input />
        </div>
      ))}
    </div>
  );
};

export default MapKeyEL;
