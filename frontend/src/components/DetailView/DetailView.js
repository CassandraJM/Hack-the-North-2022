import React from 'react';
import './DetailView.css';
import logo from '../../assets/think_notes.png';


export const App = () => {
  return (
    <div className="app-page">
      <div className='page-header'>
      <img style={{width:80}} src={logo}/>
        <h1 className="page-name">Think Notes</h1>
      </div>
    </div>
  )
}

export default App;