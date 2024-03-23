import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UseLogout from '../hooks/UseLogout';
import { Button } from 'react-bootstrap';

function Header() {
   
    let logout = UseLogout()
    let [role,setRole] = useState('')
    let userData = JSON.parse(sessionStorage.getItem('userData'))

    useEffect(()=>{
        if(!userData)
        {
           logout()
        }
        else{
        setRole(userData.role)
        }
    },[])

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
            <h3>Blog App</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto header-nav-items">
            {
                role==="admin"?<AdminNavLinks />:<UserNavLinks />
            }
          </Nav>
          <Nav>
            <Nav.Item><h4>{`${userData?.firstName} ${userData?.lastName}`}</h4></Nav.Item>
            &nbsp; &nbsp;
            <Nav.Item onClick={logout}><Button variant='danger'>Logout</Button></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function AdminNavLinks(){
  let navigate = useNavigate()
    return <>
        <Nav.Item onClick={()=> navigate('/dashboard')}>Dashboard</Nav.Item>
        
    </>
}

function UserNavLinks(){
  let navigate = useNavigate()
    return <>
        <Nav.Item onClick={()=>navigate('/home')}>Home</Nav.Item>
        <Nav.Item onClick={()=>navigate('/dashboard')}>Dashboard</Nav.Item>
        <Nav.Item onClick={()=>navigate('/create')}>Create</Nav.Item>

    </>
}

export default Header