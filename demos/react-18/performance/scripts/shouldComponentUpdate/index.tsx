import React from 'react';

interface TProps {
  name: string;
}

export default class ShouldComponentUpdateEL extends React.Component<TProps> {
  shouldComponentUpdate(nextProps) {
    console.log(this.props.name, nextProps.name);
    if (this.props.name === nextProps.name) {
      return false;
    }
    return true;
  }

  componentDidMount() {
    const { name } = this.props;
    console.log(`componentDidMount ${name}`);
  }
  render() {
    const { name } = this.props;
    console.log(`render ${name}`);
    return <div>{name}</div>;
  }
}
