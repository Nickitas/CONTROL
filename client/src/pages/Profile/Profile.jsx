import React, { useState, useEffect } from 'react'
import Tooltip from '@mui/material/Tooltip'
import { Input } from '@mui/material'

import Loading from '../../components/UI/Loading/Loading'
import { getUser } from '../../Fetch'
import { Edit, Log } from '../../svg.module'
import ExtraBtn from '../../components/UI/buttons/ExtraBtn'
import classes from './Profile.module.scss'

const Profile = () => {

    const token = localStorage.getItem('token')
    const [rows, setRows] = useState({})

    // let [sername, setSername] = useState(rows.surname)
    // let [name, setName] = useState(rows.name)
    // let [lastName, setLastName] = useState(rows.lastName)
    // let [mail, setMail] = useState('')
    // let [phone, srtPhone] = useState(rows.phone)

    useEffect(() => {
        getUser(token).then(e => {
            if(e.state) {
                setRows(e.body)

                // surname
                // name
                // lastname
                // type
                // number_room
                // login
                // password
                // rules
                // phone
                // last_ip

            }
        })
    }, [])

    if(!rows._id){
        return (
            <Loading/>
        )
    }

    return (
        <section className={classes.profile}>
            <div className='container'>
                <div className={classes.row}>
                    <h2 className={classes.title}>{localStorage.getItem('login')}</h2>
                </div>
                <div className={classes.wrapper}>

                    <div className={classes.person}>
                        <div className={classes.img} style={{
                            background:`no-repeat url(${localStorage.getItem('ava')})`,
                            backgroundSize:'cover',
                            backgroundPosition:'center'
                        }}
                        ></div>
                    </div>

                    <div className={classes.data}>
                        <div className={classes.head}>
                            <h3 className={classes.subtitle}>Мои данные</h3>
                        </div>
                        <div className={classes.body}>
                            <Input onChange={(e)=>{
                                rows.surname = e.target.value;
                                setRows({...rows})
                            }} placeholder='Фамилия...' defaultValue={rows.surname} />
                            <Input onChange={(e)=>{
                                rows.name = e.target.value;
                                setRows({...rows})
                            }} placeholder='Имя...' defaultValue={rows.name} />
                            <Input onChange={(e)=>{
                                rows.lastName = e.target.value;
                                setRows({...rows})
                            }} placeholder='Отчество...' defaultValue={rows.lastName} />
                            <Input onChange={(e)=>{
                                rows.email = e.target.value;
                                setRows({...rows})
                            }} placeholder='Почта...' defaultValue={rows.email} />
                            <Input onChange={(e)=>{
                                rows.phone = e.target.value;
                                setRows({...rows})
                            }} placeholder='Номер телефона...' defaultValue={rows.phone||""} />
                        </div>
                    </div>

                    <div className={classes.account}>
                        <div className={classes.head}>
                            <h3 className={classes.subtitle}>Данные аккаунта</h3>
                            <ExtraBtn onClick={() => {alert('Открывается раедактирование информации')}}>
                                <Edit/>
                            </ExtraBtn>
                        </div>
                        <div className={classes.body}>
                            <Input onChange={(e)=>{
                                rows.login = e.target.value;
                                setRows({...rows})
                            }} defaultValue={rows.login} placeholder={'Логин...'} />
                            <Input onChange={(e)=>{
                                rows.password = e.target.value;
                                setRows({...rows})
                            }} placeholder={'Пароль...'} defaultValue={rows.password} />
                        </div>
                    </div>

                    <div className={classes.job}>
                        <div className={classes.head}>
                            <h3 className={classes.subtitle}>Мое подразделение</h3>
                            <ExtraBtn onClick={() => {alert('Открывается раедактирование информации')}}>
                                <Edit/>
                            </ExtraBtn>
                        </div>
                        <div className={classes.body}>
                            <Input placeholder='Подразделение...' />
                            <Input placeholder='Номер корпуса...' />
                            <Input placeholder='Комната...' />
                            <Input placeholder='Служба...' />
                            <Input placeholder='Роль...' />
                        </div>
                    </div>

                </div>    

            </div>
        </section>
    )
}
export default Profile