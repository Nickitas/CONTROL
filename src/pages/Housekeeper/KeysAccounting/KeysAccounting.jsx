import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useAxiosPrivate } from '../../../hooks/useAxiosPrivate'
import jwt_decode from 'jwt-decode'
import { PersonCard } from './PersonCard/PersonCard'
import { Alert } from '../../../components/UI/Alert/Alert'
import { Loading } from '../../../components/UI/loadings/Loading/Loading'
import { LoadingSm } from '../../../components/UI/loadings/LoadingSm/LoadingSm'
import { Bell } from '../../../components/svg.module'
import classes from './keys_accounting.module.scss'



const KeyBtn = (props) => {
    const [awaite, setAwaite] = useState(false)
    const { key_status, signal_status, signaling, building, room } = props

    const handleRoomToggle = () => {

    }

    const handleSignalToggle = () => {

    }

    const setKeyStatysStyle = () => {
        ({
            backgroundColor: key_status ? '#008000' : '#ff0000', 
            borderRadius: signaling ? '5px 0 0 5px' : 5
        })
    }

    const setSignalStatysStyle = () => {
        ({
            backgroundColor: signal_status ? '#008000' : '#ff0000', 
            display: signaling ? 'flex' : 'none'
        })
    }

    return (
        <div className={classes.key_btn}>
            {
                awaite ? (<>
                    <div className={classes.room} onClick={() => {handleRoomToggle(setAwaite, props, 'all_rooms')}} 
                        style={setKeyStatysStyle}>
                        { building }-{ room }
                    </div>
                    <div className={classes.signal} onClick={() => {handleSignalToggle(setAwaite, props, 'all_rooms')}} 
                        style={setSignalStatysStyle}>
                        <Bell/>
                    </div>
                </>) : (
                    <LoadingSm/>
                )
            }
        </div>
    )
}








// housekeeper/user_keys/:key
// housekeeper/update_key_status
// housekeeper/update_signal_status
// housekeeper/kit_keys



const KeysAccounting = () => {
    const hiddenInputRef = useRef()
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const [personData, setPersonData] = useState({})
    const [availableRooms, setAvailableRooms] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [alertState, setAlertState] = useState({ show: false, type: '', message: '' })

    const decoded = auth?.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined
    const userRole = decoded?.UserInfo?.roles || []


    useEffect(() => {
        const intervalId = setInterval(() => {
            if (hiddenInputRef.current) {
                hiddenInputRef.current.focus()
                hiddenInputRef.current.value = ''
            }
        }, 2000)
    
        return () => clearInterval(intervalId)
    }, [])

    const isValidKey = key => {
        const regex = /^[0-9A-Za-z]{12}$/
        return regex.test(key)
    }
    
    const hendleGetPersonAvailabelRooms = (e) => {
        const getPersonAvailabelRooms = async () => {
            let key = e.target.value
                try {
                    if (isValidKey(key)) {
                        const response = await axiosPrivate.get(`/housekeeper/user_keys/${key}`)
                        if (response?.status === 200) {
                            setPersonData(response.data.person)
                            setAvailableRooms(response.data.rooms.map(el => {
                                return {
                                    id: el._id,
                                    building: el.building,
                                    room: el.room,
                                    signaling: el.signaling,
                                    key_status: el.key_status,
                                    signal_status: el.signal_status,
                                    subunit: el.subunit,
                                    head: el.head,
                                    phone: el.phone,
                                }
                            }))
                            setAlertState({ 
                                show: true, 
                                message: `Информация найдена!`
                            })
                        }
                    } else {
                        setAlertState({ 
                            show: true, 
                            type: 'error',
                            message: `Неверный ввод ключа! Повторите`
                        })
                    }
                } catch (err) {
                    if(!err?.response) {
                        setAlertState({ 
                            show: true, 
                            type: 'error',
                            message: `Нет ответа от сервера!`
                        })
                    } else {
                        setAlertState({ 
                            show: true, 
                            type: 'error',
                            message: `Ошибка считывания! \nПопробуйте повторить`
                        })
                    }
                }
        }
        getPersonAvailabelRooms()
    }

    const keys_accounting = (
        <section className={classes.keys_accounting}>
            <div className={classes.row}>
                <h1 className='title'>Учет ключей</h1>
            </div>

            <div>00B4C5048296</div>
            <div>0001064D55B2</div>
            <div>03203395331B</div>
            <div>00569854CC6E</div>
            <div>0120CEEEBF04</div>
            <div>0099DAE5FD44</div>
            <div>0099DAE5FD44</div>

            <input className={classes.hiddeninput}
                autoFocus
                ref={hiddenInputRef}
                onChange={hendleGetPersonAvailabelRooms}
            />

            <div className={classes.workplace}>
                <PersonCard
                    data={personData}
                />
                
                <div className={classes.keys_block}>
                    <h3 className='headline'>Доступные ключи</h3>
                    <div className={classes.list}>
                        {
                          availableRooms.map(key => (
                              
                              <div key={key._id}>
                                <span>{ `${key.building}-${key.room}` }</span>
                                <span>{ key.key_status }</span>
                                <span>{ key.signaling }</span>
                                <span>{ key.signal_status }</span>
                            </div>

                          ))
                        }    
                    </div>
                </div>

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

            <Alert 
                alertState={alertState} 
                setAlertState={setAlertState} 
            />

        </section>
    )

    return keys_accounting
}

export default KeysAccounting