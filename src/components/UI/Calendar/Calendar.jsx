import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"
import ruLocale from '@fullcalendar/core/locales/ru'
import { Alert } from '../../../components/UI/Alert/Alert'
import './calendar.css'


const Calendar = ({ data }) => {
    const [alertState, setAlertState] = useState({ show: false, type: '', message: '' })
    
    const handleDateClick = (e) => {
        const dateStr = e.dateStr
        const eventDefs = e.dayEl?.fcSeg?.eventRange?.defs || []
        const events = eventDefs.map(def => def.extendedProps)

        setAlertState({ 
            show: true, 
            type: 'info',
            message: `События на ${dateStr}: ${eventDefs.length > 0 ? events : 'нет'}`,
        })
    }

    function eventContent(eventInfo) {
        return (
          <>
            <div>{eventInfo.timeText}</div>
            <div>{eventInfo.event.title}</div>
            <div>{eventInfo.event.extendedProps.customText}</div>
          </>
        )
    }
  
    return (
        <div className='calendar'>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev',
                    center: 'title',
                    right: 'next'
                }}
                initialView='dayGridMonth'
                weekends={true}
                hiddenDays={[0]}
                events={data}
                eventContent={eventContent}
                dateClick={handleDateClick}
                locale={ruLocale}
                eventColor={'#378006'}
                focusable="false"
            />

            <Alert 
                alertState={alertState} 
                setAlertState={setAlertState} 
            />

        </div>
    )
}

export { Calendar }