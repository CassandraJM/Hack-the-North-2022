import React from 'react';
import { Type } from '../../Idea';
import { BubbleChild } from './BubbleChild';
import './styles.css';

export default class Bubble extends React.Component {
  constructor(props) {
    super(props);
    const data = this.props.data;
    this.state = {
      children: data.children,
      predictions: data.predictions,
      summary: data.summary,
      input: data.input,
    };
  }

  render() {
    return (
      <div className="bubble" onClick={this.props.onClick}>
        <div className="bubble-header">
            <h1 className="bubble-summary">
                { this.state.summary }
            </h1>
        </div>
        <div className={`bubble-children ${this.state.children ? '' : 'no-children'}`}>
            {
              this.state.children &&
              this.state.children.filter(c => c.type === Type.CHILDREN).map((child) => {
                return <BubbleChild summary={child.summary} />
              })
            }
        </div>
      </div>
    );
  }
}