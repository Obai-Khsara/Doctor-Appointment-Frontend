import React from 'react'
import HeroSlider from '../components/HeroSlider'
import CallToAction from '../components/CallToAction'
import About from '../components/About'
import States from '../components/States'
import Departments from '../components/Departments'
import Doctors from '../components/Doctors'

const Home = () => {
    return (
        <div>
            <HeroSlider />
            <CallToAction />
            <About />
            <States />
            <Departments />
            <Doctors />
        </div>
    )
}

export default Home