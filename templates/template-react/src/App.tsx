import { useState, useEffect } from 'react';
import styles from './test.module.less';
import logo from './logo.svg';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count);
  }, []);

  return (
    <div className={styles.wrap}>
      <p>React Demo</p>
      <img width="200" src={logo} alt="" />
    </div>
  );
}

export default App;
