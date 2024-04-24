import React from 'react'
import classes from './Input.module.scss'

const Input = ({...props}) => {
    return (
        <input {...props} required className={classes.Input}/>
    )
}
export default Input;