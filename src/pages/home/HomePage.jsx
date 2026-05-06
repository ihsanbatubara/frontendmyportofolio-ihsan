import React from 'react'
import MainLayout from '../../components/MainLayout'
import Hero from './container/Hero'
import About from './container/About'
import Skills from './container/Skills'
import Project from './container/Project'
import Contact from './container/Contact'
import Articles from './container/Articles'
import Transition from '../../components/Transition'


const HomePage = () => {
  return (
    <MainLayout>
       <Hero /> 
       <About /> 
       <Skills /> 
       {/* <Project /> */}
       <Articles />
       {/* <Contact /> */}
    </MainLayout>
  )
}

export default Transition(HomePage)
