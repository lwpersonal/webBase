import ReactDOM from 'react-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { Button, Space } from 'antd';
import { store } from './models/store';
import type { RootState } from './models/store';
import { change, changeName, init } from './models/slice/user';

import { useGetPokemonByNameQuery } from './models/services/pokemon';

import './index.less';
import 'antd/dist/antd.css';

function App() {
  console.log('render');
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');

  return (
    <div style={{ padding: 20 }}>
      <p>name: {user.name}</p>
      <p>age: {user.age}</p>
      <p>orgId: {user.orgId}</p>
      {user.desc && <p>desc: {user.desc}</p>}

      <Space>
        <Button
          type="primary"
          onClick={() =>
            dispatch(
              change({
                age: 15,
                name: 'xh',
                orgId: 113,
                desc: '介绍',
              }),
            )
          }
        >
          全部修改 user 信息
        </Button>

        <Button type="primary" onClick={() => dispatch(changeName('小红'))}>
          修改 user name
        </Button>

        <Button type="primary" onClick={() => dispatch(init())}>
          初始化
        </Button>
      </Space>

      <div>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <h3>{data.species.name}</h3>
            <img src={data.sprites.front_shiny} alt={data.species.name} />
          </>
        ) : null}
      </div>
    </div>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
