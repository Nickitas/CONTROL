import React, { useState } from 'react'

import { ReactComponent as Close } from '../../../img/close.svg'
import Input from '../../UI/inputs/Input'
import Select from '../../UI/selects/Select'
import Btn from '../../UI/buttons/Btn'
import classes from '../../../styles/modal_window.scss'

const EditRoomsModal = ({ setVisibleEditRooms }) => {

    const [building, setBuilding] = useState('')
    const [room, setRoom] = useState('')
    const [subunits, setSubnits] = useState('')
    const [signal, setSignal] = useState([])
    const [type, setType] = useState([])
    

    return (
        <div className='fade_block'>
            <div className='modal'>
                <div className='header'>
                    <h3 className='subtitle'>Редактирование</h3>
                    <div className='close' onClick={() => setVisibleEditRooms(e=>false)}>
                        <Close />                     
                    </div>
                </div>
                <div className='body'>
                    <div className='row'>
                        <Input placeholder='Корпус...' onChange={(e) => { setBuilding(ee=>e.target.value) }}/>
                        <Input placeholder='Комната...' onChange={(e) => { setRoom(ee=>e.target.value) }}/>
                    </div>
                    <div className='row' >
                        <Input placeholder='Подразделение...' onChange={(e) => { setSubnits(ee=>e.target.value) }}/>
                    </div>
                    <div className='row'>
                        <Select defultValue={'Сигнализация...'}
                            options={[
                                {value:'yes', name:'есть'},
                                {value:'no', name:'нет'}
                            ]}
                        />
                        <Select defultValue={'Тип аудитории...'}
                            options={[
                                {value:'yes', name:'Кабинет'},
                                {value:'no', name:'Учебная аудитория'},
                                {value:'no', name:'Техническое помещение'},
                                {value:'no', name:'Служебное помещение'},
                            ]}
                        />
                    </div>
                    <div className='footer'>
                        <Btn onClick={() => {
                            alert('TODO: Сделать сохранение изменений и закрыть форму')
                        }}>Сохранить</Btn>
                        <Btn data-red onClick={() => {
                            alert('TODO: Удалить и закрыть форму')
                        }}>Удалить</Btn>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditRoomsModal