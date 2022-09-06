import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Cards from '../Cards'
import Input from '../../UI/inputs/Input'
import Btn from '../../UI/buttons/Btn'
import classes from './PoolCards.module.scss'


const PoolCards = () => {

    const [amount, setAmount] = useState('')
    const [company, setCompany] = useState('')
    const [datestart, setDatestart] = useState('')
    const [dateend, setDateend] = useState('')
    const [card, setCard] = useState('')
    const [back, setBack] = useState(false)



    const history = useNavigate()
    useEffect(() => {
        if(success&&!isAuth){
            history('/auth')
        }   
    },[isAuth, success])
    if (!isAuth) return <div></div>


    if(back) {
        return <Cards/>
    }
    else {
        return (
            <section className={classes.PoolCards}>
                <div className='container'>
                    <div className={classes.breadcrumb} onClick={() => setBack(true)}><box-icon name='chevron-left' color='#8a8a8a'></box-icon>Назад</div>
                    <h2 className={classes.title}>Пропуска в бассейн</h2>
                    <div className={classes.form}>
                        <Input placeholder='Кол-во проездов...' required autoFocus onChange={(e)=>{ setAmount(ee=>e.target.value) }} />
                        <Input placeholder='Компания (если есть)...' onChange={(e)=>{ setCompany(ee=>e.target.value) }} />
                        <Input placeholder='Дата начала...' type='date' required onChange={(e)=>{ setDatestart(ee=>e.target.value) }} />
                        <Input placeholder='Дата конца...' type='date' required onChange={(e)=>{ setDateend(ee=>e.target.value) }} />
                        <Input placeholder='Пропуск...' required onChange={(e)=>{ setCard(ee=>e.target.value) }} />

                        <Btn onClick={() => {
                            alert('TODO: добавление пропуска в базу ')
                        }}>
                            Добавить пропуск
                        </Btn>
                    </div>
                </div>
            </section>
        )
    }
}

export default PoolCards