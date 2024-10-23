import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login'
import Service from './components/Service'
import Navbar from './components/Navbar'
import Attendence from './Attendence/Attendence';
import Signup from './components/Signup';
import Home from './Attendence/Home';
import Admission from './components/Admission';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

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
          <Route path='attendence' element={<Attendence/>}/>
          <Route path='admission' element={<Admission/>}/>
          {/* <Route path='service' element={<Service/>}/> */}
          </Route>
          
      </Routes>
        <ToastContainer />
    </BrowserRouter>

    </div>

    </div>
  )
}

export default App
