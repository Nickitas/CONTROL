import { forwardRef } from 'react'
import classes from './input.module.scss'


const Input = forwardRef(({ ...props }, forwardedRef) => {
        
    return (
        <div className={classes.input_wrapper}>
            <input className={classes.input} 
                ref={ forwardedRef }
                { ...props } 
                placeholder={ props.lable } />
            <label className={classes.label}>{ props.lable }</label>
        </div>
    )
})

export { Input }