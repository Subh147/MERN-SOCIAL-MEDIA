import axios from "axios"

import { useEffect, useState } from "react"


const Comment = () => {
    
    const[comment, setComment] = useState("")
    // const[postId, setpostId] = useState("")
    const[commentData, setCommentData] = useState([])

    const handleSubmit =()=>{
        let username = localStorage.getItem("username")
        let postId = localStorage.getItem("postId")
        const date = new Date()
        const modDate = date.toLocaleString()
         
        console.log("comment post ==> ",comment, username, postId)

        axios.post("http://localhost:3000/api/addcomment",{username,postId,comment,modDate})
    .then((e)=>{
      console.log("post  added successfully");
      alert(e.data)
    })
    .catch(()=>{
      console.log("Error in adding the Postcomment")
    })
    }

    // useEffect(()=>{
        let postId = localStorage.getItem('postId')
        axios.post("http://localhost:3000/api/getcomment",{postId})
        .then((e)=>{
            // console.log(e.data)
            setCommentData(e.data)
        })
        .catch((err)=>{
            console.log("error for fetching comments",err)
        })
    // },[])
    

  return (
    <div className="h-[100vh] bg-slate-900">
<div className="pt-20">
<div className="bg-blue-500 text-white p-4 w-[655px] ml-96 ">
    <h1 className="text-lg font-bold ">Comment Section</h1>
    {
        commentData.map((item,index)=>(
    <div key={index} className="bg-white p-4 shadow-lg mt-4 rounded-lg ">
    <h1 className="my text-black">User : {item.username} {item.date}</h1>
        <p className="text-black py-2">{item.comment}</p>
    </div>
        ))
    }

    
</div>
</div>
    <div>
      <div className="flex items-center border border-blue-500 rounded-lg p-2 fixed bottom-0 w-[655px] ml-96 my-20 bg-white">
    <input type="text" className="w-full outline-none text-gray-700" placeholder="Type your message..." onChange={(e)=>setComment(e.target.value)}/>
    <button className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg" onClick={handleSubmit}>Send</button>
</div>
    </div>
    </div>
  )
}

export default Comment
