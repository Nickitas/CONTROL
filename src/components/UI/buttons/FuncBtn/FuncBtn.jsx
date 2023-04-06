import { NavLink } from 'react-router-dom'
import classes from './func_btn.module.scss'


const FuncBtn = ({ ...props }) => {
    return (
        <NavLink to={props.path}>
            <div className={classes.func_btn}>
                <div className={classes.head}>
                    <img src={props.img} alt={props.title} />
                    <h3 className='headline'>{ props.title }</h3>
                </div>
                <p className={classes.disc}>{ props.disc }</p>
            </div>
        </NavLink>
    )
}

export { FuncBtn }