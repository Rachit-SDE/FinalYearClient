import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './DashBoard.css'


const Dashboard = ({children}) => {

  return (
    <div className='dashboard'>
      <div className='sidebar-box'>
        <Sidebar/>
      </div>
      <div className='main-page'>
      {children}
      </div>
    </div>
  )
}

export default Dashboard
