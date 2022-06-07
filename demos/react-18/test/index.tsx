import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

function Child() {
  console.log('Child r');
  useEffect(() => {
    console.log('Child');
  }, []);
  return <h1>child</h1>;
}

function Father() {
  console.log('Father r');
  useEffect(() => {
    console.log('Father');
  }, []);

  return <Child />;
}

function App() {
  console.log('App r');
  useEffect(() => {
    console.log('App');
  }, []);

  return <Father />;
}

ReactDOM.render(<App />, document.getElementById('root'));
