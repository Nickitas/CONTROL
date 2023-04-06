import classes from './accordion.module.scss'


const AccordionDetails = ({ ...props }) => {
    return (
        <div className={classes.details} {...props}>
            { props.children }
        </div>
    )
}

export { AccordionDetails }