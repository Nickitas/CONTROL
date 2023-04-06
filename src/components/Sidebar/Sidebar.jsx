import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useLogout } from '../../hooks/useLogout'
import jwt_decode from 'jwt-decode'

import Tooltip from '@mui/material/Tooltip'
import { SIDEBAR_ITEMS } from '../../utils/sidebarConsts'
import { PROFILE_ROUT, AUTH_ROUT } from '../../utils/routersPath'
import { LogOutIcon } from '../svg.module'

import admin from '../../assets/images/avas/admin.jpg'
import operator from '../../assets/images/avas/operator.jpg'
import bureau from '../../assets/images/avas/bureau.jpg'
import watch from '../../assets/images//avas/watch.jpg'
import hostels from '../../assets/images/avas/hostels.jpg'
import users from '../../assets/images/avas/users.jpg'
import customAva from '../../assets/images/avas/ava.jpg'
import './sidebar.scss'


const Sidebar = () => {
    const { auth } = useAuth()
    const logout = useLogout()
    const [isActivePanel, setIsActivePanel] = useState(false)
    
    const decoded = auth?.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined

    const userName = decoded?.UserInfo?.login || 'Пользователь'
    const userJob = decoded?.UserInfo?.work_position || ''
    const userRole = decoded?.UserInfo?.roles || [5]

    const ava = 
        userRole == 1 ? admin :
        userRole == 2 ? operator :
        userRole == 3 ? bureau :
        userRole == 4 ? watch :
        userRole == 5 ? hostels :
        userRole == 6 ? users :
        customAva
    localStorage.setItem('ava', ava)

    const setActive = ({isActive}) => isActive ? 'active' : '' 

    const signOut = async () => {
        await logout()
        navigate(AUTH_ROUT)
        localStorage.clear()
    }

    const handleToggleSidebar = () => {
        setIsActivePanel(prev => !prev)
        const munuHumBtn = document.querySelector('#munuHum')
        const sidebar = document.querySelector('.sidebar')
        munuHumBtn.classList?.toggle('active')
        sidebar.classList?.toggle('active')
    }

    const sidebar = auth?.accessToken ? (
        <div className='sidebar'>
            <div className='menu_content'>
                <h6 className='menu__title'>Меню</h6>
                <div className='sidebar__menu'>
                    <svg id='munuHum' onClick = {handleToggleSidebar} className='ham ham6' viewBox='0 0 100 100' width='45'>
                        <path className='line top' d='m 30,33 h 40 c 13.100415,0 14.380204,31.80258 6.899646,33.421777 -24.612039,5.327373 9.016154,-52.337577 -12.75751,-30.563913 l -28.284272,28.284272' />
                        <path className='line middle' d='m 70,50 c 0,0 -32.213436,0 -40,0 -7.786564,0 -6.428571,-4.640244 -6.428571,-8.571429 0,-5.895471 6.073743,-11.783399 12.286435,-5.570707 6.212692,6.212692 28.284272,28.284272 28.284272,28.284272' />
                        <path className='line bottom' d='m 69.575405,67.073826 h -40 c -13.100415,0 -14.380204,-31.80258 -6.899646,-33.421777 24.612039,-5.327373 -9.016154,52.337577 12.75751,30.563913 l 28.284272,-28.284272' />
                    </svg>
                </div>
            </div>

            <ul className='nav_list'>
                {
                    SIDEBAR_ITEMS.filter(ctx => ctx._lvl.includes(userRole[0])).map((ctx, index) => (
                        <li key={index} data-anim={ctx.anim}>
                            <NavLink to={ctx.to} className={setActive}>
                                { ctx.img }
                                <span className='links_name'>{ ctx.name }</span>
                            </NavLink>
                        <span className='tooltipe'>{ ctx.name }</span>
                    </li>))
                }
            </ul>

            <div className='profile_content'>
                <div className='profile'>
                    <div className='profile_details'>
                        <Tooltip title={`Открыть профиль ${localStorage.getItem('login')}`} placement='top'>
                            <NavLink to={PROFILE_ROUT}>
                                <div className='ava_wrapper'>
                                    <div className='ava' style={{
                                        background:`no-repeat url(${ava}) center`,
                                        backgroundSize:'cover'
                                    }}></div>
                                </div>
                            </NavLink>
                        </Tooltip>

                        <div className='name_job'>
                            <div className='name'>{ userName }</div>
                            <div className='job'>{ userJob }</div>
                        </div>

                        <Tooltip title='выход' placement='top'>
                            <a onClick={signOut}>
                                <LogOutIcon/>
                            </a>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    ) : null

    return sidebar
}

export default Sidebar