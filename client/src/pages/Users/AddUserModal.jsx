import React, { useState, useEffect } from 'react'

import { addUser, getRules } from '../../Fetch'
import { ReactComponent as Close } from '../../../public/icons/close.svg'
import Btn from '../../components/UI/buttons/Btn'
import Input from '../../components/UI/inputs/Input'
import Select from '../../components/UI/selects/Select'
import  '../../assets/modal_window.scss'

const subunitTypes = [
    {value:'service', name:'Служба'},
    {value:'depart', name:'Отдел'},
    {value:'control', name:'Управление'},
    {value:'center', name:'Центр'},
    {value:'cathedra', name:'Кафедра'},
    {value:'faculty', name:'Факультет'},
    {value:'stud_city', name:'Суденческий город'},
    {value:'rectorate', name:'Ректорат'}
]

const AddUserModal = ({ setVisibleAdd }) => {
    const [options, setOptions] = useState([])
    const [surname, setSurname] = useState('')
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [phone, setPhone] = useState('')
    const [subunit, setSubunion] = useState('')
    const [type, setType] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [number_corp, setNumberСorps] = useState('')
    const [number_room, setNumberRoom] = useState('')
    const [rules, setRules] = useState('')

    useEffect(() => {
        getRules().then(e => {
            if(e.state){
                setOptions([...e.items])
                setRules(ee=>e.items[e.items.length-1]._id)
            }
        })
        
    },[])
    if(rules.length ==0 ) return null;

    const handlerCreateUser = () => {
        const obj = {
            surname,
            name,
            lastname,
            type,
            number_corp,
            number_room,
            subunit,
            phone,
            login,
            password,
            rules
        }
        addUser(obj).then(e => {
            if(e.state) {
                setVisibleAdd(ee => false)
            }
        })
    }

    return (
        <div className='fade_block'>
            <div className='modal'>
                <div className='header'>
                    <h3 className='subtitle'>Создать пользователя</h3>
                    <div className='close' onClick={() => setVisibleAdd(e => false)}>
                        <Close />                     
                    </div>
                </div>
                <div className='body'>
                    <div className='row'>
                        <Input placeholder='Фамилия...' required onChange={(e) => { setSurname(ee=>e.target.value) }} />
                        <Input placeholder='Логин...' required type='text' onChange={(e) => { setLogin(ee=> e.target.value) }} />
                    </div>
                    <div className='row'>
                        <Input placeholder='Имя...' required onChange={(e) => { setName(ee=>e.target.value) }} />
                        <Input placeholder='Пароль...' required type='password' onChange={(e) => { setPassword(ee => e.target.value) }} />
                    </div>
                    <div className='row'>
                        <Input placeholder='Отчество...' onChange={(e) => { setLastname(ee => e.target.value) }} />
                        <Input placeholder='Номер корпуса' required onChange={(e) => { setNumberСorps(ee => e.target.value) }} />
                    </div>
                    <div className='row'>
                        <Input placeholder='Номер телефона...' required onChange={(e) => { setPhone(ee => e.target.value) }} />
                        <Input placeholder='Номер комнаты...' required onChange={(e) => { setNumberRoom(ee => e.target.value) }} />
                    </div>
                    <div className='row'>
                        <Input placeholder='Подразделение...' required onChange={(e) => { setSubunion(ee => e.target.value) }} />
                    </div>
                    <div className='row'>
                        <Select defultValue={'Тип подразделения...'} required
                            options={subunitTypes}
                            onChange={(e)=>{
                                setType(eee => subunitTypes.filter(ee => e === ee.value)[0].name)
                            }}
                        />
                        <Select  defultValue={'Права...'} required
                            options={options.map(e => {
                                return {
                                    value:e._id,
                                    name:e.title
                                }
                            })}
                            onChange={e => {setRules(ee => e)}}
                        />
                    </div>
                </div>
                <div className='footer'>
                    <Btn onClick={handlerCreateUser}>
                        Создать
                    </Btn>
                </div>
            </div>
        </div>
    )
}

export default AddUserModal