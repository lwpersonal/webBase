import { getDataType } from './utils';
import type {
  IFuncOptions,
  ICycleHandleOptions,
  IHandleAnimateBeforeOptions,
} from './interface';

const MARK = 'animate-el';
const REGEXP_LIST = {
  empty: /^\s+/,
  comment: /^(\/\*)(((?!\*\/)[\s\S])+)(\*\/)/,
  text: /[^\n]+/, // 非换行的多个字符
  CSS: /^\S+\s*{\s*([a-z-]+\s*:(\s*[^{};\s]+\s*)+;\s*)*}/,
  CSSDetail: {
    // css 拆解
    selector: /^[^{\s]+/, // 选择器
    attrs: /^{\s*([a-z-]+\s*:(\s*[^{};\s]+\s*)+;\s*)*}/, // { 属性 }
  },
  CSSAttrDetail: {
    // css 属性拆解
    start: /^{/,
    end: /^}/,
    attr: /^([a-z-]+\s*:(\s*[^{};\s]+\s*)+;){1}/,
    isAttrKey: /^[a-z-]+\s*:/,
    attrKey: /^[a-z-]+/,
    colon: /^:/,
    isAttrVal: /^(\s*[^{};\s]+\s*)+;/,
    attrVal: /^(\s*[^{};\s]+\s*)+/,
    semicolon: /^;/,
  },
};
const DEFAULT_OPTIONS = {
  cursor: true,
  speed: 150,
  delay: 1500,
  delayVal: ['.', '!'],
};

/**
 * 创建 html 标签
 */
function createNode(elType: string, attrs: { [key: string]: string | object }) {
  const el = document.createElement(elType);
  Object.entries(attrs).forEach(([key, val]) => {
    if (key === 'data' && getDataType(val) === 'object') {
      Object.entries(val).forEach(([dataKey, dataVal]) => {
        el.dataset[dataKey] = dataVal;
      });
    } else if (typeof val === 'string') {
      el.setAttribute(key, val);
    }
  });
  return el;
}

/**
 * 实时添加 style 样式
 */
function pushStyle(styleStr: string) {
  // 将样式添加到 header style 中
  let styleEl = document.head.getElementsByTagName('style')[0];
  if (!styleEl) {
    styleEl = document.createElement('style');
    document.head.append(styleEl);
  }
  const styleTextEl = document.createTextNode(styleStr);
  styleEl.append(styleTextEl);
}

export default class Func {
  private pause: boolean; // 暂停控制
  private fns: (() => any)[]; // 动态输入文本的处理队列，放入队列中方便进行暂停等自定义操作
  public options: IFuncOptions;
  public root: Element;

  constructor(options: IFuncOptions) {
    const { el } = options;
    this.fns = [];
    this.pause = false;
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };
    const root = document.querySelector(el);
    if (!root) {
      throw new Error('请传入正确的 el 节点');
    }
    this.root = root;
    this.#init(options);
  }

  /**
   * 初始化
   */
  #init = (options: IFuncOptions) => {
    const { el } = options;
    this.#initStyle(el);
  };

  /**
   * 初始化样式
   */
  #initStyle = (el: string) => {
    const initStyleStr = `
    @keyframes flashing {
      form {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }

    ${el} {
      white-space: pre-wrap;
    }
    .${MARK}-cursor-flashing::after {
      content: '_';
      display: inline-block;
      animation-name: flashing;
      animation-iteration-count: infinite;
      animation-timing-function: cubic-bezier(1, 0, 0, 1);
      animation-duration: 1s;
    }
    `;
    pushStyle(initStyleStr);
  };

  /**
   * 函数延时执行
   */
  #delayFn = (time: number, fn: () => any) => {
    const _this = this;
    return new Promise(r => {
      setTimeout(() => {
        r(fn.call(_this));
      }, time);
    });
  };

  /**
   * next 执行队列中的函数
   */
  #next = (delay?: number) => {
    const itemFn = this.fns.shift();
    typeof itemFn === 'function' &&
      (typeof delay === 'number' ? setTimeout(itemFn, delay) : itemFn());
  };

  /**
   * 动态输出文本到 html
   * delaySta 是否控制输出延迟，只有注释和文本需要延时
   */
  #animateAppendText = (str: string, el: Element, delaySta: boolean) => {
    if (!str) {
      return;
    }
    const textEl = document.createTextNode('');
    this.fns.push(() => {
      el.append(textEl);
      this.#next();
    });
    const { speed, delay, delayVal } = this.options;
    const len = str.length;
    let posit = 0;
    while (posit < len) {
      const text = str[posit];
      if (!text) {
        break;
      }
      posit += 1;
      this.fns.push(() => {
        this.#delayFn(speed, () => {
          textEl.appendData(text);
          // 遇到延时字符时，延迟执行 next
          const time =
            delaySta && delayVal.includes(text) ? delay - speed : undefined;
          this.#next(time);
        });
      });
    }
  };

  /**
   * 递归解析
   */
  #cycleHandle = (str: string, options: ICycleHandleOptions) => {
    const { handleArr, root, cb } = options;
    if (typeof str !== 'string' || str.length <= 0) {
      // str 为空时，结束递归
      return typeof cb === 'function' ? cb() : void 0;
    }
    const len = handleArr.length;
    for (let i = 0; i < len; i++) {
      const item = handleArr[i];
      if (item.match(str)) {
        const unformattedStr = item.action(str, root);
        this.#cycleHandle(unformattedStr, options);
        break;
      }
    }
  };

  /**
   * 动态输出前置操作
   * regexp 匹配对应的正则
   * htmlType 容器 html 的类型
   * className 容器 class
   * handleFn 继续进行深度处理，不调用 animateAppendText 函数
   * el 父节点
   * delaySta 是否判断暂停
   * addCursorFlashing 是否添加末尾闪烁光标
   */
  #handleAnimateBefore = (
    str: string,
    options: IHandleAnimateBeforeOptions
  ) => {
    const { cursor } = this.options;
    const {
      el,
      regexp,
      htmlType,
      className = '',
      handleFn,
      delaySta,
      addCursorFlashing,
    } = options;
    let matchStr;
    const unformattedStr = str.replace(regexp, (match: string) => {
      matchStr = match;
      return '';
    });

    if (matchStr) {
      let animateEl = el;
      if (htmlType) {
        // 如果 htmlType 不为空，创建 html 标签，否则继续使用 el
        animateEl = createNode(htmlType, { className });
        cursor &&
          addCursorFlashing &&
          this.fns.push(() => {
            animateEl.className += `${animateEl.className} ${MARK}-cursor-flashing`;
            this.#next();
          });
        this.fns.push(() => {
          el.append(animateEl);
          this.#next();
        });
      }
      // 如果 handleFn 为函数，继续处理不输出动画
      if (typeof handleFn === 'function') {
        handleFn(matchStr, animateEl);
      } else {
        this.#animateAppendText(matchStr, animateEl, delaySta);
      }
      cursor &&
        addCursorFlashing &&
        this.fns.push(() => {
          animateEl.className = animateEl.className.replace(
            `${MARK}-cursor-flashing`,
            ''
          );
          this.#next();
        });
    }

    return [matchStr, unformattedStr];
  };

  /**
   * 注释处理
   */
  #handleComment = (str: string, root: Element) => {
    const [, unformattedStr] = this.#handleAnimateBefore(str, {
      el: root,
      htmlType: 'div',
      delaySta: true,
      addCursorFlashing: true,
      regexp: REGEXP_LIST.comment,
      className: `${MARK}-comment ${MARK}-block`,
    });
    return unformattedStr;
  };

  /**
   * css 选择器处理
   */
  #handleCSSSelector = (str: string, el: Element) => {
    const [, unformattedStr] = this.#handleAnimateBefore(str, {
      el,
      htmlType: 'span',
      delaySta: false,
      regexp: REGEXP_LIST.CSSDetail.selector,
      className: `${MARK}-css-selector`,
    });
    return unformattedStr;
  };

  /**
   * css 单条属性处理
   */
  #handleCSSAttrItem = (str: string, el: Element) => {
    const handleArr = [
      {
        // css 属性
        match: (str: string) => REGEXP_LIST.CSSAttrDetail.isAttrKey.test(str),
        action: (str: string, el: Element) => {
          const [, unformattedStr] = this.#handleAnimateBefore(str, {
            el,
            htmlType: 'span',
            delaySta: false,
            regexp: REGEXP_LIST.CSSAttrDetail.attrKey,
            className: `${MARK}-attr-key`,
          });
          return unformattedStr;
        },
      },
      {
        // 属性间的空白符号
        match: (str: string) => REGEXP_LIST.empty.test(str),
        action: this.#handleEmpty,
      },
      {
        // :
        match: (str: string) => REGEXP_LIST.CSSAttrDetail.colon.test(str),
        action: (str: string, el: Element) => {
          const [, unformattedStr] = this.#handleAnimateBefore(str, {
            el,
            htmlType: 'span',
            delaySta: false,
            regexp: REGEXP_LIST.CSSAttrDetail.colon,
            className: `${MARK}-colon ${MARK}-colon-css`,
          });
          return unformattedStr;
        },
      },
      {
        // css 属性值
        match: (str: string) => REGEXP_LIST.CSSAttrDetail.isAttrVal.test(str),
        action: (str: string, el: Element) => {
          const [, unformattedStr] = this.#handleAnimateBefore(str, {
            el,
            htmlType: 'span',
            delaySta: false,
            regexp: REGEXP_LIST.CSSAttrDetail.attrVal,
            className: `${MARK}-attr-val`,
          });
          return unformattedStr;
        },
      },
      {
        // ;
        match: (str: string) => REGEXP_LIST.CSSAttrDetail.semicolon.test(str),
        action: (str: string, el: Element) => {
          const [, unformattedStr] = this.#handleAnimateBefore(str, {
            el,
            htmlType: 'span',
            delaySta: false,
            regexp: REGEXP_LIST.CSSAttrDetail.semicolon,
            className: `${MARK}-semicolon ${MARK}-semicolon-css`,
          });
          return unformattedStr;
        },
      },
    ];
    this.#cycleHandle(str, {
      handleArr,
      root: el,
    });
  };

  /**
   * css {} 内属性处理
   */
  #handleCSSAttrs = (str: string, el: Element) => {
    const handleArr = [
      {
        // {
        match: (str: string) => REGEXP_LIST.CSSAttrDetail.start.test(str),
        action: (str: string, el: Element) => {
          const [, unformattedStr] = this.#handleAnimateBefore(str, {
            el,
            htmlType: 'span',
            delaySta: false,
            regexp: REGEXP_LIST.CSSAttrDetail.start,
            className: `${MARK}-brackets ${MARK}-brackets-start ${MARK}-brackets-css`,
          });
          return unformattedStr;
        },
      },
      {
        // 空白符处理
        match: (str: string) => REGEXP_LIST.empty.test(str),
        action: this.#handleEmpty,
      },
      {
        // 单条 css 样式
        // eg: transition: all 1s ease;
        match: (str: string) => REGEXP_LIST.CSSAttrDetail.attr.test(str),
        action: (str: string, el: Element) => {
          const [, unformattedStr] = this.#handleAnimateBefore(str, {
            el,
            delaySta: false,
            regexp: REGEXP_LIST.CSSAttrDetail.attr,
            handleFn: this.#handleCSSAttrItem,
          });
          return unformattedStr;
        },
      },
      {
        // }
        match: (str: string) => REGEXP_LIST.CSSAttrDetail.end.test(str),
        action: (str: string, el: Element) => {
          const [, unformattedStr] = this.#handleAnimateBefore(str, {
            el,
            htmlType: 'span',
            delaySta: false,
            regexp: REGEXP_LIST.CSSAttrDetail.end,
            className: `${MARK}-brackets ${MARK}-brackets-end ${MARK}-brackets-css`,
          });
          return unformattedStr;
        },
      },
    ];
    this.#cycleHandle(str, {
      handleArr,
      root: el,
    });
  };

  /**
   * 动态输出 CSS
   */
  #animateShowCSS = (cssStr: string, el: Element) => {
    const handleArr = [
      {
        // css 选择器处理
        match: (str: string) => REGEXP_LIST.CSSDetail.selector.test(str),
        action: this.#handleCSSSelector,
      },
      {
        // css 选择器和 { 之间的空白符处理
        match: (str: string) => REGEXP_LIST.empty.test(str),
        action: this.#handleEmpty,
      },
      {
        // css {} 内属性处理
        match: (str: string) => REGEXP_LIST.CSSDetail.attrs.test(str),
        action: this.#handleCSSAttrs,
      },
    ];
    this.#cycleHandle(cssStr, {
      handleArr,
      root: el,
    });
  };

  /**
   * CSS 处理
   */
  #handleCSS = (str: string, root: Element) => {
    const [matchStr, unformattedStr] = this.#handleAnimateBefore(str, {
      el: root,
      htmlType: 'div',
      delaySta: false,
      addCursorFlashing: true,
      regexp: REGEXP_LIST.CSS,
      className: `${MARK}-css ${MARK}-code ${MARK}-block`,
      handleFn: this.#animateShowCSS,
    });
    matchStr &&
      this.fns.push(() => {
        pushStyle(`${this.options.el} ${matchStr}`);
        this.#next();
      });
    return unformattedStr;
  };

  /**
   * 文本输出
   */
  #handleText = (str: string, root: Element) => {
    const [, unformattedStr] = this.#handleAnimateBefore(str, {
      el: root,
      htmlType: 'div',
      delaySta: true,
      addCursorFlashing: true,
      regexp: REGEXP_LIST.text,
      className: `${MARK}-text ${MARK}-block`,
    });
    return unformattedStr;
  };

  /**
   * 空白字符处理
   */
  #handleEmpty = (str: string, root: Element) => {
    const [, unformattedStr] = this.#handleAnimateBefore(str, {
      el: root,
      delaySta: false,
      regexp: REGEXP_LIST.empty,
    });
    return unformattedStr;
  };

  /**
   * 类型检测
   * 根据起始字符判定文本类型
   */
  #strTypeHandle = (str: string) => {
    const handleArr = [
      {
        // TAG 空白字符开头
        match: (str: string) => REGEXP_LIST.empty.test(str),
        // 这里最外层用 div 包裹，会多出一个 \n
        action: (str: string, el: Element) =>
          this.#handleEmpty(str.replace(/\n/, ''), el),
      },
      {
        // TAG 注释
        match: (str: string) => REGEXP_LIST.comment.test(str),
        action: this.#handleComment,
      },
      {
        // TAG CSS
        match: (str: string) => REGEXP_LIST.CSS.test(str),
        action: this.#handleCSS,
      },
      {
        // 其他情况按照 html 处理
        match: (str: string) => REGEXP_LIST.text.test(str),
        action: this.#handleText,
      },
    ];
    this.#cycleHandle(str, {
      handleArr,
      root: this.root,
    });
  };

  start = () => {
    const { sourceData } = this.options;
    this.#strTypeHandle(sourceData);

    // 执行队列函数，输出 html
    this.#delayFn(0, () => this.#next());
  };
}
