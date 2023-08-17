import React from 'react'
import Home from './pages/home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './pages/Navbar'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    // <div className='container'>
    <>
      <Router>
        <Navbar/>
        <Routes>
         
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<PrivateRoute/>}>
          <Route path='/' element={<Home />} />

          </Route>
        </Routes>
      </Router>
      <ToastContainer/>
      </>
      
    // </div>
  )
}

export default App
