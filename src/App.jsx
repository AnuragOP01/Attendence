import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login'
import Service from './components/Service'
import Navbar from './components/Navbar'
import Page from './Page/Page';
import Signup from './components/Signup';
import Home from './Page/Home';
import Admission from './components/Admission';

function App() {
  
  return (
    <div className='contain bt-0'>
    <div className="cont h-screen w-full mt-0">
      
     <BrowserRouter>
      <Routes>
          <Route path='/' element={<Navbar/>}>
          <Route index element={<Home/>}/>
          <Route path="login" element={<Login/>} />
          <Route path="signup" element={<Signup/>} />
          <Route path='page' element={<Page/>}/>
          <Route path='admission' element={<Admission/>}/>
          </Route>
          
      </Routes>
    </BrowserRouter>

    </div>

    


    </div>
  )
}

export default App
