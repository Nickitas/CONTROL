import React, { useState } from 'react'
import { Okey, Danger } from '../../../svg.module'
import classes from './Alerts.module.scss'

const Alerts = ({alert, alertMess, errorCount, ...props}) => {

    return (
        <div {...props} className={`${classes.Alerts} ${alert?classes.active:''} ${alertMess=='invalid login or password'?classes.danger:classes.okey}`}>
            {
                alertMess=='invalid login or password'?
                <Danger/>:<Okey/>
            }
            <p>
                {
                    alertMess=='invalid login or password'?
                    `Логин или пароль введены неверно! Осталось попыток: ${errorCount}`
                    :'Аторизаций прошла успешно!'
                }
            </p>
        </div>
    )
}
export default Alerts