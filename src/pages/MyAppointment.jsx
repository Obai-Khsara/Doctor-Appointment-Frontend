import { toast } from 'react-toastify'
import { useMyAppointments, useCancelAppointment } from '../hooks/useAppointments'

const MyAppointment = () => {
    const { data: appointments = [], isError, error } = useMyAppointments()
    const { mutate: cancelAppointment } = useCancelAppointment()

    if (isError) toast.error(error.message)



    const handleCancel = (id) => {
        cancelAppointment(id, {
            onSuccess: () => toast.success("Appointment Deleted Successfully"),
            onError: (err) => toast.error(err.message),
        })
    }


    return (
        <div className="p-8 bg-gray-100 min-h-screen">

            <h2 className='text-3xl font-bold text-center mb-8 text-[#008e9b]'>
                My Appointments
            </h2>

            {error && <p className='text-red-500 text-center mb-4'>{error}</p>}

            <div className='space-y-6 max-w-3xl mx-auto'>
                {appointments?.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No appointments found
                    </p>
                ) : (
                    appointments?.map((app) => (
                        <div key={app?._id} className="flex items-center justify-between bg-white shadow p-4 rounded-lg">

                            <div className='flex  items-center gap-4'>


                                <img loading='lazy'
                                    className='w-20 h-20 rounded-full object-cover border' src={app?.doctor?.image} />

                                <div>

                                    <h3 className="text-xl font-semibold">{app.doctor?.name}</h3>
                                    <p className="text-gray-600">{app.reason}</p>
                                    <p>{new Date(app?.date).toLocaleDateString()}</p>

                                </div>
                            </div>

                            <button className='text-white bg-[#46daea] py-4 cursor-pointer px-2 rounded-full flex items-center justify-center'
                                onClick={() => {
                                    if (window.confirm("Are you sure you want to cancel this appointment?")) {
                                        handleCancel(app?._id);
                                    }
                                }}>
                                <i className="fa-solid fa-xmark fa-xl"></i>
                            </button>

                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default MyAppointment