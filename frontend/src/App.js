import React from 'react';
import './App.css';
import { useState } from 'react';
const App = () => {

  {/* word input rendering */}
  //const [fieldInput, setFieldInput] = useState("");
  const [fieldInput, setFieldInput] = useState("");


  return (
    <div>
      {/* Title */}
      <div className="page_header">
        <h1 className="page_name">ThinkNote</h1>
      </div>

      {/* Input Form */}
      <form>
        <label>
        <input type="submit" value="Submit"/>
          <input type="text" placeholder="Enter your ideas here" value={fieldInput} onChange={event => setFieldInput(event.target.value)}/>
        </label>
  
      </form>
    </div>
  )
}

export default App;