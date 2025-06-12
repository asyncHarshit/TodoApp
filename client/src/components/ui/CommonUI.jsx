import React from 'react'
import { Outlet } from 'react-router-dom'

const CommonUI = () => {
  return (
    <div>CommonUI
        <Outlet/>
    </div>
  )
}

export default CommonUI