import { useState } from 'react'
import { ShrinkOnIcon, ShrinkOffIcon } from '../../svg.module'
import classes from './table.module.scss'


const ShrinkBtn = ({ shrink, setShrink }) => {
    
    const handlerShrinkpadding = () => {
        setShrink(e => !e)
    }

    return (
        <div className={classes.shrink_btn}  onClick={handlerShrinkpadding}>
            { shrink ?  <ShrinkOffIcon/> : <ShrinkOnIcon/> }
        </div>
    )
}

const Table = ({ children, ...props }) => {

    const [shrink, setShrink] = useState(true)

    return (
        <div className={classes.table_container}>
            <div className={classes.table_wrapp}>
                <ShrinkBtn shrink={shrink} setShrink={setShrink} />
                <table className={`${classes.table} ${shrink ?  `${classes.shrink}` : ''}`} {...props}>
                    { children }
                </table>
            </div>
        </div>
    )
}

export { Table }