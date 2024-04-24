import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { getRoomsList, addRoom } from '../../../Fetch'
import WorkersModal from './WorkersModal'
import EditRoomsModal from './EditRoomsModal'
import { ChevronLeft, Pencil, UserCircle, Search } from '../../../svg.module'
import UpdateBtn from '../../../components/UI/elements/UpdateBtn/UpdateBtn'
import Btn from '../../../components/UI/buttons/Btn'
import Input from '../../../components/UI/inputs/Input'
import Select from '../../../components/UI/selects/Select'
import Loading from '../../../components/UI/Loading/Loading'
import classes from './RoomsList.module.scss'


const RoomsList = ({ setWay, lvl }) => {

    const [rows, setRows] = useState([])
    const [query, setQuery] = useState('room')
    const [textQuery, setTextQuery] = useState('')

    const [visibleEditRooms, setVisibleEditRooms] = useState(false)
    const [visibleWorkers, setVisibleWorkers] = useState(false)

    useEffect(() => {
        // if(rows.length != 0) return
        getRoomsList().then(e => {
            if(e.state){
                setRows(e.body.map(ee => {
                    return {
                        id: ee._id,
                        building: ee.building,
                        subunit: ee.department,
                        room: ee.room,
                        type: ee.type,
                        head: ee.head,
                        phone: ee.phone,
                    }
                }))
            }
        })
    }, [rows])


    console.log(rows[0])

    // const _rows = rows.filter(e => e[query].toString().toLowerCase().includes(textQuery.toLowerCase()))
    

    const [sendId, setSentId] = useState('')
    const [sendRoom, setSentRoom] = useState('')

    const handleOpenkWorkersModal = (id, room) => {
        setVisibleWorkers(true)
        setSentId(id)
        setSentRoom(room)
    }

    const handleOpenEditRooms = (id) => {
        setVisibleEditRooms(true)
        setSentId(id)
    }


    const [roomType, setRoomType] = useState('')
    const [roomName, setRoomName] = useState('')
    const [roomDepartment, setRoomDepartment] = useState('')
    const [roomBuilding, setRoomBuilding] = useState('')
    const [roomSignaling, setRoomSignaling] = useState(false)

    const henaleAddRooms = (type, name, building, department, signaling) => {
        addRoom(type, name, building, department, signaling)
        setRows([])
        document.getElementById('accordion').click()
        alert(`Аудитория ${building}-${name} добавлена! (⊙ ˍ ⊙)`)
    }



    return (
        <section className={classes.RoomsList}>
            <div className='container'>
                <div className={classes.col}>
                    <div className={classes.breadcrumb} onClick={() => setWay(true)}><ChevronLeft/>Назад</div>
                    <h2 className={classes.title}>Список комнат</h2>

                    <div className={classes.UpdateBtn_wrapper} onClick={() => setRows([])}>
                        <UpdateBtn />
                    </div>

                    {
                        [0, 2].includes(lvl) ? (
                            <Accordion>
                                <AccordionSummary id='accordion' expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.subtitle}>Добавление аудитории</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className={classes.search_panel}>
                                        <Input placeholder='Корпус...' required onChange={e => setRoomBuilding(ee => e.target.value)}/>
                                        <Input placeholder='Комната...' required onChange={e => setRoomName(ee => e.target.value)}/>
                                        <Select defultValue={'Сигнализация...'}
                                            options={[
                                                {value:'yes', name:'есть'},
                                                {value:'no', name:'нет'}
                                            ]}
                                            onChange={e => setRoomSignaling(e)}
                                        />
                                        <Input placeholder='Подразделение...' required onChange={e => setRoomDepartment(ee => e.target.value)} />
                                        <Select defultValue='Тип аудитории...'
                                            options={[
                                                {value:'Кабинет', name:'Кабинет'},
                                                {value:'Учебная аудитория', name:'Учебная аудитория'},
                                                {value:'Техническое помещение', name:'Техническое помещение'},
                                                {value:'Служебное помещение', name:'Служебное помещение'},
                                            ]}
                                            onChange={e => {setRoomType(e)}}
                                        />
                                        <Btn onClick={() => henaleAddRooms(roomType, roomName, roomBuilding, roomDepartment, roomSignaling)}>Добавить</Btn>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        ) : null
                    }

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Search/>
                            <Typography className={classes.subtitle}>Поиск</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.search_panel}>
                                <Select defultValue={'Искать по...'}
                                    options={[
                                        {value:'room', name:'Комната'},
                                        {value:'department', name:'Подразделение'},
                                        {value:'type', name:'Тип'}
                                    ]}
                                    onChange={e => setQuery(e)}
                                />
                                <Input placeholder='Что искать...' onChange={e => setTextQuery(e.target.value)} />
                            </div>
                        </AccordionDetails>
                    </Accordion>

                    {
                        rows.length ? (
                            <div className={classes.table_wrapp}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650, height:'100%'}} aria-label='caption table'>
                                        <caption>Всего <b>{rows.length}</b> комнат.</caption>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>№</TableCell>
                                                <TableCell>Корпус и комната</TableCell>
                                                <TableCell>Подразделение</TableCell>
                                                <TableCell>Тип</TableCell>
                                                <TableCell>Руководитель</TableCell>
                                                <TableCell>Телефон</TableCell>
                                                <TableCell>Кол-во</TableCell>
                                                {[0, 2, 3].includes(lvl) ? <TableCell>Сотрудники</TableCell> : null}
                                                {[0, 2, 3].includes(lvl) ? <TableCell>Править</TableCell> : null}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                rows.map((row, indexRow) => (
                                                    <TableRow key={indexRow}>
                                                        <TableCell scope='row'>{ indexRow+1 }</TableCell>
                                                        <TableCell>{ row.building }-{ row.room }</TableCell>
                                                        <TableCell>{ row.subunit }</TableCell>
                                                        <TableCell>{ row.type }</TableCell>
                                                        <TableCell>{ row.head }</TableCell>
                                                        <TableCell>{ row.phone }</TableCell>
                                                        <TableCell>{  }</TableCell>
                                                        {[0, 2, 3].includes(lvl) ? <TableCell onClick={() => handleOpenkWorkersModal(row.id, row.room)}><div className='svg-wrapp'><UserCircle/></div></TableCell> : null}
                                                        {[0, 2, 3].includes(lvl) ? <TableCell onClick={() => handleOpenEditRooms(row.id)}><div className='svg-wrapp'><Pencil/></div></TableCell> : null}
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        ) : (
                            <Loading/>
                        )
                    }
                </div>
            </div>

            {visibleWorkers && (
                <WorkersModal 
                    setVisibleWorkers={setVisibleWorkers} 
                    room={sendRoom}
                    id={sendId}
                />
            )}
            {visibleEditRooms && (
                <EditRoomsModal 
                    setVisibleEditRooms={setVisibleEditRooms}
                    id={sendId}
                    setRows={setRows}
                />
            )}
        
        </section>
    )
}

export default RoomsList