import React, { useEffect, useState } from 'react'

import { RiVerifiedBadgeFill } from "react-icons/ri";
import axios from 'axios';

const Profile = () => {

  const [username,setUsername] =useState("")
  const [userpic,setUserpic] =useState("")
  const [post,setPost] =useState([])
  const [postnumber,setPostNumber] =useState(0)

  
  useEffect(()=>{
    setUsername(localStorage.getItem('username'))
    axios.post("http://localhost:3000/api/userPic",{username})
    .then((e)=>{
      console.log("this is for profilepic",e.data)
      setUserpic(e.data.profilePic)
    })
    
    .catch((err)=>{
      // console.log(err)
    })
    
  },[username])

  useEffect(()=>{
    axios.post("http://localhost:3000/api/userpost",{username})
    .then((e)=>{
      console.log("Success to get user post",e.data)
      setPost(e.data)
      setPostNumber(e.data.length)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[username])
  
  const sendmessaage = (message) =>{
    alert(message)
  }

  const  handleClick = (post) =>{
    const pic = post.postImg
    const user=username 
    console.log(user)
    
      axios.post("http://localhost:3000/setuserpic",{pic,user})
      .then((e)=>{
        console.log("Userpic send success")
        sendmessaage(e.data)
        document.location.reload(true)
      })
      .catch((err)=>{
        console.log(err)
      })
  }


  return (
    <div className='pt-10'>
      

      <div className='h-[100%] text-white'>
      
        <section className='flex place-content-center mx-60 gap-10'>
          
            
            <img src={ `../public/images/${userpic}` } alt="" className='h-80 rounded-full w-80' />
          
          <div className='py-20'>
          <div className='flex gap-96'>
          <div className='flex gap-2'>
          <h1 className='text-3xl'>{username}</h1>
          <RiVerifiedBadgeFill className='text-3xl text-blue-800'/>
          </div>
          <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit Profile</button>
          </div>
          <div className='flex gap-5 my-2'>
            <p>Posts {postnumber}</p>
            <p>Followers 155</p>
            <p>Following  74</p>
          </div>
            <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci eaque, dolores illo quasi assumenda laudantium. Aperiam inventore reiciendis laudantium repudiandae quo nemo possimus reprehenderit molestiae, optio facilis cum corrupti, nulla maiores rerum architecto ratione, ea neque nam? Aliquid, adipisci debitis! Nulla eveniet, ea quia inventore culpa veniam, at ullam, aspernatur quae blanditiis vero a dolorem.</h2>
          </div>

          
        </section>
        <hr  className='mx-44 my-9'/>
        <section>
          <div className='flex place-content-center'>
            <h1>Posts</h1>
          </div>
          <div className='flex place-content-center py-8 gap-6 flex-wrap mx-44'>
          {
          post.map((post,index)=>(
            
            <div key={index} onClick={()=>handleClick(post)}>
            <img  src={`../public/images/${post.postImg}`} alt="" className='h-[400px]' />
            </div>
          
        ))
      }            
          </div>
        </section>
      </div>
    </div>
  )
}

export default Profile
