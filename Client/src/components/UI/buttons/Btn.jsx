import React from 'react'
import classes from './Btn.module.scss'

const Btn = ({children, ...props}) => {  
    return (
        <button {...props} className={classes.Btn} type='button'>
            {children}
        </button>
    );
};
export default Btn;