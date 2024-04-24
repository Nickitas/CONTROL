import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"
import ruLocale from '@fullcalendar/core/locales/ru'


// function renderEventContent(eventInfo) {
//     console.log(eventInfo)
//     return (
//       <>
//         <b>{eventInfo.timeText}</b>
//         <i>{eventInfo.event.title}</i>
//       </>
//     )
// }


const Calendar = ({ data }) => {
    
    // const handleDateClick = (e) => {
    //     console.log(`${e.title} на ${e.date}`)
    // }

    console.log(data)

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
        <div className="Calendar">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={data}
                eventContent={eventContent}
                dateClick={(e) => handleDateClick(data)}
                locale={ruLocale}
                eventColor={'#378006'}
                />
        </div>
    )
}

// const events = [
//     {
//         id: 0,
//         title: "All Day Event very long title",
//         allDay: true,
//         start: new Date(2015, 3, 0),
//         end: new Date(2015, 3, 1)
//       },
// ]

export default Calendar