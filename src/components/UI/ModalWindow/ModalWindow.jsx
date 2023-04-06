import { useEffect } from 'react'
import { CloseIcon } from '../../svg.module'
import classes from './modal_window.module.scss'


const ModalWindow = ({ visible, setVisible, ...props }) => {

    useEffect(() => {
        if (visible) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'auto'
        return () => { document.body.style.overflow = 'auto' }
    }, [visible])

    return (
        <div className={classes.fade}>
            <div className={classes.modal_window}>
                <div className={classes.close_btn} onClick={() => setVisible(false)}>
                    <CloseIcon/>
                </div>
                { props.children }
            </div>
        </div>
    )
}

export { ModalWindow }