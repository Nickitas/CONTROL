import classes from './table.module.scss'

const TableBodyCell = ({ ...props }) => {
    return (
        <td className={classes.tbody_cell} {...props}>
            { props.children }
        </td>
    )
}

export { TableBodyCell }