import React from 'react'
import { NavLink } from 'react-router-dom'
import v from '../../../package-lock.json'
import './footer.scss'


const Footer = () => {
    return (
        <footer className='footer'>
            <div className='container'>
                <div className='footer-row'>
                    <div className='footer__copywrite'><strong>© ОСТК ДГТУ</strong> <span>2021 - {new Date().toJSON().slice(0,4)}. Все права защищены</span></div>
                    <div className='footer__politics'>
                        <NavLink to={'/politics'}>Политика ИБ</NavLink>
                    </div>
                    <div className='footer__version'><span>Версия системы:</span> {v.version}</div>
                </div>
            </div>
        </footer>
    )
}

export default Footer