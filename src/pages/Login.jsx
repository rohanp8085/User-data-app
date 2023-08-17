import { Button, Container, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser, reset } from '../features/AuthSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
    
    const {user , isSuccess , isLoading , isError , message} =  useSelector(state => state.auth)
  const dispatch =  useDispatch()
  const navigate = useNavigate()

    const [formData , setFormData] =  useState({
        email : "",
        password : "",
    })


    const  {email , password} = formData

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSUbmit = (e) =>{
      e.preventDefault()
    
      dispatch(LoginUser(formData))
     
    }

    useEffect(() => {

        if (isError) {
          toast.error(message)
        }
        if (user || isSuccess) {
          navigate("/")
        }
    
        dispatch(reset())
      }, [user, isLoading, isSuccess, isError, message])

  

  return (
    <Container maxWidth="sm" sx={{ padding: 5 }} >

    <Typography variant="h5" component="h2" align="center">
        Login
    </Typography>
    <form  method='post' onSubmit={handleSUbmit}>

        <TextField
            type="mail"
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleChange}
            required
        />
         <TextField
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={handleChange}
            required
        />
        
       
        <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            size="large"
            method="post"
            style={{ marginTop: '1rem' }}
        >
            Login
        </Button>
    </form>

</Container>
  )
}

export default Login
