import React, { useContext, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import Avatar from "../img/doctors-2.jpeg"
import { toast } from 'react-toastify'
import { useAddDoctor } from '../hooks/useDoctor.js'


const AddDoctor = () => {

    const { user } = useContext(AuthContext)
    const fileInputRef = useRef(null)
    const [form, setForm] = useState({
        name: "",
        description: "",
        speciality: "",
        experienceYears: "",
        image: null
    })
    const [preview, setPreview] = useState(null)
    const [error, setError] = useState(null)

    const { mutate: addDoctor, isPending } = useAddDoctor()

    const handleChange = (e) => {
        const { name, value, files } = e.target

        if (files) {
            const file = files[0]
            setForm({ ...form, image: file })
            setPreview(URL.createObjectURL(file))
        } else {
            setForm({ ...form, [name]: value })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError(null)

        if (!form.image) {
            toast.error("Please Upload a doctor image")
            setError("Please upload a doctor image")
            return
        }

        const formData = new FormData()
        formData.append("name", form.name)
        formData.append("description", form.description)
        formData.append("speciality", form.speciality)
        formData.append("experienceYears", form.experienceYears)
        formData.append("image", form.image)

        addDoctor(formData, {
            onSuccess: () => {
                toast.success("Doctor Added Successfully")
                setForm({ name: "", description: "", experienceYears: "", speciality: "", image: null })
                setPreview(null)
            },
            onError: (err) => {
                toast.error(err.message)
                setError(err.response?.data?.message || "Something went wrong")
            },
        })
    }


    // if the user isn't an admin
    if (!user || user.role !== "admin") {
        return (
            <div className="flex  justify-center items-center h-screen">
                Only admin can add doctors
            </div>
        )
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">

            <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl flex gap-8"
                encType='multipart/form-data' onSubmit={handleSubmit}>

                <div className="flex flex-col items-center w-1/3">
                    <div className='w-32 h-32 overflow-hidden rounded-full border-2 border-gray-300'>

                        {
                            preview ? (
                                <img src={preview} className="object-cover w-full h-full" loading='lazy' />
                            ) :
                                (<img src={Avatar} loading='lazy' />)
                        }


                    </div>
                    <button
                        type="button"
                        className='btn-default mt-4'
                        onClick={() => fileInputRef.current.click()}
                    >
                        Choose Image
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        name="image"
                        accept='image/*'
                        onChange={handleChange}
                        className='hidden'
                    />
                </div>

                <div className="w-2/3">
                    <h2 className="text-2xl font-bold mb-6 text-[#008e9b] text-center">
                        Add New Doctor
                    </h2>

                    {error && <p className="text-red-500">{error}</p>}

                    <label className="block mb-2 font-semibold">Name</label>
                    <input
                        value={form.name}
                        onChange={handleChange}
                        type="text"
                        name="name"
                        required
                        className="w-full mb-4 p-2 border rounded"
                    />

                    <label className="block mb-2 font-semibold">Speciality</label>
                    <input
                        value={form.speciality}
                        onChange={handleChange}
                        type="text"
                        name="speciality"
                        required
                        className="w-full mb-4 p-2 border rounded"
                    />

                    <label className="block mb-2 font-semibold">Experience Years</label>
                    <input
                        value={form.experienceYears}
                        onChange={handleChange}
                        type="number"
                        name="experienceYears"
                        required
                        className="w-full mb-4 p-2 border rounded"
                    />

                    <label className="block mb-2 font-semibold">Description</label>
                    <input
                        onChange={handleChange}
                        value={form.description}
                        type="text"
                        name="description"
                        required
                        className="w-full mb-4 p-2 border rounded"
                    />

                    <button type="submit" disabled={isPending} className="w-full py-2 rounded bg-[#008e9b] text-white hover:bg-[#007a85] disabled:opacity-50">
                        {isPending ? "Adding..." : "Add Doctor"}
                    </button>
                </div>

            </form>
        </div>
    )
}

export default AddDoctor