import classes from './loading_sm.module.scss'

const LoadingSm = () => {

    return (
        <div className={classes.loading_sm}>
            {
                Array.from({ length: 8 }).map((_, i) => (
                    <div key={i}></div>
                ))
            }
        </div>
    )
}

export { LoadingSm }