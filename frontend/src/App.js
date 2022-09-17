import React from 'react'
import './App.css'

export const App = () => {
  return (
    <div>
      {/* Title */}
      <div className="page_header">
        <h1 className="page_name">Brainstorm++</h1>
      </div>

      {/* Textbox Form */}
      <form>
        <label>
          <input type="text" name="name" label="Enter your ideas here"/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default App;