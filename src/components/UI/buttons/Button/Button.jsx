import classes from './button.module.scss'

const Button = ({ ...props }) => {
    return (
        <button {...props} className={classes.button} type='button'>
            { props.children }
        </button>
    )
}

export { Button }