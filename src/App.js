import React, { useState } from 'react'
import './App.css'
import ShowTabs from './components/showTabs'

function App() {
  const [count] = useState(10)
  return (
    <div className='App'>
      <h1>Demo Container</h1>
      <ShowTabs count={count} />
    </div>
  )
}

export default App
