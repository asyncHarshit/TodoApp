import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserAuthApi } from "@/service/api";


export const TaskManagerContext = createContext(null);

function TaskManagerProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading , setloading] = useState(false)
  const [taskList , setTaskList] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifuUserCookie = async () => {
      const data = await getUserAuthApi();
      console.log(data)

      if (data?.userInfo) {
        setUser(data.userInfo); 
      }

      return data?.success
        ? navigate(
            location.pathname === "/auth" || location.pathname === "/"
              ? "/task/list"
              : `${location.pathname}`
          )
        : navigate("/auth");
    };

    verifuUserCookie();
  }, [location.pathname, navigate]);

  return (
    <TaskManagerContext.Provider value={{loading , setloading , taskList , setTaskList, user, setUser }}>
      {children}
    </TaskManagerContext.Provider>
  );
}

export default TaskManagerProvider;
