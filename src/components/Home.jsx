import React,{useEffect,useState} from 'react'
import AxiosService from '../utils/ApiService'
import UseLogout from '../hooks/UseLogout'
import BlogTile from './common/BlogTile'
import { toast } from 'react-toastify';

function Home() {
  let [blogs,setBlogs] = useState([])
  let logout = UseLogout()
  let getBlogs = async()=>{
    try {
        let res = await AxiosService.get('/dashboard')
        if(res.status===200)
        {
          setBlogs(res.data.blogs)
        }
    } catch (error) {
      toast.error(error.response.data.message)
      if(error.response.status===401)
      {
        logout()
      }
    }
  }

  useEffect(()=>{
    getBlogs()
  },[])
  return <div className='container-fluid'>
    <div className='blogs-wrapper1'>
      {
        blogs.map((e)=>{
          return <BlogTile blog={e} key={e._id}/>
        })
      }
    </div>
  </div>
}

export default Home