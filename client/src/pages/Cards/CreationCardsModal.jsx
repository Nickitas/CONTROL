import React, { useState } from 'react'

import { ReactComponent as Close } from '../../../public/icons/close.svg'
import Input from '../../components/UI/inputs/Input'
import ExtraBtn from '../../components/UI/buttons/ExtraBtn'
import Btn from '../../components/UI/buttons/Btn'
import '../../assets/modal_window.scss'


const OneTimeCard = () => {

    const [surname, setSurname] = useState('')
    const [name, setName] = useState('')
    const [lastname, setlastname] = useState('')
    const [subunion, setSubunion] = useState('')
    const [building, setBuilding] = useState('')
    const [room, setRoom] = useState('')
    const [comment, setComment] = useState('')

    return (
        <div>
            <h3 className='subtitle'>Разовый: </h3>
            <div className='row'>
                <Input placeholder='Фамилия...' required autoFocus onChange={e => setSurname(ee => e.target.value)} />
                <Input placeholder='Имя...' required onChange={e => setName(ee => e.target.value)} />
                <Input placeholder='Отчество...' onChange={e => setlastname(ee => e.target.value)} />
            </div>
            <div className='row'>
                <Input placeholder='Подразделение...' required onChange={e => setSubunion(ee => e.target.value)} />
            </div>
            <div className='row'>
                <Input placeholder='Номер корпуса...' required onChange={e => setBuilding(ee => e.target.value)} />
                <Input placeholder='Номер комнаты...' required onChange={e => setRoom(ee => e.target.value)} />
            </div>
            <div className='row'>
                <Input placeholder='Комментарий...' onChange={e => setComment(ee => e.target.value)} />
            </div>
        </div>
    )
}
const TemporaryCard = () => {

    return (
        <div>
            <h3 className='subtitle'>Временный: </h3>
            
        </div>
    )
}
const CarsCard = () => {

    return (
        <div>
            <h3 className='subtitle'>Авто: </h3>
            
        </div>
    )
}

const CreationCardsModal = ({ setVisibleCreationCards }) => {

    const [state, setState ] = useState(0)
    const [oneTimeCard, setOneTimeCard] = useState(false)
    const [temporaryCard, setTemporaryCard] = useState(false)
    const [carsCard, setCarsCard] = useState(false)

    let block = <OneTimeCard/>
    if(temporaryCard) {
        block = <TemporaryCard />
    }
    if(carsCard) {
        block = <CarsCard />
    }


    return (
        <div className='fade_block'>
            <div className='modal'>
                <div className='header'>
                    <h3 className='subtitle'>Редактирование</h3>
                    <div className='close' onClick={() => setVisibleCreationCards(false)}>
                        <Close />                     
                    </div>
                </div>
                <div className='body'>
                    <div className='btns_wrapp'>
                        <ExtraBtn onClick={() => setState(0)}>Разовый</ExtraBtn>
                        <ExtraBtn onClick={() => setState(1)}>Временный</ExtraBtn>
                        <ExtraBtn onClick={() => setState(2) }>Авто</ExtraBtn>
                    </div>

                    {state == 0 && <OneTimeCard/>}
                    {state == 1 && <TemporaryCard />}
                    {state == 2 && <CarsCard />}
                    
                    <div className='footer'>
                        <Btn onClick={() => {
                            // alert('TODO: Сделать сохранение изменений и закрыть форму')
                        }}>Создать заявку</Btn>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreationCardsModal