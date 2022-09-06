import React, { useState, useEffect } from 'react'

import { edditUser, deleteUser, getRules } from '../../Fetch'
import { ReactComponent as Close } from '../../img/close.svg'
import Btn from '../UI/buttons/Btn'
import Input from '../UI/inputs/Input'
import Select from '../UI/selects/Select'
import  '../../styles/modal_window.scss'


const EditUserModal = ({setVisibleEdit}) => {
    const [options, setOptions] = useState([])
    const [surname, setSurname] = useState('')
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [type, setType] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [rules, setRules] = useState('')
    // const [id, setID] = useState({
    //     body:{
    //         id
    //     }})

    useEffect(() => {
        getRules().then(e => {
            if(e.state){
                setOptions([...e.items])
                setRules(ee=>e.items[e.items.length-1]._id)
            }
        })
    },[])
    if(rules.length==0) return null;

    return (
        <div className='fade_block'>
            <div className='modal'>
                <div className='header'>
                    <h3 className='subtitle'>Редактирование</h3>
                    <div className='close' onClick={() => setVisibleEdit(e=>false)}>
                        <Close />                     
                    </div>
                </div>
                <div className='body'>
                    <div className='row'>
                        <Input placeholder='sadaasd' onChange={(e)=>{ setSurname(ee=>e.target.value) }}/>
                        <Input placeholder='Логин...' onChange={(e)=>{ setLogin(ee=>e.target.value) }}/>
                    </div>
                    <div className='row'>
                        <Input placeholder='Имя...' onChange={(e)=>{ setName(ee=>e.target.value) }}/>
                        <Input placeholder='Пароль...' onChange={(e)=>{ setPassword(ee=>e.target.value) }}/>
                    </div>
                    <div className='row'>
                        <Input placeholder='Отчество...' onChange={(e)=>{ setLastname(ee=>e.target.value) }}/>
                        <Input placeholder='Подразделение...' onChange={(e)=>{ setType(ee=>e.target.value) }}/>
                    </div>
                    <div className='row'>
                        <Select defultValue={options[options.length-1].title} 
                            options={ options.map(e => {
                                return {
                                    value:e._id,
                                    name:e.title
                                }
                            })}
                            onChange={e => { setRules(ee=>e) }}
                        />
                    </div>

                    <div className='footer'>
                        <Btn onClick={() => {
                            const obj = {
                                surname,
                                name,
                                lastname,
                                type,
                                login,
                                password,
                                rules,
                            }
                            edditUser(obj).then(e => {
                                if(e.state) {
                                    setVisibleEdit(ee=>false)
                                }
                            })
                        }}>Сохранить</Btn>
                        <Btn data-red onClick={() => {
                            deleteUser(id).then(e => {
                                if(e.state) {
                                    setID(ee)
                                    setVisibleEdit(ee=>false)
                                }
                            })
                        }}>Удалить</Btn>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditUserModal