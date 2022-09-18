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

  loadSession() {

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
          parent: this.state.currIdea.summary,
        }),
      }).then(res => {
        e.target[0].value = '';
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
    const text = e.target.value;
    if(text && text.length > 0) {
      fetch(`${config.testApiUrl}/api/start`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({
          start: text,
        }),
      }).then(() => {
        this.setState({
          currIdea: new Idea(text, text, null),
        });
      });
    }
  };

  goBack() {
    this.setState({
      currIdea: this.state.currIdea.parent,
    });
  }

  render() {
    return (
      <div className="app-page">
        {/* Title */}
        <div className="page-header">
          {
            this.state.currIdea?.parent &&
            <button className="page-header-back-button" onClick={this.goBack.bind(this)}>
              <svg style={{width: '24px', height: '24px'}} viewBox="0 0 24 24">
                <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
              </svg>
            </button>
          }
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
                <path fill="currentColor" d="M3 16H10V14H3M18 14V10H16V14H12V16H16V20H18V16H22V14M14 6H3V8H14M14 10H3V12H14V10Z" />
              </svg>
            </button>
          </form>
        </div>
        <div>
          <IdeaBoard
            idea={this.state.currIdea}
            onIdeaSubmitted={this.onIdeaSubmitted.bind(this)}
          />
        </div>
      </div>
    );
  }
}
