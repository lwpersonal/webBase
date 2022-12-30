import React from 'react';

interface TProps {
  name: string;
}

export default class PureComponent extends React.Component<TProps> {
  shouldComponentUpdate(nextProps) {
    if (this.props.name === nextProps.name) {
      return false;
    }
    return true;
  }

  componentDidMount() {
    const { name } = this.props;
    console.log(`render ${name}`);
  }
  render() {
    const { name } = this.props;
    return <div>{name}</div>;
  }
}
