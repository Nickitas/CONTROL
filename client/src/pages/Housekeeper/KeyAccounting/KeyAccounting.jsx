import React, { useState, useEffect } from 'react'

import { getUserKeyList, updateKeyStatus, updateSignalStatus, getKitKeys } from '../../../Fetch'
import { ReactComponent as Loading } from '../../../../public/icons/loading.svg'
import { ChevronLeft, Bell } from '../../../svg.module'
import Btn from '../../../components/UI/buttons/Btn'
// import Loading from '../../UI/Loading/Loading'
import defaultperson from '../../../../public/icons/person.svg'
import classes from './KeyAccounting.module.scss'

// 00B4C5048296
// 0001064D55B2
// 03203395331B
// 00569854CC6E
// 0120CEEEBF04
// 0099DAE5FD44
// 0099DAE5FD44

const handlerRoomToggle = (setAwaite, props, type='rooms') => {
    setAwaite(true)
    updateKeyStatus(props.id, props.key_status, props.signal_status, props.userId).then(ee => {
        setAwaite(false)
        if(ee.state) {
            props.data.body[type][props.index].key_status = !props.key_status
            if (props.key_status)
                props.data.body[type][props.index].signal_status = false
            props.setData({
                body:props.data.body
            })
        }
    })
}

const handlerSignalToggle = (setAwaite, props, type='rooms') => {
    setAwaite(true)
    updateSignalStatus(props.id, props.signal_status, props.userId).then(ee => {
        setAwaite(false)
        if(ee.state) {
            props.data.body[type][props.index].signal_status = !props.signal_status
            props.setData({
                body:props.data.body
            })
        }
    })
}



const KeyBtnBP = (props) => {

    const [awaite, setAwaite] = useState(false)
    const {key_status, signal_status, signaling, building, room} = props

    return (
        <div className={classes.keyBtn}>
            {
                !awaite ? (<>
                    <div className={classes.room} onClick={() => {handlerRoomToggle(setAwaite, props, 'all_rooms')}} 
                         style={{backgroundColor:key_status ? '#008000' : '#ff0000', borderRadius:signaling ? '5px 0 0 5px' : 5}}>
                        {building}-{room}
                    </div>
                    <div className={classes.signal} onClick={() => {handlerSignalToggle(setAwaite, props, 'all_rooms')}} 
                         style={{backgroundColor:signal_status ? '#008000' : '#ff0000', display:signaling ? 'flex' : 'none'}}>
                        <Bell/>
                    </div>
                </>) : (
                    <div className={classes.loading}>
                        <Loading/>
                    </div>
                )
            }
        </div>
    )
}

const KeyBtn = (props) => {

    const [awaite, setAwaite] = useState(false)
    const {setOpen} = props
    
    return (
        <div className={classes.keyBtn}>
            {
                !awaite ? (<>
                    <div className={classes.room} onClick={() => {
                        if(props.room == 'БП') {
                            setOpen(e =>! e)
                            return
                        }
                        handlerRoomToggle(setAwaite, props)
                        }}
                        style={{backgroundColor:props.key_status ? '#008000':'#ff0000', borderRadius:props.signaling ? '5px 0 0 5px' : 5}}>
                        {props.building}-{props.room}
                    </div>
                    <div className={classes.signal} onClick={() => {handlerSignalToggle(setAwaite, props)}} 
                        style={{backgroundColor:props.signal_status ? '#008000' : '#ff0000', display:props.signaling ? 'flex' : 'none'}}>
                        <Bell/>
                    </div>
                </>) : (
                    <div className={classes.loading}>
                        <Loading/>
                    </div>
                )
            }
        </div>
    )
}



const KitBtn = (id, user_key, setData) => {

    const [awaite, setAwaite] = useState(false)
    const [toggleKit, setToggleKit] = useState(true)

    const handlerGetKitKeys = (id, setData) => {
        setAwaite(true)
        getKitKeys({id: id.id}).then(e => {
          if(e.state) {
            getUserKeyList(id.user_key).then(ee => {
                if(ee.state) {
                    id.setData(ee)
                }
            })
            setAwaite(false)
            setToggleKit(false)
          }  
        })
    }

    if(toggleKit)
        return (
            <Btn onClick={() => handlerGetKitKeys(id, user_key, setData)}
                style={{}}
            >
                {
                        !awaite ? (
                            'Отдать набор'
                        ) : (
                            <div className={classes.loading}>
                                <Loading/>
                            </div>
                        )
                }
            </Btn>
        )
    else return null
}






const KeyAccounting = ({ setWay }) => {

    const [time, setTime] = useState(0)
    const [open, setOpen] = useState(false)
    const [data, setData] = useState({ body:{ all_rooms:[], rooms:[], person:{}, kit:false }})


    useEffect(() => {
        let time  = setInterval(() => {
            const input = document.getElementById('input')
            if (!input){
                return
            }
            input.focus()
        }, 1000)
        return () => {
            clearInterval(time)
        }
    }, [])

    return (
        <section className={classes.KeyAccounting}>
            <div className='container'>
                <div className={classes.breadcrumb} onClick={() => setWay(true)}><ChevronLeft/>Назад</div>
                <h2 className={classes.title}>Учет ключей</h2>
                <div className={classes.block}>

                    <input id='input' style={{opacity:0,width:0.1,height:0.1}} autoFocus onChange={e => {
                        let id = e.target.value
                        if (id.length != 12) return
                        e.target.value = ''
                        setTime(3)
                        getUserKeyList(id).then(ee => {
                            if(ee.state) {
                                setData(ee)
                            }
                        })
                    }}/>

                    {
                        // data.body.person.length > 0 ? (
                            <div className={classes.info}>
                                <div className={classes.card}>
                                    <div className={classes.front} style={{
                                        background:`no-repeat url(${data?.body?.person?.avatar ? data.body.person.avatar : defaultperson}) center center`
                                    }}>
                                        <div className={classes.person_name}>
                                            {(data?.body?.person?.fio?.split(' ')?.[0] ||'') +' '}
                                            {(data?.body?.person?.fio?.split(' ')?.[1]?.[0] || '')+(data?.body?.person?.fio?'. ':'')}
                                            {(data?.body?.person?.fio?.split(' ')?.[2]?.[0] || '')+(data?.body?.person?.fio?'.':'')}
                                        </div>
                                    </div>
                                    <div className={classes.back}>
                                        { 
                                            <div className={classes.person_info}>
                                                <p><b>Должность:</b> {data?.body.person?.position}</p>
                                                <p><b>Подразделение:</b> {data?.body.person?.department}</p>
                                                <p><b>Кол-во нарушений:</b> {Math.round((Math.random() * (10 - 1) + 1), 1)}</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className={classes.keys}>
                                    <h3 className={classes.subtitle}>{data.body.rooms.length > 0 ? 'Ключи:' : 'Нет  доступа к аудиториям!'}</h3>
                                    {
                                        data.body.rooms.length > 0 ? (
                                            <div className={classes.list}>
                                                {data.body.rooms.map((key, i) => (
                                                    <KeyBtn key={i} data={data} setData={setData} index={i}
                                                        id={key._id}
                                                        room={key.room}
                                                        key_status={key.key_status}
                                                        signal_status={key.signal_status}
                                                        signaling={key.signaling}
                                                        userId={data.body.person}
                                                        building={key.building}
                                                        setOpen={setOpen} 
                                                    />
                                                ))}
                                            </div>
                                        )  : null
                                    }
                                    <div className={open ? classes.allKeys : classes._allKeys_hidden}>
                                        <div className={classes.breadcrumb} onClick={() => setOpen(false)}><ChevronLeft/>Закрыть</div>
                                        <h2 className={classes.title}>Выбор ключа БП</h2>
                                        <div className={classes.allKeyslist}>
                                            {
                                                open && data.body.all_rooms.map((key, i) => (
                                                    <KeyBtnBP key={i} data={data} setData={setData} index={i}
                                                        id={key._id}
                                                        room={key.room}
                                                        key_status={key.key_status}
                                                        signal_status={key.signal_status}
                                                        signaling={key.signaling}
                                                        userId={data.body.person}
                                                        building={key.building}
                                                        setOpen={setOpen}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </div>
                                    {
                                        data.body.kit ? (
                                            <KitBtn
                                                id={data.body.person._id}
                                                user_key={data.body.person.user_key}
                                                setData={setData}
                                            />
                                        ) : null
                                    }
                                </div>
                            </div>
                        // ) : (
                        //     <div className={classes.awaite_block}>
                        //         <h4>Попросите сотрудника поднести карточку к считывателю для просмотра доступных ему аудиторий</h4>
                        //         <Loading/>
                        //     </div>
                        // )
                    }
                </div>

                <div className={classes.notes}>
                    <div className={classes.notes_row}>
                        <div className={`${classes.marker} ${classes.in}`}></div>
                        <p> - Ключ <b>на вахте</b>.<br/> - Сигнализация <b>включена</b>.</p>
                    </div>
                    <div className={classes.notes_row}>
                        <div className={`${classes.marker} ${classes.out}`}></div>
                        <p> - Ключ <b>у сотрудника</b>.<br/> - Сигнализация <b>выключена</b>.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default KeyAccounting