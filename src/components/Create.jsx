import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BlogTile from './common/BlogTile';
import AxiosService from '../utils/ApiService';
import { useNavigate } from 'react-router-dom';
import UseLogout from '../hooks/UseLogout';
import { toast } from 'react-toastify';


function Create() {
  let [title,setTitle] = useState("")
  let [imageUrl,setImage] = useState("")
  let [description,setDescription] = useState('')
  let navigate = useNavigate()
  let logout = UseLogout()
  let createBlog = async()=>{
    try {
      let res = await AxiosService.post('/blogs/create',{title,imageUrl,description})
      if(res.status===201)
      {
        toast.success(res.data.message)
        navigate('/dashboard')
      }
    } catch (error) {
      toast.error(error.response.data.message)
      if(error.response.status===401)
      {
        logout()
      }
    }
  }
  return <>
    <div className="container-fluid">
    <div className="row g-0 justify-content-center align-items-center">
    <div className="col-md-8 col-lg-6">
      <div className="d-flex align-items-center p-5">
        <div className="container">
          <div className="row">
            <div className="col-md-9 text-center ps-4">
              <h3 className="mb-4">Share Your Thoughts here!</h3>
            </div>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Title"  onChange={(e)=>setTitle(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image Url</Form.Label>
        <Form.Control type="text" placeholder="Image Url"  onChange={(e)=>setImage(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" placeholder="Description" style={{ height: '100px' }} onChange={(e)=>setDescription(e.target.value)}/>
      </Form.Group>

        <h2 style={{textAlign:"center"}}>Preview</h2>
        <div className='blogs-wrapper'>
     
          <BlogTile blog={{title,imageUrl,description}}/>
        </div> 
      <div style={{textAlign:"center"}}>
        <Button variant="primary" onClick={()=>createBlog()}>
          Submit
        </Button>
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

export default Create