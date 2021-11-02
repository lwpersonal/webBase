import { useState, useEffect, useCallback } from 'react';
import styles from './test.module.less';
import logo from './logo.svg';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count);
  }, []);

  const handleSentryErrorBtn = useCallback(() => {
    throw new Error('wenjw sentry error test');
  }, []);

  return (
    <div className={styles.wrap}>
      <p>React Demo</p>
      <img width="200" src={logo} alt="" />
      <div onClick={handleSentryErrorBtn}>Sentry Error Test</div>
    </div>
  );
}

export default App;
