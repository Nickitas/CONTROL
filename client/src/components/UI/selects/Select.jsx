import React from 'react'
import classes from './Select.module.scss'

const Select = ({options=[], defultValue, value, onChange}) => {
    return (
        <div className={classes.ui_select}>
            <select className={classes.Select}
                value={value}
                onChange={e => onChange(e.target.value)}
            >
            <option disabled value=''>{defultValue}</option>
            {options.map((option,i)=> 
                <option key={i} value={option.value}>
                    {option.name}
                </option>
            )}
            </select>
            <div className={classes.arrow}>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#a7a7a7' className='bi bi-chevron-compact-down' viewBox='0 0 16 16'>
                    <path fillRule='evenodd' d='M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z'/>
                </svg>
            </div>
        </div>
    )
}
export default Select