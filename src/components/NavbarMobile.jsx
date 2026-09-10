import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { AuthContext } from '../context/AuthContext'


const NavbarMobile = () => {

    const { user, logout, setIsMenuOpen } = useContext(AuthContext)

    return (
        <div className="fixed w-full h-full bg-white text-[#008e9b] top-0 left-0">

            <div className="text-right p-10">
                <button onClick={() => setIsMenuOpen(false)}>
                    <i className="fa-solid fa-xmark fa-xl cursor-pointer text-black"></i>
                </button>
            </div>

            <ul className="flex flex-col items-center gap-3 text-xl">
                <li>
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>
                        Home
                    </Link>
                </li>

                <li>
                    <HashLink smooth to="/#services" onClick={() => setIsMenuOpen(false)}>
                        Services
                    </HashLink>
                </li>

                <li>
                    <HashLink smooth to="/#about" onClick={() => setIsMenuOpen(false)}>
                        About
                    </HashLink>
                </li>

                {
                    user?.role === "admin" &&
                    (<>
                        <li>
                            <Link to="/adddoctor" onClick={() => setIsMenuOpen(false)}>
                                Add Doctor
                            </Link>
                        </li>

                        <li>
                            <Link to="/" onClick={() => setIsMenuOpen(false)}>
                                Add Department
                            </Link>
                        </li>
                    </>)
                }

                {
                    user?.role === "user" &&
                    <>
                        <li>
                            <Link to="/myappointments" onClick={() => setIsMenuOpen(false)}>
                                My Appointments
                            </Link>
                        </li>

                        <li>
                            <Link to="/addappointment" onClick={() => setIsMenuOpen(false)}>
                                Add Appointment
                            </Link>
                        </li>
                    </>
                }

                {
                    !user &&
                    <>
                        <li>
                            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                Login
                            </Link>
                        </li>

                        <li>
                            <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                                Register
                            </Link>
                        </li>
                    </>
                }


                {
                    user &&
                    <li>
                        <button className="cursor-pointer"
                            onClick={() => {
                                logout()
                                setIsMenuOpen(false)
                            }
                            }>
                            Logout
                        </button>
                    </li>
                }
            </ul>
        </div>
    )
}

export default NavbarMobile