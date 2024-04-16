import React,{ useState } from 'react'
import AxiosService from '../utils/ApiService'
// import UseLogout from '../hooks/UseLogout'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Signup() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
  // const logout = UseLogout()
  const navigate = useNavigate()

  const handleSignUp = async()=>{
    try {
      const res = await AxiosService.post(`/user/signup`, {firstName,lastName,email,password})

      if(res.status === 201){
        toast.success(res.data.message)
        navigate('/home')
      }
    } catch (error) {
  
      toast.error(error.response.data.message)
  
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
              <h3 className="login-heading mb-4">Let&apos;s Create Your Account</h3>
            </div>
              <Form>

                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" onChange={(e)=>setFirstName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" onChange={(e)=>setLastName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                </Form.Group>

                <div className='col-md-9 text-center'>
                <Button variant="primary" onClick= {(e)=>handleSignUp(e)}>
                  Sign Up
                </Button>
                <br />
                <br />
                Already a Member? <Link to={'/login'}>Login</Link>

                </div>
              </Form>

          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  </>
}

export default Signup