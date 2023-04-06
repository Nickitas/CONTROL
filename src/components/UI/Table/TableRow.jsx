import classes from './table.module.scss'

const TableRow = ({ ...props }) => {
    return (
        <tr className={classes.table_row} {...props}>
            { props.children }
        </tr>
    )
}

export { TableRow }