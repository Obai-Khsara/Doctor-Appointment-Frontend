import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDoctors } from "../hooks/useDoctor.js"

const AllDoctors = () => {

    const { data: doctors, isLoading, isError, error } = useDoctors()

    if (isError) toast.error(error.message)


    return (
        <div className='p-8 bg-gray-100 min-h-screen'>

            <h2 className='text-3xl font-bold text-center mb-8 text-[#008e9b]'>
                Our Doctors
            </h2>

            {isLoading && <p className="text-center">Loading...</p>}

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto'>

                {doctors?.map((doc) => (
                    <div className="bg-white rounded-lg shadow p-4 text-center" key={doc?._id}>
                        <Link to={`/doctor/${doc?._id}`}>
                            <img loading='lazy'
                                className="w-32 h-32 mx-auto rounded-full object-cover border mb-4"
                                src={doc?.image} />

                            <h3 className="text-xl font-semibold">{doc?.name}</h3>

                            <p className="text-gray-600">{doc.speciality}</p>

                            <p className='text-sm text-gray-500'>{doc?.experienceYears} Years Of Exprerience</p>



                        </Link>

                    </div>
                ))}
            </div>

        </div>
    )
}

export default AllDoctors