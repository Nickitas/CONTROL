import React, { useState, useRef, useEffect } from 'react'
import classes from './tooltip.module.scss'


const Tooltip = ({ title, children }) => {
    const [show, setShow] = useState(false)
    const parentRef = useRef(null)
    const tooltipRef = useRef(null)

    const getTooltipPosition = (parentRect, tooltipRect) => {
        return {
    //   top: parentRect.top - tooltipRect.height - 4,
    //   left: parentRect.left + parentRect.width / 2 - tooltipRect.width / 4,
            top: parentRect.top + tooltipRect.height,
            left: parentRect.left - parentRect.width * (parentRect.width / 1.5) ,
        }
    }

  useEffect(() => {
    if (show && tooltipRef.current) {
        const parentRect = parentRef.current.getBoundingClientRect()
        const tooltipRect = tooltipRef.current.getBoundingClientRect()

        const tooltipPosition = getTooltipPosition(parentRect, tooltipRect)

        tooltipRef.current.style.top = `${tooltipPosition.top}px`
        tooltipRef.current.style.left = `${tooltipPosition.left}px`
    }
}, [show])

    return (
        <div className={classes.tooltip_wrapper}>
            <div ref={tooltipRef} className={`${classes.tooltip} ${show ? classes.show : ''}`}>
                { title }
            </div>
            <div className={classes.content} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                { React.cloneElement(children, { ref: parentRef })}
            </div>
        </div>
    )
}

export { Tooltip }