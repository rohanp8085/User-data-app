import axios from "axios"

   
const API_URL = "/api/"  

const createlist = async(userData , token) =>{

    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
   const response = await axios.get(API_URL + "core/countries", config, userData)
   localStorage.setItem("country" , JSON.stringify(response.data))
    
     return response.data
}

const getstate = async(userData , token) =>{

    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
   const response = await axios.get(API_URL + "core/states", config, userData)
   localStorage.setItem("state" , JSON.stringify(response.data))
     
     return response.data
}

const getdata = async(data)=>{
    const objdata =  data
    const newdata = [objdata]
    console.log(newdata)
   localStorage.setItem("tabledata" , JSON.stringify(newdata))
    return  data
}  

const deleteData = async(id)=>{

   localStorage.removeItem("tabledata")
   return id

}


const ListService = {
    createlist,
    getstate,
    getdata,
    deleteData
}

export default ListService