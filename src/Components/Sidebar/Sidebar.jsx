import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { useSelector, useDispatch } from 'react-redux'
import { ShowLoading, HideLoading } from '../../redux/alertsSlice'
import { logout } from '../../redux/userSlice'


const Sidebar = () => {
    const {user} = useSelector(state => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logOut =  async()=>{
        dispatch(ShowLoading())
        localStorage.clear('token')
        dispatch(logout())
        dispatch(HideLoading())
        navigate('/')
    }


  return (
    <div className='sidebar'>
      
      <div className='sidebar-profile'>
        <img src={assets.profile} alt="" />
        <div>
          <h1>{user &&  <p>{user?.firstname}{user?.lastname}</p>}</h1>
        </div>
      </div>

      <div className="sidebar-options">
              <NavLink to='/dashboard/profile' className="sidebar-option">
                <img src={assets.details} alt="" />My Profile
              </NavLink>
              <NavLink to='/dashboard/myfamily' className="sidebar-option">
                <img src={assets.family} alt="" />My Family
              </NavLink>
              <NavLink to='/dashboard/mybookings'  className="sidebar-option">
                <img src={assets.ticket} alt="" />My Bookings
              </NavLink>
              <NavLink to='/dashboard/mypayments'  className="sidebar-option">
                <img src={assets.payment} alt="" />My Payments
              </NavLink>
              <div onClick={() => logOut() } className="sidebar-option">
                <img src={assets.logout} alt="" />Logout
              </div>
            </div>
    </div>
  )
}

export default Sidebar
