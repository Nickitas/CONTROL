import { useState } from 'react'
import { ArrowDownInCircleIcon } from '../../svg.module'
import classes from './accordion.module.scss'


const AccordionSummary = ({ ...props }) => {

    const [clicked, setClicked] = useState(false)

    return (
        <div className={clicked ? `${classes.summary} ${classes.clicked}` : `${classes.summary}`} 
             {...props} 
             onClick={() => setClicked(e => !e)}
        >
            <h3 className='headline'>
                { props.children }
            </h3>
            <div className={classes.icon}>
                <ArrowDownInCircleIcon/>
            </div>
        </div>
    )
}

export { AccordionSummary }