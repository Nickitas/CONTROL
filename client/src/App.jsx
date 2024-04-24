import React, { useState, Suspense, useEffect, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { checkAuth } from './Fetch'
import UpBtn from './components/UI/elements/UpBtn/UpBtn'
import ThemBtn from './components/UI/elements/ThemBtn/ThemBtn'

import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/Footer'

const Authorization = lazy(() => import('./pages/Authorization/Authorization'))
const Home = lazy(() => import('./pages/Home/Home'))
const Users = lazy(() => import('./pages/Users/Users'))
const Cards = lazy(() => import('./pages/Cards/Cards'))
const Hostels = lazy(() => import ('./pages/Hostels/Hostels'))
const Operator = lazy(() => import('./pages/Operator/Operator'))
const Reports = lazy(() => import('./pages/Reports/Reports'))
const VideoSurveillance = lazy(() => import('./pages/VideoSurveillance/VideoSurveillance'))
const Housekeeper = lazy(() => import('./pages/Housekeeper/Housekeeper'))
// Security
const Politics = lazy(() => import('./pages/Politics/Politics'))
const Profile = lazy(() => import('./pages/Profile/Profile'))

const App = () => {

  const [isAuth, setIsAuth] = useState(false)
  const [success, setSuccess] = useState(false)
  const [state, setState] = useState('')
  const [lvl, setLvl] = useState(-1)
  
  useEffect(() => {
    checkAuth().then(e => {
        if(e.state) {
          setLvl(e.body.rules.lvl)
          setIsAuth(true)
        }
        else {
          setLvl(-1)
          setIsAuth(false)
        }
        setSuccess(true)
    })
  }, [])

  if (!success){
    return <div></div>
  }

  return (
    <BrowserRouter>
      <div className={isAuth ? 'App' : 'authApp'}>
        {isAuth && <Header setIsAuth={setIsAuth} setState={setState}/>}
        {isAuth && <Sidebar setIsAuth={setIsAuth} lvl={lvl} state={state} setState={setState}/>}
        <main className={isAuth ? 'main' : 'auth-main'}>
          <Suspense fallback={<div className='loading-animation'></div>}>
            <Routes>
              <Route exact path='/auth' element={<Authorization success={success} isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
              <Route exact path='/users' element={isAuth ? <Users lvl={lvl}/> : <Navigate to='/auth'/>}/>
              <Route exact path='/cards' element={isAuth ? <Cards lvl={lvl}/> : <Navigate to='/auth'/>} />
              <Route exact path='/hostels' element={isAuth ? <Hostels lvl={lvl}/> : <Navigate to='/auth'/>}/>
              <Route exact path='/operator' element={isAuth ? <Operator lvl={lvl}/> : <Navigate to='/auth'/>}/>
              <Route exact path='/reports' element={isAuth ? <Reports lvl={lvl}/> : <Navigate to='/auth'/>}/>
              <Route exact path='/video_surveillance' element={isAuth ? <VideoSurveillance lvl={lvl}/> : <Navigate to='/auth'/>}/>
              <Route exact path='/housekeeper' element={isAuth ? <Housekeeper lvl={lvl}/> : <Navigate to='/auth'/>} />
              <Route exact path='/politics' element={isAuth ? <Politics/> : <Navigate to='/auth'/>} />
              <Route exact path='/profile' element={isAuth ? <Profile/> : <Navigate to='/auth'/>} />
              <Route exact path='/' element={isAuth ? <Home/> : <Navigate to='/auth'/> }/>
            </Routes>
          </Suspense>

          <ThemBtn />
          {isAuth && <UpBtn/>}

        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App