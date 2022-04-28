import React from 'react';
import { Button, Space } from 'antd';

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

  // componentDidMount() {
  //   this.setState({ count: this.state.count + 1 });
  //   console.log(this.state.count);
  //   this.setState({ count: this.state.count + 1 });
  //   console.log(this.state.count);

  //   setTimeout(() => {
  //     this.setState({ count: this.state.count + 1 });
  //     console.log(this.state.count);
  //     this.setState({ count: this.state.count + 1 });
  //     console.log(this.state.count);
  //   });
  // }

  handlerClick = () => {
    // debugger;
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);

    setTimeout(() => {
      console.log(this.state.count);
      this.setState(() => {
        console.log('+3');
        return { count: this.state.count + 3 };
      });
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
          <p>count: {this.state.count}</p>
        </Space>
      </div>
    );
  }
}
