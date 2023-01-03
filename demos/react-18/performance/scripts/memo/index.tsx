import React from 'react';
import type { TCommonProps } from '../../interface';

let i = 0;
const MemoEl: React.FC<TCommonProps> = props => {
  const { mark, name } = props;

  i++;
  console.log(`「${mark}」render ${name}`);
  return (
    <div>
      <p>
        「{mark}」{name}
      </p>
      <p>「render 次数」{i}</p>
      <p>props: {JSON.stringify(props, null, 2)}</p>
    </div>
  );
};

export default React.memo(MemoEl);
