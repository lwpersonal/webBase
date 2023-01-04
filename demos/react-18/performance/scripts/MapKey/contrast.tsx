import React from 'react';
import type { TCommonProps } from '../../interface';

const MapKeyEL: React.FC<TCommonProps> = props => {
  const { list } = props;

  return (
    <div>
      {list.map((item, index) => (
        <p key={index}>item - {item.id}</p>
      ))}
    </div>
  );
};

export default MapKeyEL;
