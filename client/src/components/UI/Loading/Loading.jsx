

import React from 'react'
import classes from './loading.module.scss'

const Loading = () => {
    return (
        <div className={classes.loading_wrapp}>
            <div className={classes.loading}>
                {
                    Array.from({length: 100}).map((_, i) => <i key={i}><b> /.</b></i>)
                }
            </div>
        </div>
    )
}

export default Loading