/**
 * 获取光标位置，插入文本
 */
import { useState, useRef, useEffect, useCallback } from 'react';
import { Input, Button } from 'antd';

export default function InputText() {
  const inputRef = useRef<any>();
  // const input2Ref = useRef<any>();
  const [data, setData] = useState<any>({
    el: '',
    val: undefined,
    start: undefined,
    end: undefined,
  });

  useEffect(() => {
    console.log(inputRef);
  }, [inputRef]);

  const getCursorPos = useCallback(() => {
    const dom = data.el;
    if (!dom) {
      console.log('没有 dom');
      return;
    }
    // 获取光标位置
    const CaretPos = {
      start: 0,
      end: 0,
    };
    console.log(dom.selectionStart, dom.selectionEnd);
    if (dom.selectionStart) {
      // Firefox support
      CaretPos.start = dom.selectionStart;
    }
    if (dom.selectionEnd) {
      CaretPos.end = dom.selectionEnd;
    }
    console.log('CaretPos: ', CaretPos);
    return CaretPos;
  }, [data]);

  const handlerClick = () => {
    if (!data.el) {
      return console.log('请确认插入参数的位置');
    }
    const template = `\${}`;
    if (!data.val) {
      return setData(pre => ({ ...pre, val: template }));
    }
    const { start, end } = getCursorPos();
    const startStr = data.val.slice(0, start);
    const endStr = data.val.slice(end);
    return setData(pre => ({ ...pre, val: `${startStr}${template}${endStr}` }));
  };

  return (
    <div>
      <Button onClick={handlerClick}>添加参数</Button>
      <br />
      <Input
        ref={target => (inputRef.current = target)}
        placeholder="input1"
        onChange={e => setData(pre => ({ ...pre, val: e.target.value }))}
        value={data.val}
        onBlur={() => {
          setData(pre => ({ ...pre, el: inputRef.current?.input }));
          console.log(11111);
          setTimeout(() => {
            setData(pre => ({ ...pre, el: null }));
          }, 1000);
        }}
        size="middle"
        style={{ width: 600 }}
      />
      <br />
      {/* <Input
        ref={target => (input2Ref.current = target)}
        placeholder="input2"
        onChange={e => setData(pre => ({ ...pre, val: e.target.value }))}
        value={data.val}
        // onBlur={getCursorPos}
        onBlur={() => {
          setData(pre => ({ ...pre, el: input2Ref.current?.input }));
          setTimeout(() => {
            console.log(11111);
            setData(pre => ({ ...pre, el: null }));
          }, 1000);
        }}
        size="middle"
        style={{ width: 600 }}
      /> */}
    </div>
  );
}
