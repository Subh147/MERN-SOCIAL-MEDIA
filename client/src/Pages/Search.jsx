import { useEffect, useState } from "react"
import ProfileCard from "../Components/ProfileCard"
import axios from "axios"
import { RiH1 } from "react-icons/ri"

const Search = () => {
  const [searchQuerry,setSearchQuerry] = useState("")
  const [userData,setUserData] = useState([])

  const handleButton = () =>{
    axios.post("http://localhost:3000/api/search",{searchQuerry})
      .then((e)=>{
        console.log(e.data)
        setUserData(e.data)
        if(e.data === "No such user exists!"){
          alert(e.data);
        }
      })
      .catch((err)=>{
        console.log("error in search",err)
      })
  }

  

  console.log(searchQuerry)

  return (
    <div className="h-[100vh] ">
      
      <div className="shadow p-4 flex">
        <span className="w-auto flex justify-end items-center text-grey p-2">
            {/* <i className="material-icons text-3xl">search</i> */}
        </span>
        <input className="w-full rounded p-2" type="text" placeholder="Try 'all'" name="searchQuerry" onChange={(e)=>setSearchQuerry(e.target.value)}/>
        <button className="bg-red-light hover:bg-red-lighter rounded text-white p-2 pl-4 pr-4" onClick={handleButton}>
                <p className="font-semibold text-xl">Search</p>
        </button>
    </div>
    <div className="flex flex-wrap place-content-center gap-4">
      {
        
        userData.map((data)=>(

         // eslint-disable-next-line react/jsx-key
         <ProfileCard userdata={data} />
        )) 
      }
    </div>
    </div>
  )
}

export default Search
