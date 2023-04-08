import { useState, forwardRef } from 'react'
import { EyeIcon, HideIcon } from '../../../svg.module'
import classes from './input_password.module.scss'


const InputPassword = forwardRef(({ ...props }, forwardedRef) => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className={classes.input_wrapper}>
            <input className={classes.input_password} 
                { ...props } 
                ref={ forwardedRef }
                placeholder={props.label} 
                type={showPassword ? 'text' : 'password'}
                current-password='true'
            />
            <label className={classes.label}>
                { props.label }
            </label>
            <div className={classes.icon} onClick={() => setShowPassword(e => !e)}>
                { showPassword ? <HideIcon/> : <EyeIcon/>}
            </div>
        </div>
    )
})

export { InputPassword }