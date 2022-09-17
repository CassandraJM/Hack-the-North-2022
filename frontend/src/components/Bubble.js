import React from 'react';
import BubbleChild from './BubbleChild';

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
      <div className="bubble">
        <div className="bubble-header">
            <h1 className="bubble-summary">
                { this.state.summary }
            </h1>
            <p className="bubble-input">
                { this.state.input }
            </p>
        </div>
        <div className={`bubble-children ${this.state.children ? '' : 'no-children'}`}>
            {
              this.state.children ?
              this.state.children.map((child) => {
                return <BubbleChild summary={child.summary} />
              })
              : <p>{this.state.predictions}</p>
            }
        </div>
      </div>
    );
  }
}