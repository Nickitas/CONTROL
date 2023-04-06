import classes from './action_btn.module.scss'

const ActionBtn = ({ ...props }) => {
    return (
        <div className={classes.action_btn} {...props}>
            <div className={classes.icon}>
                { props.ico }
            </div>
            <div className={classes.action}>
                { props.children }
            </div>
        </div>
    )
}

export { ActionBtn }