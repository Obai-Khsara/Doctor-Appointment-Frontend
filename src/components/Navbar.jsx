import React, { useContext } from 'react'
import logo from "../img/logo-1.png"
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { HashLink } from "react-router-hash-link"



const Navbar = () => {

    const { user, logout, setIsMenuOpen } = useContext(AuthContext)

    return (
        <nav className='p-2 md:p-0 bg-white shadow-md text-[#008e9b] flex justify-between items-center'>

            <div>
                <img className="w-32" src={logo} alt="logo" loading='lazy' />
            </div>

            <ul className='space-x-6 items-center px-4 hidden md:flex'>
                <li>
                    <Link to="/">
                        Home
                    </Link>
                </li>

                <li>
                    <HashLink smooth to="/#services">
                        Services
                    </HashLink>
                </li>

                <li>
                    <HashLink smooth to="/#about">
                        About
                    </HashLink>
                </li>

                {
                    user?.role === "admin" &&
                    (<>
                        <li>
                            <Link to="/adddoctor">
                                Add Doctor
                            </Link>
                        </li>

                        <li>
                            <Link to="/">
                                Add Department
                            </Link>
                        </li>
                    </>)
                }

                {
                    user?.role === "user" &&
                    <>
                        <li>
                            <Link to="/myappointments">
                                My Appointments
                            </Link>
                        </li>

                        <li>
                            <Link to="/addappointment">
                                Add Appointment
                            </Link>
                        </li>
                    </>
                }

                {
                    !user &&
                    <>
                        <li>
                            <Link to="/login">
                                Login
                            </Link>
                        </li>

                        <li>
                            <Link to="/register">
                                Register
                            </Link>
                        </li>
                    </>
                }


                {
                    user &&
                    <li>
                        <button className="cursor-pointer" onClick={logout}>
                            Logout
                        </button>
                    </li>
                }


            </ul>

            <div className="block md:hidden">
                <button onClick={() => setIsMenuOpen(true)}>
                    <i className="fa-solid fa-bars-staggered fa-2xl cursor-pointer"></i>
                </button>
            </div>

        </nav>
    )
}

export default Navbar