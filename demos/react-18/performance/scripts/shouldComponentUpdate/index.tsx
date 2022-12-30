import React from 'react';
import type { TCommonProps } from '../../interface';

let i = 0;
export default class ShouldComponentUpdateEL extends React.Component<TCommonProps> {
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
    i++;
    const { name, mark } = this.props;
    console.log(`「${mark}」render ${name}`);
    return (
      <div>
        <p>
          「{mark}」{name}
        </p>
        <p>「render 次数」{i}</p>
      </div>
    );
  }
}
