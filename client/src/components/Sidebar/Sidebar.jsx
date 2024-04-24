import React from 'react'
import { NavLink } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip'
import admin from '../../../public/avas/admin.jpg'
import operator from '../../../public/avas/operator.jpg'
import bureau from '../../../public/avas/bureau.jpg'
import watch from '../../../public//avas/watch.jpg'
import hostels from '../../../public//avas/hostels.jpg'
import users from '../../../public/avas/users.jpg'
import customAva from '../../../public/avas/ava.jpg'
// import _ava from '../../../../N.png'

import {authUser} from '../../Fetch'
import { Log, SidebarUser, SidebarCard, SidebarHostels, SidebarOperator, SidebarReports, SidebarOther, SidebarKey, SidebarLock } from '../../svg.module'
import './Sidebar.scss'


const items = [
    {
        to: '/users',
        img: <SidebarUser/>,
        name: 'Пользователи',
        _lvl:[0],
        anim:'',
    },
    {
        to: '/cards',
        img: <SidebarCard/>,
        name: 'Пропуска',
        _lvl:[0, 2],
        anim:''
    },
    {
        to: '/hostels',
        img: <SidebarHostels/>,
        name: 'Общежития',
        _lvl:[0, 4],
        anim:''
    },
    {
        to: '/operator',
        img: <SidebarOperator/>,
        name: 'Оператор',
        _lvl:[0, 1],
        anim:'spin'
    },
    {
        to: '/reports',
        img: <SidebarReports/>,
        name: 'Отчеты',
        _lvl:[0],
        anim:''
    },
    {
        to: '/video_surveillance',
        img: <SidebarOther/>,
        name: 'Видеонаблюдение',
        _lvl:[0, 2],
        anim:''
    },
    {
        to: '/housekeeper',
        img: <SidebarKey/>,
        name: 'Ключница',
        _lvl:[0, 2, 3],
        anim:''
    },
    {
        to: '/security',
        img: <SidebarLock/>,
        name: 'Security',
        _lvl:[0],
        anim:''
    }
]

const Sidebar = ({ setIsAuth, lvl, state, setState }) => {

    const ava = lvl==0?admin:
            lvl==1?operator:
            lvl==2?bureau:
            lvl==3?watch:
            lvl==4?hostels:
            lvl==5?users:
            customAva
    localStorage.setItem('ava', ava)

    return (
        <div className='sidebar'>
            <div className='logo_content'>
                <div className='logo'>
                    <div className='logo_name'>Меню</div>
                </div>
                <div className='sidebar__menu'>
                    <svg id='munuHum' onClick = {() => {
                        const munuHumBtn = document.querySelector('#munuHum')
                        const sidebar = document.querySelector('.sidebar')
                        munuHumBtn.classList?.toggle('active')
                        sidebar.classList?.toggle('active')
                    }} className='ham ham6' viewBox='0 0 100 100' width='45'>
                        <path className='line top' d='m 30,33 h 40 c 13.100415,0 14.380204,31.80258 6.899646,33.421777 -24.612039,5.327373 9.016154,-52.337577 -12.75751,-30.563913 l -28.284272,28.284272' />
                        <path className='line middle' d='m 70,50 c 0,0 -32.213436,0 -40,0 -7.786564,0 -6.428571,-4.640244 -6.428571,-8.571429 0,-5.895471 6.073743,-11.783399 12.286435,-5.570707 6.212692,6.212692 28.284272,28.284272 28.284272,28.284272' />
                        <path className='line bottom' d='m 69.575405,67.073826 h -40 c -13.100415,0 -14.380204,-31.80258 -6.899646,-33.421777 24.612039,-5.327373 -9.016154,52.337577 12.75751,30.563913 l 28.284272,-28.284272' />
                    </svg>
                </div>
            </div>
            <ul className='nav_list'>
                {items.filter(e => e._lvl.includes(lvl)).map((e, i) => (
                    <li key={i} className={'nav_list__item '+(state==e.to&&'active')} data-anim={e.anim}>
                        <NavLink onClick={() => setState(e.to)} to={e.to}>
                            {e.img}
                            <span className='links_name'>{e.name}</span>
                        </NavLink>
                    <span className='tooltipe'>{e.name}</span>
                </li>))}
            </ul>

            <div className='profile_content'>
                <div className='profile'>
                    <div className='profile_details'>
                        <Tooltip title={`Открыть профиль ${localStorage.getItem('login')}`} placement='top'>
                            <NavLink className='toProfile' onClick={() => setState('/profile')} to={'/profile'}>
                                <div className='ava_wrapper'>
                                    <div className='ava' style={{
                                        background:`no-repeat url(${ava}) center`,
                                        backgroundSize:'cover'
                                    }}></div>
                                </div>
                            </NavLink>
                        </Tooltip>

                        <div className='name_job'>
                            <div className='name'>{localStorage.getItem('login')}</div>
                            <div className='job'>{localStorage.getItem('user_id')}</div>
                        </div>

                        <Tooltip title='выход' placement='top'>
                            <a className='exit-link' onClick={() => {
                                localStorage.removeItem('token')
                                setIsAuth(e => false)
                            }}><Log/></a>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Sidebar