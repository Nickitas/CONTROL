import classes from './modal_window.module.scss'


const ModalBody = ({ ...props }) => {

    return (
        <div className={classes.body}>
            <div className={classes.scroll_block}>
                { props.children }
            </div>
        </div>
    )
}

export { ModalBody }