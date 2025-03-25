import React, { useEffect } from 'react'

const PublicRoute = ({children}) => {
    useEffect(()=> {
        if(localStorage.getItem('token'));
    },[])
  return (
    <div>
      {children}
    </div>
  )
}

export default PublicRoute
