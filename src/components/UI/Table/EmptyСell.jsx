import classes from './table.module.scss'

const EmptyCell = ({ children }) => {

    const empty_cell = (
        <div className={classes.empty_cell}>
            { children }
        </div>
    )

    return empty_cell
}

export { EmptyCell }