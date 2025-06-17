import axios from "axios";


export async function getUserAuthApi(){
    try {
      const response = await axios.post('https://todoapp-backend-rzzr.onrender.com/api/auth/apiAuth',{},{withCredentials:true});

      return response?.data
      
    } catch (error) {

        console.log("error in api.js" , error.message);
        
      
    }
  }


export async function callLogoutApi(req,res){
  try {
    const response = await axios.post('https://todoapp-backend-rzzr.onrender.com/api/auth/logout',{},{withCredentials : true})
  return response?.data;
    
  } catch (error) {
    console.log("error in api.js" , error.message);
    
  }
  
}  




export async function addNewTaskApi(formData){
  try {
      const response = await axios.post('https://todoapp-backend-rzzr.onrender.com/api/task/add',
        formData
      );

      return response?.data
      
    } catch (error) {

        console.log("error in add new task" , error.message.data);
        
      
    }


}
export async function getAllTasksApi(getUserId){
  const response = await axios.get(`https://todoapp-backend-rzzr.onrender.com/api/task/getTasks/${getUserId}`);

  return response.data;


}
export async function updateTaskApi(formData){
  const response = await axios.put(`https://todoapp-backend-rzzr.onrender.com/api/task/update`, formData);


  return response?.data;

  

}
export async function deleteTaskApi(getTaskId){
  const response = await axios.delete(`https://todoapp-backend-rzzr.onrender.com/api/task/deleteTask/${getTaskId}`);

  return response.data;

}