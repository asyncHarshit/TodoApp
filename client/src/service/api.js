import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;


export async function getUserAuthApi(){
    try {
      const response = await axios.post(`${baseUrl}/api/auth/apiAuth`,{},{withCredentials:true});

      return response?.data
      
    } catch (error) {

        console.log("error in api.js" , error.message);
        
      
    }
  }


export async function callLogoutApi(req,res){
  try {
    const response = await axios.post(`${baseUrl}/api/auth/logout`,{},{withCredentials : true})
  return response?.data;
    
  } catch (error) {
    console.log("error in api.js" , error.message);
    
  }
  
}  




export async function addNewTaskApi(formData){
  try {
      const response = await axios.post(`${baseUrl}/api/task/add`,
        formData
      );

      return response?.data
      
    } catch (error) {

        console.log("error in add new task" , error.message.data);
        
      
    }


}
export async function getAllTasksApi(getUserId){
  const response = await axios.get(`${baseUrl}/api/task/getTasks/${getUserId}`);

  return response.data;


}
export async function updateTaskApi(formData){
  const response = await axios.put(`${baseUrl}/api/task/update`, formData);


  return response?.data;

  

}
export async function deleteTaskApi(getTaskId){
  const response = await axios.delete(`${baseUrl}/api/task/deleteTask/${getTaskId}`);

  return response.data;

}