import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { authUser } from '../../Fetch'
import Btn from '../../components/UI/buttons/Btn'
import Alert from '../../components/UI/Alerts/Alerts'
import classes from './authorization.module.scss'


const Authorization = ({setIsAuth, success, isAuth}) => {

    const history = useNavigate()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [alert, setAlert] = useState(false)
    const [alertMess, setAlertMess] = useState('')
    let [errorCount, setErrorCount] = useState(5)
  
    useEffect(() => {
        if(success && isAuth){
            history('/')
        }   
    }, [isAuth, success])
    if (!success | isAuth) return <div></div>



    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handlerAuthUser = () => {
        authUser(login, password).then(e => {
            setAlertMess(e.error)
            setAlert(true)
            if(e.state){
                localStorage.setItem('token', e.body)
                localStorage.setItem('login', login)
                setIsAuth(true)
                history('/')
            }
            setErrorCount((e) => e = e - 1)
            if(errorCount === 0) {
                setInterval(() => {
                    
                }, 6000)
            }
        })
    }

    document.addEventListener('keydown', function(event) {
        if(event.keyCode === 13) {
            authUser(login, password).then(e => {
                if(e.state){
                    localStorage.setItem('token', e.body)
                    localStorage.setItem('login', login)
                    setIsAuth(true)
                    history('/')
                }
            })
        }
    })

    return (
        <main className={classes.authorization}>
            <div className={classes.form}>
                <div className={classes.header}>
                    <h2 className={classes.title}>Авторизация</h2>
                </div>
                <div className={classes.body}>
                    
                    <TextField id='input-with-sx' 
                        label='Логин' variant='outlined'
                        onChange={e => setLogin(ee => e.target.value)} 
                    />
                    
                    <FormControl variant='outlined' style={{marginTop:20, marginBottom:15}}>
                        <InputLabel htmlFor='outlined-adornment-password'>Пароль</InputLabel>
                        <OutlinedInput id='outlined-adornment-password'
                            label='Пароль'
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={e => { setPassword(ee => e.target.value) }}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton edge='end'
                                        aria-label='toggle password visibility'
                                        onClick={() => setShowPassword(e => !e)}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Btn onClick={handlerAuthUser}>войти</Btn>
                </div>
            </div>

            { 
                alert && (
                    <Alert 
                        alert={alert} 
                        alertMess={alertMess} 
                        errorCount={errorCount}  
                    />
                )
            }
            
        </main>
    )
}

export default Authorization