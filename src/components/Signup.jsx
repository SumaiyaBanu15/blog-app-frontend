import React,{ useEffect, useState } from 'react'
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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstNameRes, setFirstNameRes] = useState('');
  const [lastNameRes, setLastNameRes] = useState('');
  const [emailRes, setEmailRes] = useState('');
  const [pswdRes, setPswdRes] = useState('');
  const [confirmPswdRes, setConfirmPswdRes] = useState('');
  const [submit, setSubmit] = useState(false);

  // const logout = UseLogout()
  const navigate = useNavigate()

  let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  useEffect(()=>{
    clearError();
  },[firstName, lastName, password,email]);

  const clearError = () => {
    setFirstNameRes('');
    setLastNameRes('');
    setEmailRes('');
    setPswdRes('');
    setConfirmPswdRes('');
  }
  
  const handleSignUp = async(e)=>{
    e.preventDefault();

    clearError();
    // First name Verification
    if(firstName.trim() === ''){
      setFirstNameRes("Please fill this input field");
      return;
    }
    else if(firstName.length < 2){
      setFirstNameRes(
        "First name should be at least above 2 characters long!"
      );
      return;
    }
    // Last name Verification
    if(lastName.trim() === ''){
      setLastNameRes("Please fill this input field");
      return;
    }
    else if(lastName.length < 2){
      setLastNameRes(
        "Last name should be at least above 2 characters long!"
      );
      return;
    }
    // Email Verification
    if(email.trim() === ''){
      setEmailRes("Please fill the email field");
      return;
    }
    else if(!emailPattern.test(email)){
      setEmailRes(
        "Email should be in correct format"
      )
      return;
    }
    // Password Verification
    if(password.trim() === ''){
      setPswdRes("Please fill the password field");
      return;
    }
    else if(password.length < 3){
      setPswdRes(
        "Password should be at least greater than 3 characters, Make Strong password!"
      )
      return;
    }
    // Confirm Password Verification
    if(confirmPassword.trim() === ''){
      setConfirmPswdRes("Please fill the confirm password field");
      return;
    }
    else if(password !== confirmPassword){
      setConfirmPswdRes(
        "Password doesn't match with confirm password"
      )
      return;
    }
setSubmit(true);

    try {
      const res = await AxiosService.post(`/user/signup`, {firstName,lastName,email,password,confirmPassword});
      setFirstName("");
      setLastName("");
      setEmail("")
      setPassword("");
      setConfirmPassword("");
    
      if(res.status === 201){
        toast.success(res.data.message)
        navigate('/home')
      }
    } catch (error) {
  
      toast.error(error.response.data.message)
  
    }
    setSubmit(false);
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
                  <Form.Control type="text" placeholder="Enter your name" onChange={(e)=>setFirstName(e.target.value)} required/>
                </Form.Group>
                {firstNameRes && <p className="text-danger">{firstNameRes}</p>}

                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" onChange={(e)=>setLastName(e.target.value)} required/>
                </Form.Group>
                {lastNameRes && <p className="text-danger">{lastNameRes}</p>}

                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} required/>
                </Form.Group>
                {emailRes && <p className="text-danger">{emailRes}</p>}

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required/>
                </Form.Group>
                {pswdRes && <p className="text-danger">{pswdRes}</p>}

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)} required/>
                </Form.Group>
                {confirmPswdRes && <p className="text-danger">{confirmPswdRes}</p>}

                <div className='col-md-9 text-center'>
                  {/* {submit && ( */}
                <Button variant="primary" onClick= {(e)=>handleSignUp(e)} disabled={submit}>
                  Sign Up
                </Button>
                {/* )} */}
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