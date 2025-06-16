import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import CommonUI from './components/ui/CommonUI'
import ScrumBoard from './pages/ScrumBoard'
import AddTask from './pages/Task'
import Home from './pages/Home'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/task' element={<CommonUI />}>
        <Route path='scrumBoard' element={<ScrumBoard />} />
        <Route path='list' element={<AddTask />} />
      </Route>
    </Routes>
  )
}

export default App
