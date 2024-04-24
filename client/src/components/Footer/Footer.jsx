import React from 'react'
import { NavLink } from 'react-router-dom'
import v from '../../../package-lock.json'
import'./Footer.scss'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='container'>
                <div className='row'>
                    <div className='copywrite'><strong>© ОСТК ДГТУ</strong> 2021 - {new Date().toJSON().slice(0,4)}. Все права защищены</div>
                    <div className='politics'>
                        <NavLink to={'/politics'}>Политика ИБ</NavLink>
                    </div>
                    <div className='version'>Версия системы: {v.version}</div>
                </div>
            </div>
        </footer>
    )
}
export default Footer