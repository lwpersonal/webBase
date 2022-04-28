import React from 'react';
import { Button, Space } from 'antd';
import RenderEl from './common/Render';

export default class ClassCom extends React.Component {
  state: {
    count: number;
  };
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  handlerClick = () => {
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);

    setTimeout(() => {
      console.log(this.state.count);
      this.setState(() => {
        console.log('+3');
        return { count: this.state.count + 3 };
      });
      console.log(this.state.count);
      this.setState(() => {
        console.log('+4');
        return { count: this.state.count + 4 };
      });
      console.log(this.state.count);
      console.log('---------');
    }, 0);

    this.setState({ count: this.state.count + 2 });
    console.log(this.state.count);
  };

  render() {
    return (
      <div>
        <Space>
          <Button onClick={this.handlerClick}>setState click</Button>
          <p key={this.state.count + 'class'}>
            count: {this.state.count}
            <RenderEl />
          </p>
        </Space>
      </div>
    );
  }
}
