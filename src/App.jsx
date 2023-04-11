import React, { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import RequireAuth from './hoc/RequireAuth'
import PersistLogin from './hoc/PersistLogin'

import { AUTH_ROUT, 
        UNAUTHORIZED_ROUT, 
        HOME_ROUT, 
        ADMIN_ROUT, 
        CARDS_ROUT, 
        HOSTELS_ROUT, 
        OPERATOR_ROUT, 
        MONITORING_ROUT, 
        VIDEO_SURVEILLANCE_ROUT, 
        HOUSEKEEPER_ROUT, 
        SECURITY_ROUT, 
        GAME_ROUT, 
        PROFILE_ROUT, 
        POLITICS_ROUT 
} from './utils/routersPath'
const Authorization = lazy(() => import('./pages/Authorization/Authorization'))
const Unauthorized = lazy(() => import('./pages/Unauthorized/Unauthorized'))
const Missing = lazy(() => import('./pages/Missing/Missing'))
const Politics = lazy(() => import('./pages/Politics/Politics'))
const Home = lazy(() => import('./pages/Home/Home'))
const Profile = lazy(() => import('./pages/Profile/Profile'))

// // Admin Pag
import { USERS_ROUT, SYSLOGS_ROUT } from './utils/routersPath'
const Admin = lazy(() => import('./pages/Admin/Admin'))
const Users = lazy(() => import('./pages/Admin/Users/Users'))
const SysLogs = lazy(() => import('./pages/Admin/SysLogs/SysLogs'))

// // Operator Page
// import {  } from './utils/routersPath'
const Operator = lazy(() => import('./pages/Operator/Operator'))

// // Monitoring Page
import { STATISTICS_ROUT, VISITS_ROUT, VIEW_AUDIENCES_ROUT, SEARCH_PERSON_ROUT, MONITORING_REPORTS_ROUT } from './utils/routersPath'
const Monitoring = lazy(() => import('./pages/Monitoring/Monitoring'))
// const Statistics
const Visits = lazy(() => import('./pages/Monitoring/Visits/Visits'))
// import ViewAudiences
// import SearchPerson
// import MonitoringReports

// // Cards Page
// import {  } from './utils/routersPath'
const Cards = lazy(() => import('./pages/Cards/Cards'))

// // Security Page
// import {  } from './utils/routersPath'
const Security = lazy(() => import('./pages/Security/Security'))

// // VideoSurveillance Page
// import {  } from './utils/routersPath'
const VideoSurveillance = lazy(() => import('./pages/VideoSurveillance/VideoSurveillance'))

// // Housekeeper Page
// import {  } from './utils/routersPath'
import { KEY_ACCOUNTING_ROUT, EL_JOURNAL_ROUT, SUBUNIT_ROUT, ROOMS_LIST_ROUT, DISTURBERS_ROUT } from './utils/routersPath'
const Housekeeper = lazy(() => import('./pages/Housekeeper/Housekeeper'))
const KeysAccounting = lazy(() => import('./pages/Housekeeper/KeysAccounting/KeysAccounting'))
const ElJournal = lazy(() => import('./pages/Housekeeper/ElJournal/ElJournal'))
const SubunitList = lazy(() => import('./pages/Housekeeper/SubunitsList/SubunitsList'))
const RoomsList = lazy(() => import('./pages/Housekeeper/RoomsList/RoomsList'))
const Disturbers = lazy(() => import('./pages/Housekeeper/Disturbers/Disturbers'))

// // Hostels Page
// import {  } from './utils/routersPath'
const Hostels = lazy(() => import('./pages/Hostels/Hostels'))

// // Game Page
// import {  } from './utils/routersPath'
const Game = lazy(() => import('./pages/Game/Game'))

// !!! Временно !!!
const ROLES = {
  'User': 6,
  'Commandant': 5,
  'Watch': 4,
  'Buro': 3,
  'Operator': 2,
  'Admin': 1
}

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route path={AUTH_ROUT} element={<Authorization />} />
        <Route path={UNAUTHORIZED_ROUT} element={<Unauthorized />} />
        <Route path={POLITICS_ROUT} element={<Politics />} />

        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={Object.values(ROLES)} />}>
            <Route path={HOME_ROUT} element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Operator]} />}>
            <Route path={ADMIN_ROUT} element={<Admin />}>
              <Route path={USERS_ROUT} element={<Users />} />  
              <Route path={SYSLOGS_ROUT} element={<SysLogs />} />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Operator, ROLES.Buro]} />}>
            <Route path={OPERATOR_ROUT} element={<Operator />}>
              {/* 
              
              */}
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Operator, ROLES.Buro, ROLES.User]} />}>
            <Route path={MONITORING_ROUT} element={<Monitoring />}>
              <Route path={STATISTICS_ROUT} element={<div>Statistics</div>} />
              <Route path={VISITS_ROUT} element={<Visits/>} />
              <Route path={VIEW_AUDIENCES_ROUT} element={<div>ViewAudiences</div>} />
              <Route path={SEARCH_PERSON_ROUT} element={<div>SearchPerson</div>} />
              <Route path={MONITORING_REPORTS_ROUT} element={<div>MonitoringReports</div>} />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Operator, ROLES.Buro, ROLES.User]} />}>
            <Route path={CARDS_ROUT} element={<Cards />}>
              {/* 
              
              */}
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Operator]} />}>
            <Route path={SECURITY_ROUT} element={<Security />}>
              {/* 

              */}
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Operator, ROLES.Buro]} />}>
            <Route path={VIDEO_SURVEILLANCE_ROUT} element={<VideoSurveillance />}>
              {/* 
              
              */}
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Operator, ROLES.Buro, ROLES.Watch]} />}>
            <Route path={HOUSEKEEPER_ROUT} element={<Housekeeper />}>
              <Route path={KEY_ACCOUNTING_ROUT} element={<KeysAccounting />} />
              <Route path={EL_JOURNAL_ROUT} element={<ElJournal />} />
              <Route path={SUBUNIT_ROUT} element={<SubunitList />} />
              <Route path={ROOMS_LIST_ROUT} element={<RoomsList />} />
              <Route path={DISTURBERS_ROUT} element={<Disturbers />} />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Operator, ROLES.Commandant]} />}>
            <Route path={HOSTELS_ROUT} element={<Hostels />}>
              {/* 
              
              */}
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={Object.values(ROLES)} />}>
            <Route path={GAME_ROUT} element={<Game />}>
              {/* 

              */}
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={Object.values(ROLES)} />}>
            <Route path={PROFILE_ROUT} element={<Profile />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App