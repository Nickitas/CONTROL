import { useState } from 'react'
import { ArrowSolidIcon } from '../../svg.module'
import classes from './table.module.scss'

const TableHeadCell = ({ ...props }) => {

    const [toggle, setToggle] = useState(false)

    return (
        <th className={classes.thead_cell} {...props}>
            <div className={classes.line} onClick={() => setToggle(e => !e)}>
                <span>{ props.children }</span>
                <div className={toggle ? `${classes.icon} ${classes.iconRot}` : `${classes.icon}`}>
                    <ArrowSolidIcon/>
                </div>
            </div>
        </th>
    )
}

export { TableHeadCell }