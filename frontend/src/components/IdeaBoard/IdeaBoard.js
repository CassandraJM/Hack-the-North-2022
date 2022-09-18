import React from 'react';
import './IdeaBoard.css'

const IdeaBoard = () => {
  return (
   <div>
    {/* Card Components */}
    <div className="homepage_grid">
        <div className="row">
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
        </div>
        <div className="row">
        <div className="item"></div>
          <div id="centerIdea" className="item">
            Idea Name
          </div>
          <div className="item"></div>
        </div>
        <div className="row">
        <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
        </div>
      </div>

    </div>
  )
}

export default IdeaBoard;