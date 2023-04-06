import classes from './modal_window.module.scss'


const ModalFooter = ({ ...props }) => {
    return (
        <div className={classes.footer}>
            { props.children }
        </div>
    )
}

export { ModalFooter }