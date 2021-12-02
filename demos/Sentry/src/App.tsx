import { useState, useEffect, useCallback } from 'react';
import styles from './test.module.less';
import logo from './logo.svg';

function TestComponent({ fn }) {
  console.log('render');
  return (
    <>
      <div onClick={fn}>t p</div>
    </>
  );
}

function TestComponent2({ fn2 }) {
  console.log('render2');
  return (
    <>
      <div onClick={fn2}>t p</div>
    </>
  );
}

function TestComponent3() {
  console.log('render3');
  return (
    <>
      <div>t p</div>
    </>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const [arr, setarr] = useState<any>([]);

  // useEffect(() => {
  //   console.log(count);
  // }, []);

  const handleSentryErrorBtn = useCallback(() => {
    throw new Error('wenjw sentry error test');
  }, []);

  const handleTestBtn = useCallback(() => {
    console.log('count', arr);

    if (true) {
      setarr([...arr, 2]);
      return;
    }

    console.log('count ===', arr);
  }, [arr]);

  // const handleTestBtn2 = useCallback(() => {
  //   setCount(pre => {
  //     console.log('count2', pre);
  //     return pre + 1;
  //   });
  // }, []);

  useEffect(() => console.log('----', arr), [arr]);

  return (
    <div className={styles.wrap}>
      <p>React Demo</p>
      <img width="200" src={logo} alt="" />
      <div onClick={handleSentryErrorBtn}>Sentry Error Test</div>
      <button onClick={handleTestBtn}>Test Btn</button>
      {/* <button onClick={handleTestBtn2}>Test Btn222</button> */}

      <br />
      {/* <TestComponent fn={handleTestBtn} /> */}
      {/* <TestComponent2 fn2={handleTestBtn2} /> */}
      {/* <TestComponent3 /> */}
    </div>
  );
}

export default App;
