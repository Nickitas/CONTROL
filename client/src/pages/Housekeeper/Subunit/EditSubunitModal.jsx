import React, { useState } from 'react'

import { ReactComponent as Close } from '../../../../public/icons/close.svg'
import Input from '../../../components/UI/inputs/Input'
import Btn from '../../../components/UI/buttons/Btn'
import '../../../assets/modal_window.scss'

const EditSubunitModal = ({ setVisibleEditSubunit }) => {
    const [subunit, setSubunit] = useState('')
    const [head, setHead] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')


    return (
        <div className='fade_block'>
            <div className='modal'>
                <div className='header'>
                    <h3 className='subtitle'>Редактирование</h3>
                    <div className='close' onClick={() => setVisibleEditSubunit(false)}>
                        <Close />                     
                    </div>
                </div>
                <div className='body'>
                    <div className='row'>
                        <Input placeholder='Подразделение...' onChange={e => { setSubunit(ee => e.target.value) }}/>
                        <Input placeholder='Ответственный...' onChange={e => { setHead(ee => e.target.value) }}/>
                    </div>
                    <div className='row'>
                        <Input placeholder='Телефон...' onChange={e => { setPhone(ee => e.target.value) }}/>
                        <Input placeholder='Почта...' onChange={e => { setEmail(ee => e.target.value) }}/>
                    </div>
                    <div className='footer'>
                        <Btn onClick={() => {
                            alert('TODO: Сделать сохранение изменений и закрыть форму')
                        }}>Сохранить</Btn>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditSubunitModal