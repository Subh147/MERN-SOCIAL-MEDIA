import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode"



const Create = () => {

  const[img,setImg]=useState("")
  const[postname,setPostName]=useState("")
  const[username,setUsername]=useState("")
  const[userPic,setUserPic]=useState("")
  const [cookies, setCookie,removeCookie] = useCookies(['token']);
  const [file,setFile] = useState("")

   

  useState(()=>{
    setUsername(localStorage.getItem("username"))
  },[username,setUsername])

   

  console.log("this is",username)
  console.log("this is image",img)
  
  // ------------------------------------save post pic
  const savepost = async() =>{
    const formdata = new FormData()
    formdata.append("file",file)
    await axios.post("http://localhost:3000/api/savePostPic",formdata)
    .then(()=>{
      console.log("data created success")
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  //----------------------------------save user pic
  const saveuserpic = async(postname) =>{
    await axios.post("http://localhost:3000/api/userPic",{username})
    .then((e)=>{
      console.log("user profile picture found",e.data.profilePic)
      console.log("postname",postname)
      const userpic = e.data.profilePic
      axios.post("http://localhost:3000/api/saveuserpic",{userpic,postname})
      .then(()=>{
        console.log("Profile Picture has been saved for this Post.")
      })
      .catch((err)=>{
        console.log("error in Profile Picture saved for this Post.",err)
      })
    })
    .catch(()=>{
      alert("error in find the user pic")
    })
  }

  //----------------------------------handle create
  const handleSubmit = (e) =>{
    e.preventDefault()

    setUsername(localStorage.getItem("username"))
    
    //----------------------------------------create pic
    const date = new Date()
    const modDate = date.toLocaleString()
    
    
    

    axios.post("http://localhost:3000/api/createPost",{postname,username,modDate})
    .then(()=>{
      alert("POST CREATED SUCCESS")
      // console.log(cookies)
      
    })
    .catch((err)=>{
      alert("POST NOT CREATED",err)
    })

    
    savepost()
    saveuserpic(postname)
    
  }

  useEffect(()=>{
    if(username){
      axios.post("http://localhost:3000/api/userPic",{username})
     .then((e)=>{
       setUserPic(e.data)
       console.log("Send username",userPic)
       
     })
     .catch((err)=>{
      console.log(err)
     })
    }
  },[img])
  


  return (
    <div className="h-[100vh] w-[40vw]">
      {/* <!-- component --> */}
<div className="bg-grey-lighter min-h-screen flex flex-col w-[60vw]  pl-96 ">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 ">
                <div className="bg-blue-600 px-6 py-8 rounded text-black w-full shadow-sm shadow-white" >
                    <h1 className="mb-8 text-3xl text-center">Create a Post</h1>

                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="description"
                        placeholder="Description"
                         onChange={(e)=>setPostName(e.target.value)}
                         />
                   <input className="block border border-grey-light w-full p-3 rounded mb-4"
                   type="file"
                    name="file" 
                    id="" 
                   onChange={(e)=>setFile(e.target.files[0])
                   }/>

<div className="flex place-content-center">
<button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium text-2xl  rounded-lg  px-5 py-2.5 text-center me-2 mb-2" onClick={handleSubmit}>Get Notished</button>
</div>

                    
                </div>

                
            </div>
        </div>
    </div>
  );
};

export default Create;
