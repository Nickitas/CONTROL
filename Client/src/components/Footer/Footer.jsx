import React from 'react'
import'./Footer.scss'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='container'>
                <div className='row'>
                    <div className='copywrite'><strong>© ОСТК ДГТУ</strong> 2021 - {new Date().toJSON().slice(0,4)}. Все права защищены</div>
                    <div className='version'>Версия продукта: 0.3.1</div>
                </div>
            </div>
        </footer>
    )
}
export default Footer