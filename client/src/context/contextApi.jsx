import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserAuthApi } from "@/service/api";

export const TaskManagerContext = createContext(null);

function TaskManagerProvider({ children }) {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifuUserCookie = async () => {
      const data = await getUserAuthApi();

      if (data?.userInfo) {
        setUser(data.userInfo);
      }

      return data?.success ? navigate("/task/list") : navigate("/auth");
    };

    verifuUserCookie();
  }, [location.pathname, navigate]);

  return (
    <TaskManagerContext.Provider value={{ user, setUser }}>
      {children}
    </TaskManagerContext.Provider>
  );
}

export default TaskManagerProvider;
