
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './components/Register'
import Signin from './components/Signin'
import Posts from './components/Posts'



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/signin' element={ <Signin /> } />
        <Route path='/posts' element={ <Posts /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App