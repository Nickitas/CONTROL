import React from 'react'
import classes from './ExtraBtn.module.scss'

const ExtraBtn = ({children, ...props}) => {
    return (
        <div {...props} className={classes.ExtraBtn}  data-modal-button='modal-1' type='button'>
            {children}
        </div>
    )
}
export default ExtraBtn;