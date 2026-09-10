import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'
import { useDoctors } from '../hooks/useDoctor.js'
import { useAddAppointment } from '../hooks/useAppointments.js'

const AddAppointment = () => {

    const { data: doctors = [] } = useDoctors()
    const { mutate: addAppointment, isPending } = useAddAppointment()
    const { user } = useContext(AuthContext)
    const [form, setForm] = useState({
        doctor: "",
        date: "",
        reason: ""
    })


    // to add user input to form useState
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault()
        addAppointment(form, {
            onSuccess: () => {
                toast.success("Appointment Added Successfully")
                setForm({ doctor: "", date: "", reason: "" })
            },
            onError: (err) => {
                toast.error(err.message)
            },
        })
    }

    // if there is no user
    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen text-xl">
                You need to login to create an appointment.
            </div>
        )
    }



    return (
        <div className='flex justify-center items-center h-screen bg-gray-100'>

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Add Appointment
                </h2>

                <label className="block mb-2 text-sm font-semibold">Doctor</label>
                <select
                    name='doctor'
                    value={form.doctor}
                    onChange={handleChange}
                    required
                    className="w-full mb-4 p-2 border rounded"
                >
                    <option value="">Select doctor</option>
                    {doctors?.map((doc) => (
                        <option key={doc._id} value={doc._id}>
                            {doc?.name} - {doc?.speciality}
                        </option>
                    ))}
                </select>

                <label className="block mb-2 text-sm font-semibold">Date</label>
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    className="w-full mb-4 p-2 border rounded"
                />

                <label className="block mb-2 text-sm font-semibold">Reason</label>
                <textarea
                    name="reason"
                    value={form.reason}
                    onChange={handleChange}
                    required
                    className="w-full mb-4 p-2 border rounded h-24 resize-none"
                    placeholder="Describe your reason for the appointment..."
                />

                {/* FIXED: Added proper button styling */}
                <button
                    type='submit'
                    className='btn-default w-full py-2 rounded  text-white font-semibold transition duration-200'
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default AddAppointment