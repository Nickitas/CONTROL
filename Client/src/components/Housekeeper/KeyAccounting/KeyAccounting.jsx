import React, { useState, useEffect } from 'react'

import { GetUserKeyList, UpdateKeyStatus, UpdateSignalStatus, getRoomsList } from '../../../Fetch'
import { ReactComponent as Loading } from '../../../img/loading.svg'
import { ChevronLeft, Bell } from '../../../svg.module'
import defaultperson from '../../../img/person.svg'
import classes from './KeyAccounting.module.scss'

// 00B4C5048296
// 0001064D55B2
// 03203395331B
// 00569854CC6E
// 0120CEEEBF04
// watch

// .sort((a, b) => a.room > b.room?b.room:a.room)

const onClickRoom = (setAwaite, props, type='rooms') => {
    setAwaite(true)
    UpdateKeyStatus(props.id, props.key_status, props.signal_status, props.userId).then(ee => {
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
const onClickSignal = (setAwaite, props, type='rooms') => {
    setAwaite(true)
    UpdateSignalStatus(props.id, props.signal_status, props.userId).then(ee => {
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
            {!awaite?
            <>
                <div className={classes.room} onClick={() => { onClickRoom(setAwaite, props,'all_rooms') }} style={{backgroundColor:key_status?'#008000':'#ff0000', borderRadius:signaling?'5px 0 0 5px':5}}>
                    {building}-{room}
                </div>
                <div className={classes.signal} onClick={() => { onClickSignal(setAwaite, props,'all_rooms') }} style={{backgroundColor:signal_status?'#008000':'#ff0000', display:signaling?'flex':'none'}}>
                    <Bell/>
                </div>
            </>
            :
            <div className={classes.loading}>
                <Loading/>
            </div>
            }
        </div>
    )
}

const KeyBtn = (props) => {
    const [awaite, setAwaite] = useState(false)
    const {setOpen} = props
    
    return (
        <div className={classes.keyBtn}>
            {!awaite?
            <>
                <div className={classes.room} onClick={() => {
                    if(props.room=='БП') {
                        setOpen(e =>! e)
                        return
                    }
                    onClickRoom(setAwaite, props)
                }}
                style={{backgroundColor:props.key_status?'#008000':'#ff0000', borderRadius:props.signaling?'5px 0 0 5px':5}}>
                    {props.building}-{props.room}
                </div>
                <div className={classes.signal} onClick={() => { onClickSignal(setAwaite, props) }} style={{backgroundColor:props.signal_status?'#008000':'#ff0000', display:props.signaling?'flex':'none'}}>
                    <Bell/>
                </div>
            </>
            :
            <div className={classes.loading}>
                <Loading/>
            </div>
            }
        </div>
    )
}

const KeyAccounting = ({setWay}) => {
    const [time, setTime] = useState(0)
    const [open,setOpen] = useState(false)
    const [data, setData] = useState({
        body:{
            rooms:[],
            person:{}
        }
    })
    useEffect(()=>{
        let time  = setInterval(() => {
            const input = document.getElementById('input')
            if (!input){
                return
            }
            input.focus()
        },1000)
        return () => {
            clearInterval(time)
        }
    },[])

    return (
        <section className={classes.KeyAccounting}>
            <div className='container'>
                <div className={classes.breadcrumb} onClick={() => setWay(true)}><ChevronLeft/>Назад</div>
                <h2 className={classes.title}>Учет ключей</h2>
                <div className={classes.block}>

                    <input id='input' style={{opacity:0,width:0.1,height:0.1}} autoFocus onChange={(e) => {
                        let id = e.target.value
                        if (id.length!=12) return
                        e.target.value=''
                        setTime(3)
                        GetUserKeyList(id).then(ee => {
                            if(ee.state) {
                                setData(ee)
                            }
                        })
                    }}/>

                    <div className={classes.info}>
                        <div className={classes.card}>
                            <div className={classes.front} style={{
                                background:`no-repeat url(${data?.body?.person?.avatar?data.body.person.avatar:defaultperson}) center center`,
                                backgroundSize:'contain'
                            }}>
                                <div className={classes.person_name}>
                                    {(data?.body?.person?.fio?.split(' ')?.[0] ||'') +' '}
                                    {(data?.body?.person?.fio?.split(' ')?.[1]?.[0] || '')+(data?.body?.person?.fio?'. ':'')}
                                    {(data?.body?.person?.fio?.split(' ')?.[2]?.[0] || '')+(data?.body?.person?.fio?'.':'')}
                                </div>
                            </div>
                            <div className={classes.back}>
                                <div className={classes.person_info}>
                                    <p><b>Должность:</b> {data?.body.person?.position}</p>
                                    <p><b>Подразделение:</b> {data?.body.person?.department}</p>
                                    {/* <p><b>Кол-во нарушений:</b> {Math.round((Math.random() * (10 - 1) + 1), 1)}</p> */}
                                </div>
                            </div>
                        </div>
                        <div className={classes.keys}>
                            <h3 className={classes.subtitle}>{data.body.rooms.length > 0?'Ключи:':'Нет  доступа к аудиториям!'}</h3>
                            {
                                data.body.rooms.length > 0?
                                <div className={classes.list}>
                                    {data.body.rooms.map((key, i) => <KeyBtn data={data} setData={setData} 
                                        index={i}
                                        id={key._id}
                                        room={key.room}
                                        key_status={key.key_status}
                                        signal_status={key.signal_status}
                                        signaling={key.signaling}
                                        userId={data.body.person}
                                        building={key.building}
                                        setOpen={setOpen} />)}
                                </div>
                                :
                                ''
                            }
                            <div className={open?classes.allKeys:classes._allKeys_hidden}>
                                <div className={classes.breadcrumb} onClick={() => setOpen(false)}><ChevronLeft/>Закрыть</div>
                                <h2 className={classes.title}>Выбор ключа БП</h2>
                                <div className={classes.allKeyslist}>
                                    {
                                        open&&data.body.all_rooms.map((key, i) => <KeyBtnBP data={data} 
                                            setData={setData}
                                            id={key._id}
                                            index={i}
                                            room={key.room}
                                            key_status={key.key_status}
                                            signal_status={key.signal_status}
                                            signaling={key.signaling}
                                            userId={data.body.person}
                                            building={key.building}
                                            setOpen={setOpen} 
                                            key={i} />)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.notes}>
                    <div className={classes.notes_row}>
                        <div className={`${classes.marker} ${classes.in}`}></div>
                        <p> - Ключ <b style={{color:'#008000'}}>на вахте</b>. Сигнализация <b style={{color:'#008000'}}>включена</b>.</p>
                    </div>
                    <div className={classes.notes_row}>
                        <div className={`${classes.marker} ${classes.out}`}></div>
                        <p> - Ключ <b style={{color:'#ff0000'}}>у сотрудника</b>. Сигнализация <b style={{color:'#ff0000'}} >выключена</b>.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default KeyAccounting