import { useRef, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useInput  } from '../../hooks/useInput'
import { useToggle } from '../../hooks/useToggle'
import axios from '../../api/axios'

import { Input } from '../../components/UI/inputs/Input/Input'
import { InputPassword } from '../../components/UI/inputs/InputPassword/InputPassword'
import { Button } from '../../components/UI/buttons/Button/Button'
import { Checkbox } from '../../components/UI/Checkbox/Checkbox'
import { Alert } from '../../components/UI/Alert/Alert'
import { AUTH_ROUT, HOME_ROUT } from '../../utils/routersPath'
import { ErrorIcon } from '../../components/svg.module'
import classes from './authorization.module.scss'


const Authorization = () => {
    const { setAuth } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || HOME_ROUT

    const userRef = useRef()
    const errRef = useRef()

    const [user, resetUser, userAttribs] = useInput('user', '')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [check, toggleCheck] = useToggle('persist', false)
    
    const [anotherEntry, setAnotherEntry] = useState(true)
    const [alertState, setAlertState] = useState({ show: false, type: '', message: '' })

    useEffect(() => {
        userRef.current.focus()
    }, [])
  
    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])


    const handleAuthorization = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(AUTH_ROUT,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                    // credentials: 'include',
                    // sameSite: 'strict'
                }
            )

            const accessToken = response?.data?.accessToken
            const roles = response?.data?.roles

            setAuth({ user, pwd, roles, accessToken })
            resetUser()
            setPwd('')
            navigate(from, { replace: true })

        } catch(err) {
            if(!err?.response) {
                setErrMsg('Нет ответа от сервера')
            } else if (err.response?.status === 400) {
                setErrMsg('Отсутствует имя пользователя или пароль')
            } else if (err.response?.status === 401) {
                setErrMsg('У вас нет официального разрешения на вход')
            } else {
                setErrMsg('Ошибка входа')
            }
            errRef.current.focus()
        }
    }

    const hendlerAlertInfoOpen = () => {
        navigator.clipboard.writeText('nickitadatsky@gmail.com')
        .then(() => setAlertState({
            show: true,
            type: 'info',
            message: 'Для регистрации обратитесь в ауд. 1-391а. Или напишите на почту, что скопирована в буфер обмена ( ❛ ᴗ ❛)'
        }))
        .catch(err => setAlertState({
            show: true,
            type: 'error',
            message: 'Что-то пошло не так... Нажмите еще разок (´。＿。｀)'
        }))
    }

    const content = (
        <div className={classes.authorization}>
            <div className='content'>
                <div className={classes.form} onSubmit={handleAuthorization}>
                    <div className={classes.header}>
                        <h1 className='title'>Авторизация</h1>
                    </div>
                    <div className={classes.body}>
                        <Input name='login'
                            lable='Логин'
                            type='text'
                            id='username'
                            value={user}
                            ref={userRef}
                            autoComplete='off'
                            { ...userAttribs }
                            required
                        />
                        {
                            anotherEntry ? (
                                <InputPassword name='password'
                                    lable='Пароль' 
                                    type='password'
                                    id='password'
                                    value={pwd}
                                    onChange={e => setPwd(e.target.value)}
                                    required    
                                />
                            ) : null
                        }
                    </div>
                    <div className={classes.footer}>
                        <Button type='submit' onClick={handleAuthorization}>
                            войти
                        </Button>

                        <Checkbox
                            label='Доверять этому устройству'
                            id='persist'
                            onChange={toggleCheck}
                            checked={check}
                        />

                        <div className={classes.errors_messages}>
                            <p ref={errRef} className={errMsg ? classes.errmsg : classes.offscreen} aria-live='assertive'> 
                                <ErrorIcon/>
                                <span>{ errMsg }</span>
                            </p>
                        </div>

                        <div className={classes.another_variant}>
                            <a onClick={() => setAnotherEntry(prev => !prev)}>Попробуем другой вариант?</a>
                            <a onClick={hendlerAlertInfoOpen}>Забыли данные для входа?</a>
                        </div>
                    </div>
                </div>
            </div>

            <Alert 
                alertState={alertState} 
                setAlertState={setAlertState} 
            />

        </div>
    )

    return content
}

export default Authorization