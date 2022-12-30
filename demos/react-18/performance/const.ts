import ShouldComponentUpdate from './scripts/shouldComponentUpdate';
import ShouldComponentUpdateContrast from './scripts/shouldComponentUpdate/contrast';

import PureComponent from './scripts/PureComponent';

export const SCRIPT_LIST = [
  {
    label: 'ShouldComponentUpdate',
    el: ShouldComponentUpdate, // 实验组
    contrast: ShouldComponentUpdateContrast,
  },
  {
    label: 'PureComponent',
    el: PureComponent, // 对照组
    contrast: ShouldComponentUpdateContrast,
  },
];
