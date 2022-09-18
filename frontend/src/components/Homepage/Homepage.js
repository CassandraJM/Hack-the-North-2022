import React from 'react';
import './Homepage.css';
import config from '../../config.json';
import logo from './thinknotes-icon.png';

export const App = () => {
  const onSubmit = e => {
    e.preventDefault();

    // Call create idea API
    fetch(`${config.apiUrl}/api/create/`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({
        input: e.target[0].value,
      }),
    }).then(res => {
      console.log("Request complete! response:", res);
    });
  }

  return (
    <div className="app-page">
      {/* Title */}
      <div className="page-header">
        <div className="logo">
        <img style={{width:60}} src={logo}/>
        <h1 className="page-name">Think Notes</h1>
        </div>
        {/* Textbox Form */}
        <form className="page-form" onSubmit={onSubmit.bind(this)}>
          <input
            type="text"
            name="name"
            placeholder="Enter your ideas here"
            className="header-input w100"
          />
          <button type="submit" className="header-button">
            <svg style={{width: '24px', height: '24px'}} viewBox="0 0 24 24">
              <path fill="#aeaeae" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;