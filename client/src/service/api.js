import axios from "axios";


export async function getUserAuthApi(){
    try {
      const response = await axios.post('http://localhost:3000/api/auth/apiAuth',{},{withCredentials:true});

      return response?.data
      
    } catch (error) {

        console.log("error in api.js" , error.message);
        
      
    }
  }


export async function callLogoutApi(req,res){
  try {
    const response = await axios.post('http://localhost:3000/api/auth/logout',{},{withCredentials : true})
  return response?.data;
    
  } catch (error) {
    console.log("error in api.js" , error.message);
    
  }
  
}  




export async function addNewTaskApi(formData){
  try {
      const response = await axios.post('http://localhost:3000/api/task/add',
        formData
      );

      return response?.data
      
    } catch (error) {

        console.log("error in add new task" , error.message.data);
        
      
    }


}
export async function getAllTasksApi(getUserId){
  const response = await axios.get(`http://localhost:3000/api/task/getTasks/${getUserId}`);

  return response.data;


}
export async function updateTaskApi(formData){

}
export async function deleteTaskApi(formData){

}