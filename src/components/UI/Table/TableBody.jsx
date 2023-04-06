import classes from './table.module.scss'

const TableBody = ({ ...props }) => {
    return (
        <tbody className={classes.tbody} {...props}>
            { props.children }
        </tbody>
    )
}

export { TableBody }