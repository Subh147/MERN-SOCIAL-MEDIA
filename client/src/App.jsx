import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./Home"
import Create from "./Pages/Create"
import Profile from "./Pages/Profile"
import Search from "./Pages/Search"
import Sidebar from './Components/Sidebar'
import Registration from './Pages/Registration'
import Login from './Pages/Login'
import CheckPrivateRoute from './Pages/CheckPrivateRoute'
import ChechPrivateRoute2 from './Pages/ChechPrivateRoute2'
import Comment from './Pages/Comment'
import CheckPrivateRoute3 from './Pages/CheckPrivateRoute3'
import Savepost from './Pages/Savepost'




function App() {
  

  return (
    <>
      <BrowserRouter>
    <Sidebar/>
    <div className='lg:ml-[260px] lg:pl-10 bg-slate-900'>
        <Routes>
        <Route path='/' element={<Home/>} />
          {/* <Route path='/createpost' element={<Create/>} /> */}
          {/* <Route path='/profile' element={<Profile/>} /> */}
          <Route path='/search' element={<Search/>} />
          <Route path='/reg' element={<Registration/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/comment' element={<Comment/>} />
          
          

          <Route path='/private' element={<CheckPrivateRoute/>} >
          <Route path='createpost' element={<Create/>} />
          </Route>

          <Route path='/private2' element={<ChechPrivateRoute2/>} >
          <Route path='profile' element={<Profile/>} />
          </Route>

          <Route path='/private3' element={<CheckPrivateRoute3/>} >
          <Route path='savepost' element={<Savepost/>} />
          </Route>

          
        </Routes>
      </div>
      </BrowserRouter>
        
    </>
  )
}

export default App
