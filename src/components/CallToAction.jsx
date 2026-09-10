import React from 'react'

const CallToAction = () => {
    return (
        <section className='bg-[#0097a5] text-white py-16'>
            <div className="text-center px-4 max-w-4xl mx-auto">
                <h3 className="text-3xl mb-4 font-bold">
                    In an emergency? Need help now?
                    <p className="mt-2 mb-2">
                        Our team is available 24/7 to provide urgent care and immediate medical assistance whenever you need it most
                    </p>
                    <button className="mt-2 btn-default">
                        Make an appointment
                    </button>
                </h3>
            </div>
        </section>
    )
}

export default CallToAction