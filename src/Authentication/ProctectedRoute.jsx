/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { message } from 'antd'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'
import { ShowLoading, HideLoading } from '../redux/alertsSlice'

const ProtectedRoute = ({children}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const validateToken = async () => {
        try {
            dispatch(ShowLoading())
            const response = await axios.post(`https://backend-chi-one-67.vercel.app/api/user/get-user-by-id` , {} , {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(HideLoading())
            if(response.data.success){
                dispatch(setUser(response.data.data))
                
                
            }else{
                localStorage.removeItem('token');
                message.error(response.data.message)
                navigate('./login');
            }
        } catch (error) {
            console.log(error)
            navigate('./login');
        }
    }
    useEffect(()=>{
        if(localStorage.getItem('token')){
            validateToken()
        }else{
           navigate("/login")
        }
    },[])
  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute
