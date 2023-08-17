import axios from "axios"


const API_URL = "/api"

const LoginUSer = async(userData) =>{
    const response = await axios.post(  API_URL + "/login", userData )
    localStorage.setItem("user" , JSON.stringify(response.data))
    return response.data
}

const logout = async() =>{
    localStorage.removeItem("user")
}
const AuthService = {
    LoginUSer,
    logout
}

export default AuthService