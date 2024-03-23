import React from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'


function UseLogout() {
    let navigate = useNavigate()
  return ()=>{
    sessionStorage.clear()
    toast.success("User Logout Successfull")
    navigate('/')
  }
}

export default UseLogout