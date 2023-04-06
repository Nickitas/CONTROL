import classes from './modal_window.module.scss'

const ModalHeader = ({ ...props }) => {
    return (
        <div className={classes.header}>
            <h2 className='subtitle'>
                { props.children }
            </h2>
        </div>
    )
}

export { ModalHeader }