import React, { useState, useEffect } from 'react'

import { getRoomEdit, editRoom, removeRoom } from '../../../Fetch'
import { ReactComponent as Close } from '../../../../public/icons/close.svg'
import Input from '../../../components/UI/inputs/Input'
import Select from '../../../components/UI/selects/Select'
import Btn from '../../../components/UI/buttons/Btn'
import '../../../assets/modal_window.scss'


const EditRoomsModal = ({ setVisibleEditRooms, id, setRows }) => {

    const [roomBuilding, setRoomBuilding] = useState()
    const [roomName, setRoomName] = useState()
    const [roomSubunits, setRoomSubnits] = useState()
    const [roomSignal, setRoomSignal] = useState()
    const [roomType, setRoomType] = useState()
    const [roomHead, setRoomHead] = useState()
    const [roomPhone, setRoomPhone] = useState()

    useEffect(() => {
        getRoomEdit(id).then(e => {
            if(e.state) {
                setRoomBuilding(e.body.building)
                setRoomName(e.body.room)
                setRoomSubnits(e.body.subunit)
                setRoomSignal(e.body.signaling)
                setRoomType(e.body.type)
                setRoomHead(e.body.head)
                setRoomPhone(e.body.phone)
            }
        })
    })


    const handlerSaveRoomEdit = (id, room, building, subunit, signaling, type, head, phone) => {
        editRoom(id, room, building, subunit, signaling, type, head, phone)
        setVisibleEditRooms(false)
    }

    const handlerRemoveRoom = (id, roomName) => {
        removeRoom(id)
        setRows([])
        alert(`Комната ${roomName} удалена! (¬‿¬)`)
        setVisibleEditRooms(false)
    }
    

    return (
        <div className='fade_block'>
            <div className='modal'>
                <div className='header'>
                    <h3 className='subtitle'>Редактирование</h3>
                    <div className='close' onClick={() => setVisibleEditRooms(false)}>
                        <Close />                     
                    </div>
                </div>
                <div className='body'>
                    <div className='row'>
                        <Input 
                            placeholder={roomBuilding} 
                            onChange={e => setRoomBuilding(ee => e.target.value)}/>
                        <Input 
                            placeholder={roomName} 
                            onChange={e => setRoomName(ee => e.target.value)}
                        />
                    </div>
                    <div className='row' >
                        <Input 
                            placeholder={roomSubunits} 
                            onChange={e => setRoomSubnits(ee => e.target.value)}/>
                        <Input 
                            placeholder={roomHead} 
                            onChange={e => setRoomHead(ee => e.target.value)}/>
                    </div>
                    <div className='row'>
                        <Select defultValue={roomSignal}
                            options={[
                                {value:true, name:'есть'},
                                {value:false, name:'нет'}
                            ]}
                            onChange={e => setRoomSignal(e)}
                        />
                        <Select defultValue={roomType}
                            options={[
                                {value:'Кабинет', name:'Кабинет'},
                                {value:'Учебная аудитория', name:'Учебная аудитория'},
                                {value:'Техническое помещение', name:'Техническое помещение'},
                                {value:'Служебное помещение', name:'Служебное помещение'},
                            ]}
                            onChange={e => {setRoomType(e)}}
                        />
                    </div>
                    <div className='row'>
                        <Input 
                            placeholder={roomPhone}
                            onChange={e => setRoomPhone(ee => e.target.value)}
                            pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                            type='tel'
                            required
                        />
                    </div>
                    <div className='footer'>
                        <Btn onClick={() => {
                            handlerSaveRoomEdit(id, roomName, roomBuilding, roomSubunits, roomSignal, roomType, roomHead, roomPhone)}}>
                            Сохранить
                        </Btn>
                        <Btn data-red onClick={() => {handlerRemoveRoom(id, roomName)}}>
                            Удалить
                        </Btn>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditRoomsModal