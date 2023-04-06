import classes from './accordion.module.scss'


const Accordion = ({ ...props }) => {
    return (
        <div className={classes.accordion} {...props}>
            { props.children }
        </div>
    )
}

export { Accordion }