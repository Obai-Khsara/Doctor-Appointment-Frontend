import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDoctor, useRelatedDoctors } from '../hooks/useDoctor.js'

const DoctorDetails = () => {

    const { id } = useParams()

    const { data: doctor, isError: doctorError, error: doctorErr } = useDoctor(id)
    const speciality = doctor?.speciality?.toLowerCase()

    const { data: relatedDoctors = [], isError: relatedError, error: relatedErr } =
        useRelatedDoctors(speciality, doctor?._id)

    if (doctorError) toast.error(doctorErr.message)
    if (relatedError) toast.error(relatedErr.message)



    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl p-8 m-auto min-h-screen'>

            <div className='md:col-span-2 flex flex-col md:flex-row items-center'>

                <img loading='lazy'
                    className="w-64 h-64 object-cover rounded-lg shadow-md mb-6 md:mb-0 md:mr-10"
                    src={` https://doctor-appointment-backend-umot.onrender.com/uploads/${doctor?.image}`} alt={doctor?.name} />

                <div className='space-y-4'>
                    <h2 className='text-4xl font-bold text-[#008e9b]'>{doctor?.name}</h2>
                    <p className='text-xl text-gray-700'>{doctor?.speciality}</p>
                    <p className='text-gray-600'>{doctor?.experienceYears} Year of Exprience</p>

                    <p>{doctor?.description}</p>
                </div>

            </div>


            <div>
                <h3 className='text-2xl mb-3 text-[#008e9b]'>
                    Other {doctor?.speciality} Doctors
                </h3>

                <div className='space-y-4'>
                    {relatedDoctors.length > 0 ? (
                        relatedDoctors?.map((doc) => (
                            <Link className="flex items-center bg-white rounded-lg shadow p-3 " key={doc?._id} to={`/doctor/${doc?._id}`}>

                                <img loading='lazy'
                                    className="w-16 h-16 rounded-full object-cover border mr-4" src={` https://doctor-appointment-backend-umot.onrender.com/uploads/${doc?.image}`} />
                                <div >
                                    <h4>{doc?.name}</h4>
                                    <p>Experience: {doc?.experienceYears} years</p>

                                </div>
                            </Link>
                        ))
                    ) :
                        <p className="text-gray-500">No related doctors found.</p>
                    }
                </div>
            </div>

        </div>
    )
}

export default DoctorDetails