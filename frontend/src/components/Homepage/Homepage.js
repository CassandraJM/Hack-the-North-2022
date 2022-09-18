import React from 'react';
import './Homepage.css';
import config from '../../config.json';
import IdeaBoard from '../IdeaBoard/IdeaBoard';
import Idea from '../../Idea';
import { Type } from '../../Idea';
import Bubble from '../Bubble/Bubble'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currIdea: null,
    };
  }

  onSubmit = e => {
    e.preventDefault();

    const text = e.target[0].value;
    if(text !== '') {
      // Call create idea API
      fetch(`${config.testApiUrl}/api/create`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({
          input: text,
          parent: null,
        }),
      }).then(res => {
        res.json().then(data => {
          // Add children to idea
          let updatedIdea = this.state.currIdea;
          const newIdea = new Idea(data[0], text, this.state.currIdea, [], Type.CHILDREN);
          const prediction = new Idea(data[1], data[0], newIdea, [], Type.PREDICTIONS);
          newIdea.addChild(prediction);
          updatedIdea.addChild(newIdea);
          
          this.setState({
            currIdea: updatedIdea,
          });
        });
      });
    }
  }

  onIdeaSubmitted = e => {
    if(e.target.value && e.target.value.length > 0) {
      this.setState({
        currIdea: new Idea(e.target.value, e.target.value, null),
      });
    }
  };

  render() {
    return (
      <div className="app-page">
        {/* Title */}
        <div className="page-header">
          <h1 className="page-name">ThinkBoard</h1>
          {/* Textbox Form */}
          <form className="page-form" onSubmit={this.onSubmit.bind(this)}>
            <input
              type="text"
              name="name"
              placeholder="Enter your ideas here"
              className="header-input w100"
              disabled={!this.state.currIdea}
            />
            <button type="submit" className="header-button">
              <svg style={{width: '24px', height: '24px'}} viewBox="0 0 24 24">
                <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
              </svg>
            </button>
          </form>
        </div>
        <div>
          { console.log(this.state.currIdea) }
          <IdeaBoard
            idea={this.state.currIdea}
            onIdeaSubmitted={this.onIdeaSubmitted.bind(this)}
          />
        </div>
        <Bubble data={"Unknown"}/>
      </div>
    );
  }
}
