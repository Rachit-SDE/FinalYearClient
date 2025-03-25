import React from 'react'
import '@ant-design/v5-patch-for-react-19';
import { Routes, Route } from 'react-router-dom'
import Map from './Pages/Map/Map'
import Home from './Pages/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import ProtectedRoute from './Authentication/ProctectedRoute'
import Dashboard from './Pages/DashBoard/DashBoard'
import Mydetails from './Components/Mydetails/Mydetails'
import Myfamily from './Components/MyFamily/MyFamily'
import MyBookings from './Components/MyBookings/Mybookings'
import Buslist from './Pages/Buslist/Buslist'
import PublicRoute from './Authentication/PublicRoute'
import Busdetails from './Pages/BusDetails/Busdetails'
import Register from './Pages/Login-Signup/Signup/Register'
import Login from './Pages/Login-Signup/Login/Login'

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element = {<Home/>} />
      <Route path = "/register" element = {<PublicRoute><Register/></PublicRoute>} />
      <Route path ="/login" element = {<PublicRoute><Login/></PublicRoute>} />
      <Route path = "/dashboard" element = {<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      <Route path = "/dashboard/profile" element = {<ProtectedRoute><Dashboard><Mydetails/></Dashboard></ProtectedRoute>} />
      <Route path = "/dashboard/myfamily" element = {<ProtectedRoute><Dashboard><Myfamily/></Dashboard></ProtectedRoute>} />
      <Route path = "/dashboard/mybookings" element = {<ProtectedRoute><Dashboard><MyBookings/></Dashboard></ProtectedRoute>} />
      <Route path ="/allbuses" element = {<PublicRoute><Buslist/></PublicRoute>} />
      <Route path = "/book-now/:id" element = {<ProtectedRoute><Busdetails/></ProtectedRoute>} />
      <Route path="/map/:busnumber/:source/:destination" element = {<Map/>} />
    </Routes>
    </>
  )
}

export default App