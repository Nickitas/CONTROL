import React, { useState, Suspense, useEffect, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { checkAuth } from './Fetch'
import UpBtn from './components/UI/elements/UpBtn/UpBtn'
import ThemBtn from './components/UI/elements/ThemBtn/ThemBtn'

import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/Footer'
const Authorization = lazy(() => import('./components/Authorization/Authorization'))
const Home = lazy(() => import('./components/Home/Home'))
const Users = lazy(() => import('./components/Users/Users'))
const Cards = lazy(() => import('./components/Cards/Cards'))
const Hostels = lazy(() => import ('./components/Hostels/Hostels'))
const Operator = lazy(() => import('./components/Operator/Operator'))
const Reports = lazy(() => import('./components/Reports/Reports'))
const Other = lazy(() => import('./components/Other/Other'))
const Housekeeper = lazy(() => import('./components/Housekeeper/Housekeeper'))
const Politics = lazy(() => import('./components/Politics/Politics'))
const Profile = lazy(() => import('./components/Sidebar/Profile/Profile'))

const App = () => {

  const [isAuth, setIsAuth] = useState(false)
  const [success, setSuccess] = useState(false)
  const [state, setState] = useState('')
  const [lvl, setLvl] = useState(-1)
  
  useEffect(() => {
    checkAuth().then(e => {
        if(e.state){
          setLvl(e.body.rules.lvl)
          setIsAuth(true)
        }
        else {
          setLvl(-1)
          setIsAuth(false)
        }
        setSuccess(true)
    })
  },[])

  if (!success){
    return <div></div>
  }

  return (
    <BrowserRouter>
      <div className={isAuth?'App':'authApp'}>
        {isAuth&&<Header setIsAuth={setIsAuth} setState={setState}/>}
        {isAuth&&<Sidebar setIsAuth={setIsAuth} lvl={lvl} state={state} setState={setState}/>}
        <main className={isAuth?'main':'authMain'}>
          <Suspense fallback={<div className='loading-animation'></div>}>
            <Routes>
              <Route exact path='/auth' element={<Authorization success={success} isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
              <Route exact path='/' element={isAuth?<Home/>:<Navigate to='/auth'/> }/>
              <Route path='/users' element={isAuth?<Users lvl={lvl}/>:<Navigate to='/auth'/>}/>
              <Route path='/cards' element={isAuth?<Cards lvl={lvl}/>:<Navigate to='/auth'/>} />
              <Route path='/hostels' element={isAuth?<Hostels lvl={lvl}/>:<Navigate to='/auth'/>}/>
              <Route path='/operator' element={isAuth?<Operator lvl={lvl}/>:<Navigate to='/auth'/>}/>
              <Route path='/reports' element={isAuth?<Reports lvl={lvl}/>:<Navigate to='/auth'/>}/>
              <Route path='/other' element={isAuth?<Other lvl={lvl}/>:<Navigate to='/auth'/>}/>
              <Route path='/housekeeper' element={isAuth?<Housekeeper lvl={lvl}/>:<Navigate to='/auth'/>} />
              <Route path='/politics' element={isAuth?<Politics/>:<Navigate to='/auth'/>} />
              <Route path='/profile' element={isAuth?<Profile/>:<Navigate to='/auth'/>} />
            </Routes>
          </Suspense>

          <ThemBtn />
          {isAuth&&<UpBtn/>}

        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}
export default App