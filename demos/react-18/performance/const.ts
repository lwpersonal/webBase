import ShouldComponentUpdate from './scripts/shouldComponentUpdate';
import ShouldComponentUpdateContrast from './scripts/shouldComponentUpdate/contrast';

import PureComponent from './scripts/PureComponent';
import PureComponentContrast from './scripts/PureComponent/contrast';

import Memo from './scripts/memo';
import MemoContrast from './scripts/memo/contrast';

export const SCRIPT_LIST = [
  {
    label: 'ShouldComponentUpdate',
    el: ShouldComponentUpdate, // 实验组
    contrast: ShouldComponentUpdateContrast, // 对照组
  },
  {
    label: 'PureComponent',
    el: PureComponent,
    contrast: PureComponentContrast,
  },
  {
    label: 'Memo',
    el: Memo,
    contrast: MemoContrast,
  },
];
