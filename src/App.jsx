import React, { useEffect } from 'react'
import RouterPages from './RouterPages'
import { BrowserRouter } from "react-router-dom";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <RouterPages />
      </BrowserRouter>
    </div>
  )
}

export default App
