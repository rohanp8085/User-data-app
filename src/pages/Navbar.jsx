import { AppBar, Button, Toolbar } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUSer } from '../features/AuthSlice'

const Navbar = () => {

    const dispatch  = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state=> state.auth)

    const handleLogout = () =>{
        dispatch(logoutUSer())
        navigate("/login")
    }
    return (
        <AppBar position="static" color='success'>
            <Toolbar sx={{ justifyContent: "space-between" }}>
            <Link to={"/"} >Home</Link>
           {
            user ? (
               <>
                
                
                <button onClick={handleLogout}>Logout</button>
               </>
               
            ): (
               <>
              
               <Link to={"/login"}>Login</Link>

                
               </>
            )
           }
               
             



            </Toolbar>
        </AppBar>
    )
}

export default Navbar
