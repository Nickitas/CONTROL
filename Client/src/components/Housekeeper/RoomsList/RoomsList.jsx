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
import Tooltip from '@mui/material/Tooltip'

import { getRoomsList } from '../../../Fetch'
import EditRoomsModal from './EditRoomsModal'
import { ChevronLeft, Pencil } from '../../../svg.module'
import UpdateBtn from '../../UI/elements/UpdateBtn/UpdateBtn'
import Btn from '../../UI/buttons/Btn'
import Input from '../../UI/inputs/Input'
import Select from '../../UI/selects/Select'
import classes from './RoomsList.module.scss'


const RoomsList = ({setWay}) => {

    const [rows, setRows] = useState([])
    const [visibleEditRooms, setVisibleEditRooms] = useState(false)

    useEffect(() => {
        getRoomsList().then(e => {
            if(e.state){
                setRows(e.body.map(ee => {
                    return {
                        id: ee.id,
                        building: ee.building,
                        subunit: ee.department,
                        room: ee.room,
                        type: ee.type,
                        head: ee.head,
                        phone: ee.phone,
                        worker: ee.worker,
                        edit: <div className='svg-wrapp' onClick={()=>{setVisibleEditRooms(true)}}><Pencil/></div>
                    }
                }))
            }
        })
    },[])

    return (
        <section className={classes.RoomsList}>
            <div className='container'>
                <div className={classes.col}>
                    <div className={classes.breadcrumb} onClick={() => setWay(true)}><ChevronLeft/>Назад</div>
                    <h2 className={classes.title}>Список комнат</h2>

                    <div className={classes.UpdateBtn_wrapper} onClick={ () => setRows([]) }>
                        <Tooltip title='Обновить таблицу' placement='right-end'>
                            <UpdateBtn />
                        </Tooltip>
                    </div>

                    <Accordion style={{minWidth:200, overflowX:'auto'}}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.subtitle} style={{minWidth:'auto'}}>Добавление аудитории</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.search_panel}>
                                <Input placeholder='Корпус...' required/>
                                <Input placeholder='Комната...' required/>
                                <Select defultValue={'Сигнализация...'}
                                    options={[
                                        {value:'yes', name:'есть'},
                                        {value:'no', name:'нет'}
                                    ]}
                                />
                                <Input placeholder='Подразделение...' required/>
                                <Input placeholder='Тип аудитории...' required/>
                                <Btn onClick={() => {
                                    alert('TODO: Вызов функции добавления в БД')
                                }}>Добавить</Btn>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <div className={classes.table_wrapp}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650, height:'100%'}} aria-label='caption table'>
                                <caption>Всего <b>{rows.length}</b> комнат.</caption>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>№</TableCell>
                                        <TableCell align='left'>Корпус и комната</TableCell>
                                        <TableCell align='left'>Подразделение</TableCell>
                                        <TableCell align='left'>Тип</TableCell>
                                        <TableCell align='left'>Руководитель</TableCell>
                                        <TableCell align='left'>Телефон</TableCell>
                                        <TableCell align='left'>Сотрудники</TableCell>
                                        <TableCell align='left'>Кол-во</TableCell>
                                        <TableCell align='right'>Править</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.map((row, indexRow) => (
                                    <TableRow key={indexRow}>
                                        <TableCell component='th' scope='row'>{indexRow+1}</TableCell>
                                        <TableCell align='left'>{row.building}-{row.room}</TableCell>
                                        <TableCell align='left'>{row.subunit}</TableCell>
                                        <TableCell align='left'>{row.type}</TableCell>
                                        <TableCell align='left'>{row.head}</TableCell>
                                        <TableCell align='left'>{row.phone}</TableCell>
                                        <TableCell align='left'>{row.worker}</TableCell>
                                        <TableCell align='left'>121</TableCell>
                                        <TableCell align='right'>{row.edit}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
            {visibleEditRooms&&<EditRoomsModal setVisibleEditRooms={setVisibleEditRooms}/>}
        </section>
    )
}
export default RoomsList