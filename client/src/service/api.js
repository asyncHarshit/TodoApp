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