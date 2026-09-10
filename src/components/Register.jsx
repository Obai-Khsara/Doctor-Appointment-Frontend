import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'


const Register = () => {

    const { login } = useContext(AuthContext)
    const [form, setForm] = useState({ email: "", password: "", name: "" })
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })


    const { mutate: register, isPending } = useMutation({
        mutationFn: (newUser) =>
            axios.post("https://doctor-appointment-backend-umot.onrender.com/user/register", newUser).then(res => res.data),
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        setError(null)

        register(form, {
            onSuccess: (data) => {
                if (data.token) {
                    login(data.token)
                    navigate("/")
                }
            },
            onError: (err) => {
                toast.error(err.message)
                setError(err.response?.data?.message || "Something went wrong")
            },
        })
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">

            <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>

                <h2 className="text-2xl mb-4 text-center font-bold">Register</h2>

                {error && <p className='text-red-500'>{error}</p>}

                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded"
                />
                <input
                    type="password"
                    required
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded"
                />
                <button disabled={isPending} className="btn-default w-full text-white py-2 rounded disabled:opacity-50">
                    {isPending ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    )
}

export default Register