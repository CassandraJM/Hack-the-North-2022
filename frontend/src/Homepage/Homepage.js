import React from 'react';
import './Homepage.css';
import { useState } from 'react';
const App = () => {

  {/* word input rendering */}
  //const [fieldInput, setFieldInput] = useState("");
  const [fieldInput, setFieldInput] = useState("");


  return (
    <div className='homepage_container'>
      {/* Title */}
      <div className="page_header">
        <h1 className="page_name">ThinkBoard</h1>
      </div>

      {/* Input Form */}
      <form className='inputForm'>
        <label>
        <input type="submit" value="Submit"/>
          <input className="textField" type="text" placeholder="Enter your ideas here" value={fieldInput} onChange={event => setFieldInput(event.target.value)}/>
        </label>
      </form>

    </div>    
  )
}

export default App;