import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useAxiosPrivate } from '../../../hooks/useAxiosPrivate'
import jwt_decode from 'jwt-decode'
import { Alert } from '../../../components/UI/Alert/Alert'
import { Loading } from '../../../components/UI/loadings/Loading/Loading'
import { LoadingSm } from '../../../components/UI/loadings/LoadingSm/LoadingSm'
import { Bell } from '../../../components/svg.module'
import defaultperson from '../../../assets/images/pic/defaultperson.svg'
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


// 00B4C5048296
// 0001064D55B2
// 03203395331B
// 00569854CC6E
// 0120CEEEBF04
// 0099DAE5FD44
// 0099DAE5FD44


const KeysAccounting = () => {
    const hiddenInputRef = useRef()
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    // ФИО, фотка, должность, подразделение, кол-во нарушений
    const [personData, setPersonData] = useState([])
    const [availabelKeys, setAvailabelKeys] = useState([])
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

    const getPersonAvailabelKeys = async (e) => {
        let key = e.target.value
        if (isValidKey(key)) {
            try {
                const response = await axiosPrivate.get(`/housekeeper/user_keys/${key}`)
                setPersonData(response?.data.person)
                
            } catch (err) {
                if(!err?.response) {
                    if (!err?.response) console.log(`No response from server`)
                } else {
                    console.error(err)
                }
            }
        }
    }

    const setPersonPic = () => {
        // ({background:`no-repeat url(${data?.body?.person?.avatar ? data.body.person.avatar : defaultperson}) center center`})
    }

    const keys_accounting = (
        <section className={classes.keys_accounting}>
            <div className={classes.row}>
                <h1 className='title'>Учет ключей</h1>
            </div>

            <input className={classes.hiddeninput}
                autoFocus
                ref={hiddenInputRef}
                onChange={getPersonAvailabelKeys}
            />

            <div className={classes.workplace}>
                
                <div className={classes.person_block}>
                    <div className={classes.card}>
                        {/* <div className={classes.front} style={setPersonPic}> */}
                        <div className={classes.front}>
                            <div className={classes.person_name}>
                               { personData.fio }
                            </div>
                        </div>
                        <div className={classes.back}>
                            <div className={classes.person_info}>
                                <p>{ personData.position }</p>
                                <p>{ personData.department }</p>
                                <p><b>Нарушений:</b> {Math.round((Math.random() * (10 - 1) + 1), 1)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={classes.keys_block}>
                    <h3 className='headline'>Доступные ключи</h3>
                    <div className={classes.list}>
                        {
                          'keys'  
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