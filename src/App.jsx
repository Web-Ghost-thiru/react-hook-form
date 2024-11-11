import React, { useState } from 'react'
import HookForm from './HookForm'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [toggleTheme, setToggleTheme] = useState(false);
  return (
    <div style={{background: toggleTheme ? "#212529" : "#FFFFFF" , minHeight:'100vh'}}>
      <HookForm toggleTheme={toggleTheme} setToggleTheme={setToggleTheme}/>
    </div>
  )
}

export default App