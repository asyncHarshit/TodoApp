import React from 'react'
import { Button } from './components/ui/button'
import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import CommonUI from './components/ui/CommonUI'
import ScrumBoard from './pages/ScrumBoard'
import AddTask from './pages/AddTask'

const App = () => {
  return (
    <Routes>
      <Route path='/auth' element={<Auth />} />
      <Route path='/task' element={<CommonUI />}>
        <Route path='scrumBoard' element={<ScrumBoard />} />
        <Route path='list' element={<AddTask />} />
      </Route>
    </Routes>
  )
}

export default App
