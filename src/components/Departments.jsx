import { toast } from 'react-toastify'
import { useDepartments } from '../hooks/useDepartments'
import { useEffect, useState } from 'react'


const Departments = () => {

    const { data: departments = [], isError, error } = useDepartments()
    const [activeTab, setActiveTab] = useState(null)


    useEffect(() => {
        if (departments.length > 0 && !activeTab) {
            setActiveTab(departments[0]._id)
        }
    }, [departments, activeTab])

    if (isError) toast.error(error.message)



    const handleTabClick = (id) => {
        setActiveTab(id)
    }



    return (
        <section id='services' className=" py-12 bg-white max-w-6xl mx-auto px-4">

            <div className='mb-8 text-center'>
                <h2 className="text-3xl font-bold mb-2">Departments</h2>
                <p className="text-gray-600 max-w-xl mx-auto">
                    Explore our specialized medical departments staffed with expert doctors.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Tabs List */}

                <ul className='flex md:flex-col space-x-4 md:space-x-0 border-b md:border-b-0 md:border-r  border-gray-300'>

                    {departments.map((dep) => (
                        <li key={dep._id}>
                            <button
                                onClick={() => handleTabClick(dep._id)}
                                className={`w-40 mr-4 block mt-3 px-4 py-2 rounded-t md:rounded-tr-none  md:rounded-1 ${activeTab === dep._id ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                                {dep?.name}
                            </button>
                        </li>
                    ))}

                </ul>
                {/* Tab Content */}

                <div className='flex-1 bg-gray-50 p-6 rounded shadow'>
                    {departments?.map((dep) => (
                        dep?._id === activeTab ? (
                            <div key={dep._id} className="flex flex-col md:flex-row items-center gap-6">

                                <div className=''>
                                    <h3 className='font-bold text-[#008e9b] mb-2 text-2xl '>{dep?.name}</h3>
                                    <p>{dep?.description}</p>
                                </div>

                                {/* for image */}
                                <div className="w-48 h-48">
                                    <img loading='lazy'
                                        src={dep?.image}
                                        alt={dep?.name} className="w-full h-full object-cover rounded" />
                                </div>

                            </div>
                        ) : null
                    )
                    )}
                </div>
            </div>



        </section >
    )
}

export default Departments