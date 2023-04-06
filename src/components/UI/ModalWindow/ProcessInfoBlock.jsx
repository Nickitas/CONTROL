
import { InfoIcon, ErrorIcon } from '../../svg.module'
import classes from './modal_window.module.scss'

const ProcessInfoBlock = ({ type, children }) => {

    const currentClassName = (type) => {
        let className = classes.process_info_block
        if (type === 'error') {
            className = `${className} ${classes.warning}`
        }

        return className
    }

    const process_info_block = (
        <div className={currentClassName(type)}>
            { type === 'error' ? <ErrorIcon/> : <InfoIcon /> }
            { children } 
        </div>
    )

    return process_info_block
}

export { ProcessInfoBlock }