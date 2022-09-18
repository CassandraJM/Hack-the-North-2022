import React from 'react';
import './IdeaBoard.css';
import Bubble from '../Bubble/Bubble';

const IdeaBoard = props => {
  const itemOrder = [6, 0, 8, 3, -1, 7, 1, 4, 2];
  const centerItem = (
    props.idea ? (
      <div className="center-idea">
        { props.idea.summary }
      </div>
    ) : (
      <input
        className="center-idea homepage-idea-input"
        onBlur={props.onIdeaSubmitted.bind(this)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            props.onIdeaSubmitted(e);
          }
        }}
        placeholder="Type your idea here">
      </input>
    )
  );

  const getItems = () => {
    let items = [];
    for(let i = 0; i < 8; i++) {
      if(itemOrder[i] === -1) {
        items.push((
          <div className="item" key={i}>
            { centerItem }
          </div>
        ));
      } else if(itemOrder[i] < props.idea?.children.length) {
        items.push(
          <div className="item" key={i}>
            <Bubble
              data={props.idea.children[itemOrder[i]]}
              onClick={props.onTraverseBubble?.bind(this)} />
          </div>
        );
      } else {
        items.push(<div className="item" key={i}></div>);
      }
    }
    return items;
  };

  return (
    <div className="homepage-grid-container">
      {/* Card Components */}
      <div className="homepage_grid">
        { getItems() }
      </div>
    </div>
  )
}

export default IdeaBoard;