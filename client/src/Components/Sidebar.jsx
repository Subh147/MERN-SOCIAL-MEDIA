import { IoHomeSharp } from "react-icons/io5";
import { MdAddCircleOutline } from "react-icons/md";
import { FaSearch,FaBookmark } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../pic/logoipsum-321.svg"
import girl1 from "../pic/1990s beautiful blonde Supergirl.jpg"
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"
import { useCookies } from 'react-cookie';
import axios from "axios";




const Sidebar = () => {

    const[username,setUsername]=useState("");
    const[useremail,setUseremail]=useState("");
    const[userProfilePic,setUserProfilePic]=useState("");
    const [cookies, setCookie,removeCookie] = useCookies(['token']);
    const[savepostLength,setSavepostLength] = useState("")
    console.log(cookies)

    const navigate = useNavigate()
    const handleNavigate = () =>{
        navigate("/reg")
    }

    const handleNavigate2 = () =>{
        navigate("/login")
    }

    const handleLogout = () =>{
        removeCookie("token")
        console.log("all ok")
        navigate("/login")
        localStorage.removeItem("username")
    }
    
    useEffect(()=>{
        if(cookies.token){
        setUsername(jwtDecode(cookies.token).username)
        setUseremail(jwtDecode(cookies.token).email)
        // setUserProfilePic(jwtDecode(cookies.token).profilepic)
        axios.post("http://localhost:3000/api/userPic",{username})
        .then((e)=>{
      console.log("this is for profilepic",e.data)
      setUserProfilePic(e.data.profilePic)
    })
        }else{
            console.log(username)
            setUsername(false)
            setUseremail(false)
            setUserProfilePic(false)
        }
    },[cookies,username])

    // console.log(username,useremail)

    

  return (
    <>

{/* <!-- component --> */}
{/* <!DOCTYPE html> */}
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css" />
    </head>
    <body className="bg-blue 600 ">    
        <div className="container flex flex-col mx-auto bg-blue 600">
            <aside className="group/sidebar flex flex-col shrink-0 lg:w-[300px] w-[250px] transition-all duration-300 ease-in-out m-0 fixed z-40 inset-y-0 left-0 bg-slate-900  sidenav fixed-start loopple-fixed-start border-r-2" id="sidenav-main"><div className="flex shrink-0 px-8 items-center justify-between h-[96px]">
            <a className="transition-colors duration-200 ease-in-out" href="https://www.loopple.com">
            <img alt="Logo" src={logo} className="inline"/>
            </a>
        </div>

        <div className="  lg:block dark:border-neutral-700/70 border-neutral-200"></div>

        <div className="flex items-center justify-between px-8 py-5">
            <div className="flex items-center mr-5 ">
            <div className="mr-5">
                <div className="inline-block relative shrink-0 cursor-pointer rounded-[.95rem]">
                <img className="w-[40px] h-[40px] shrink-0 inline-block rounded-[.95rem]" src={userProfilePic ? `../public/images/${userProfilePic}` : `https://imgs.search.brave.com/IZ7MIsbaofm0u4O4wocApdZPKT_2d0pLsAfOl1Nr0Bg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by91/c2VyLXByb2ZpbGUt/ZnJvbnQtc2lkZV8x/ODcyOTktMzk1OTUu/anBnP3NpemU9NjI2/JmV4dD1qcGc`} alt="avatar image"/>
                </div>
            </div>
            <div className="mr-2 ">
                <a href="javascript:void(0)" className="dark:hover:text-primary hover:text-primary transition-colors duration-200 ease-in-out text-[1.075rem] font-medium dark:text-neutral-400/90 text-secondary-inverse">{username ? username : `user`}</a>
                {/* <span className="text-secondary-dark dark:text-stone-500 font-medium block text-[0.85rem]">{useremail ? useremail :"userEmail"}</span> */}
            </div>
            </div>
            <a className="inline-flex relative items-center group justify-end text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-[.95rem] transition-colors duration-150 ease-in-out text-dark bg-transparent shadow-none border-0" href="javascript:void(0)">
            {/* <span className="leading-none transition-colors duration-200 ease-in-out peer shrink-0 group-hover:text-primary text-secondary-dark">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
            </span> */}
            </a>
        </div>

        <div className="hidden  lg:block dark:border-neutral-700/70 border-neutral-200"></div>

        <div className=" relative pl-5 my-4 mr-5">
            <div className="flex flex-col w-full font-medium ">

            {/* <!-- menu item --> */}
            <NavLink to="/" className="hover:bg-slate-400 rounded-xl transition ease-in-out delay-100" >
                <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem] gap-3">
                <IoHomeSharp className="text-2xl"/>
                {/* <NavLink to="/search" className="active:text-blue-600 text-2xl   ">Search</NavLink> */}
                <h1 className="text-2xl text-gray-300">Home</h1>
                </span>
            </NavLink>


            {/* <!-- menu item --> */}
            <NavLink to="/private" className="hover:bg-slate-400 rounded-xl transition ease-in-out delay-100">
                <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem] gap-3">
                <MdAddCircleOutline className="text-2xl "/>
                {/* <NavLink to="/search" className="active:text-blue-600 text-2xl   ">Search</NavLink> */}
                <h1 className="text-2xl text-gray-300">Create</h1>
                </span>
            </NavLink>


            {/* <!-- menu item --> */}
            <NavLink to="/search" className="hover:bg-slate-400 rounded-xl transition ease-in-out delay-100">
                <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem] gap-3">
                <FaSearch className="text-2xl"/>
                {/* <NavLink to="/search" className="active:text-blue-600 text-2xl   ">Search</NavLink> */}
                <h1 className="text-2xl text-gray-300">Search</h1>
                </span>
            </NavLink>

            <NavLink to="/private2" className="hover:bg-slate-400 rounded-xl transition ease-in-out delay-100">
                <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem] gap-3">
                <CgProfile className="text-2xl"/>
                {/* <NavLink to="/search" className="active:text-blue-600 text-2xl   ">Search</NavLink> */}
                <h1 className="text-2xl text-gray-300">Profile</h1>
                </span>
            </NavLink>

            <NavLink to="/private3" className="hover:bg-slate-400 rounded-xl transition ease-in-out delay-100">
                <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem] gap-3">
                <FaBookmark className="text-2xl"/>
                {/* <NavLink to="/search" className="active:text-blue-600 text-2xl   ">Search</NavLink> */}
                <h1 className="text-2xl text-gray-300">Save Posts</h1>
                <p className="text-white text-xl">{savepostLength}</p>
                </span>
            </NavLink>

            
            </div>
            </div>

            {/* <div className=" flex gap-7 mx-10 my-4 fixed bottom-0">
            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2 text-2xl" onClick={handleNavigate}>Sign In</button>
            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2 text-2xl" onClick={handleNavigate2}>Log In</button>
            </div> */}

            
            

            {
                !username ? <div className=" flex gap-7 mx-10 my-4 fixed bottom-0">
            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2 text-2xl" onClick={handleNavigate}>Sign In</button>
            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2 text-2xl" onClick={handleNavigate2}>Log In</button>
            </div> : <div className=" flex gap-7 mx-24 my-4 fixed bottom-0 place-content-center">
            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2 text-2xl" onClick={handleLogout}>Log Out</button>
            </div>
            }

        </aside>
        </div>
        
    </body>

    </>
  )
}

export default Sidebar
