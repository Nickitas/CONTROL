import classes from './modal_window.module.scss'


const ModalRow = ({ ...props }) => {
    return (
        <div className={classes.modal_row}>
            { props.children }
        </div>
    )
}

export { ModalRow }