import React from 'react';
import type { TCommonProps } from '../../interface';

export default class PureComponent extends React.Component<TCommonProps> {
  shouldComponentUpdate(nextProps) {
    console.log(this.props.name, nextProps.name);
    if (this.props.name === nextProps.name) {
      return false;
    }
    return true;
  }

  componentDidMount() {
    const { name, mark } = this.props;
    console.log(`「${mark}」componentDidMount ${name}`);
  }
  render() {
    const { name, mark } = this.props;
    console.log(`「${mark}」render ${name}`);
    return (
      <div>
        「{mark}」{name}
      </div>
    );
  }
}
