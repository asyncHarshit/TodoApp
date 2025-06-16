import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import TaskManagerProvider, { TaskManagerContext } from '@/context/contextApi'
import { callLogoutApi } from '@/service/api'


const Header = () => {
    const {setUser} = useContext(TaskManagerContext)
    const navigate = useNavigate();
  const handleLogout = async() => {
    const response = await callLogoutApi();
    if(response?.success){
        setUser(null);
        navigate('/auth')
        
    }
    
  }

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto h-16">
        <div className="flex h-[64px] items-center w-full justify-between">
          <div className="w-auto">
            <h1>Task Manager</h1>
          </div>
          <div className="flex gap-4">
            <Link className="text-black text-xl font-bold" to={"/task/list"}>
              Tasks
            </Link>
            <Link
              className="text-black text-xl font-bold"
              to={"/task/scrumBoard"}
            >
              Scrum Board
            </Link>
          </div>
          <div>
            <LogOut
              onClick={handleLogout}
              color="#000"
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header
