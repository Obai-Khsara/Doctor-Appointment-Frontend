import Login from './components/Login'
import Navbar from './components/Navbar'
import Register from './components/Register'
import AddAppointment from "./pages/AddAppointment.jsx"
import AddDoctor from './pages/AddDoctor.jsx'
import AllDoctors from './pages/AllDoctors.jsx'
import DoctorDetails from './pages/DoctorDetails.jsx'
import Home from './pages/Home'
import { Route, Routes } from "react-router-dom"
import MyAppointment from './pages/MyAppointment.jsx'
import { ToastContainer } from "react-toastify"
import NavbarMobile from './components/NavbarMobile.jsx'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import NotFound from './pages/NotFound.jsx'


function App() {

  const { isMenuOpen } = useContext(AuthContext)

  return (
    <>
      <Navbar />
      <Routes >
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/alldoctors" element={<AllDoctors />} />
        <Route path="/doctor/:id" element={<DoctorDetails />} />

        <Route path="/adddoctor" element={<RequireAuth roles={["admin"]}><AddDoctor /></RequireAuth>} />


        <Route path="/addappointment" element={<RequireAuth><AddAppointment /></RequireAuth>} />
        <Route
          path="/myappointments"
          element={<RequireAuth><MyAppointment /></RequireAuth>}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>


      {/* Present or Hide menu in small screen */}
      {
        isMenuOpen && <NavbarMobile />
      }

      <ToastContainer position='top-right' autoClose={2500} />
    </>
  )
}

export default App
