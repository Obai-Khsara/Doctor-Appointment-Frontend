import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'


const Login = () => {

    const { login } = useContext(AuthContext)
    const [form, setForm] = useState({ email: "", password: "" })
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const { mutate: signIn, isPending } = useMutation({
        mutationFn: (credentials) =>
            axios.post("https://doctor-appointment-backend-umot.onrender.com/user/signin", credentials).then(res => res.data),
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        setError(null)
        signIn(form, {
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
                <h2 className="text-2xl mb-4 text-center font-bold">Login</h2>
                {error && <p className='text-red-500'>{error}</p>}
                <input type="email" name="email" required placeholder="Email" onChange={handleChange} className="w-full mb-3 p-2 border rounded" />
                <input type="password" name="password" required placeholder="Password" onChange={handleChange} className="w-full mb-3 p-2 border rounded" />
                <button disabled={isPending} className="btn-default w-full text-white py-2 rounded">
                    {isPending ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    )
}

export default Login