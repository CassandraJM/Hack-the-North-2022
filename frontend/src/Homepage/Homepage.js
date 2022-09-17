import React from 'react'
import './Homepage.css'

export const App = () => {
  return (
    <div>
      {/* Title */}
      <div className="page_header">
        <h1 className="page_name">ThinkNote++</h1>
      </div>

      {/* Textbox Form */}
      <form>
        <label>
          <input type="text" name="name" placeholder="Enter your ideas here" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default App;