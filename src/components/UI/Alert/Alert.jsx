import { useEffect } from 'react'
import { InfoIcon, LightningIcon, ErrorIcon, CloseIcon } from '../../svg.module'
import classes from './alert.module.scss'


const Alert = ({ alertState, setAlertState }) => {

    useEffect(() => {
        setTimeout(() => {
            setAlertState({ show: false })
        }, 3_500)
    }, [alertState.show])

    const handleCloseAlert = () => {
        setAlertState({ show: false })
    }

    return (
        <div className={`${classes.alert} ${alertState.show ? classes.animation : ''}`}>
            <div className={classes.icon}>
                {
                    alertState.type === 'info' && (
                        <InfoIcon />
                    ) ||
                    alertState.type === 'error' && (
                        <ErrorIcon />
                    ) || (
                        <LightningIcon/>
                    )
                }
            </div>
            <div className={classes.message}>
                <h5>
                    { 
                       alertState.type === 'info' && (
                            'Информация'
                        ) ||
                        alertState.type === 'error' && (
                            'Ошибка!'
                        ) || (
                            'Сообщение'
                        )
                    }
                </h5>
                <p>{ alertState.message }</p>
            </div>
            <div className={classes.close} onClick={handleCloseAlert}>
                <CloseIcon/>
            </div>
        </div>
    )
}

export { Alert }