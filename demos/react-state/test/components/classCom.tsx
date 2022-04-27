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
    console.log(1111);
    this.setState(() => ({ count: this.state.count + 1 }));
    console.log(this.state.count);

    setTimeout(() => {
      console.log(333);
      console.log(this.state.count);
      this.setState({ count: this.state.count + 3 });
      this.setState({ count: this.state.count + 4 });
      console.log(this.state.count);
      console.log('---------');
    }, 0);

    console.log(2222);
    this.setState({ count: this.state.count + 2 });
    console.log(this.state.count);
  };

  render() {
    return (
      <div>
        <Space>
          <p>count: {this.state.count}</p>
          <Button onClick={this.handlerClick}>useState click</Button>
        </Space>
      </div>
    );
  }
}
