import { useState, createRef } from 'react'
import { ChevronDown } from '../../svg.module'
import classes from './select.module.scss'


const Select = ({ options, defultValue, updateSelect }) => {
    const [selectedValue, setSelectedValue] = useState(defultValue)
    const [open, setOpen] = useState(false)
    const selectRef = createRef()

    const handlerOptionSelected = (option) => {
        setSelectedValue(option.value)
        updateSelect(option.type)
        setOpen(false)
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.select} onClick={() => setOpen(prev => !prev)}>
                <input className={classes.input_type}
                    value={selectedValue}
                    ref={selectRef}
                    readOnly
                />
                <div className={open ? `${classes.icon} ${classes.iconRot}` : `${classes.icon}`}>
                    <ChevronDown/>
                </div>
            </div>
            <div className={open ? `${classes.dropdown} ${classes.open}` : classes.dropdown}>
                {
                    options.map(option => (
                        <div key={option.value} className={classes.option} onClick={() => handlerOptionSelected(option)}>
                            { option.value }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export { Select }