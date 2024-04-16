import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {toast} from 'react-toastify'
import AxiosService from '../utils/ApiService';
import { Link, useNavigate } from 'react-router-dom';
import UseLogout from '../hooks/UseLogout';

function SignIn() {
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let navigate = useNavigate()
  let logout = UseLogout()
  let handleLogin = async()=>{
try {
  let res = await AxiosService.post('/user/login', {
    email,
    password
  })

  if(res.status===200){
    toast.success(res.data.message)
    sessionStorage.setItem('token',res.data.token)
    sessionStorage.setItem('userData',JSON.stringify(res.data.userData))

    if(res.data.userData.role === 'admin'){
      navigate('/dashboard')
    }
    else{
      navigate('/home')
    }
  }
  
} catch (error) {
  toast.error(error.response.data.message)
  if(error.response.status === 401){
    logout()
  }
}

  }
  return <>
   <div className="container-fluid">
    <div className="row g-0 justify-content-center align-items-center">
    <div className="col-md-8 col-lg-6">
      <div className="login d-flex align-items-center p-5">
        <div className="container">
          <div className="row">
            <div className="col-md-9 text-center ps-4">
              <h2>Blog App</h2>
              <h3 className="login-heading mb-4">Let&apos;s Login Your Account</h3>
            </div>
              <Form>

                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                </Form.Group>

                <div className='col-md-9 text-center'>
                <Button variant="primary" onClick= {(e)=>handleLogin(e)}>
                  Sign In
                </Button>
                <br />
                <br />
                New User? Create your account here <Link to={'/signup'}>Signup</Link>

                </div>
              </Form>

          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  {/* <div className = 'container'>
    <h1 style={{textAlign:'center'}}>Login Here!</h1>
  <Form>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" onClick= {handleLogin}>
        Sign In
      </Button>
    </Form>
  </div> */}
  </>
}

export default SignIn