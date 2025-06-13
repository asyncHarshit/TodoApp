import { createContext } from "react";

export const TaskManagerContext = createContext(null);


function TaskManagerProvider({children}){
    return <TaskManagerContext.Provider>{children}</TaskManagerContext.Provider>
}


export default TaskManagerProvider