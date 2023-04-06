import classes from './table.module.scss'

const TableHead = ({ ...props }) => {
    return (
        <thead className={classes.thead} {...props}>
            { props.children }
        </thead>
    )
}

export { TableHead }