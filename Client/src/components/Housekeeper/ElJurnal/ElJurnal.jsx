import React, { useEffect, useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
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
import { CSVLink } from 'react-csv'

import { getElJournal } from '../../../Fetch'
import { ChevronLeft, Search } from '../../../svg.module'
import UpdateBtn from '../../UI/elements/UpdateBtn/UpdateBtn'
import Select  from '../../UI/selects/Select'
import Input  from '../../UI/inputs/Input'
import Btn from '../../UI/buttons/Btn'
import classes from './ElJurnal.module.scss'


const ElJurnal = ({setWay}) => {
    
    const [rows, setRows] = useState([])
    const [type, setType] = useState('room')
    const [text, setText] = useState('')

    useEffect(() => {
        if(rows.length!=0)return
        getElJournal().then(e => {
            if(e.state) {
                setRows(e.body.map(ee => {
                    return {
                        room: ee.room,
                        date: ee.date,
                        time: ee.time,
                        fio: ee.fio,
                        position: ee.position,
                        subunit: ee.department,
                        responsible_fio: ee.responsible_fio, 
                        responsible_phone: ee.responsible_phone, 
                        type: ee.type, 
                        action: ee.status
                    }
                }))
            }
        })
    },[rows])

    const data = rows
    const _rows = rows.filter(e=>e[type].toString().toLowerCase().includes(text.toLowerCase()))

    const headers = [
        { label:'Комната', key:'room' },
        { label:'Дата', key:'date' },
        { label:'Время', key:'time' },
        { label:'Ф.И.О', key:'fio' },
        { label:'Должность', key:'position' },
        { label:'Подразделение', key:'department' },
        { label:'Ответственный', key:'responsible_fio' },
        { label:'Тип', key:'type' },
        { label:'Статус', key:'status' }
    ]
    const csvReport = {
        filename: `Электронный журнал. Ключница_${new Date().getDate()}.csv`,
        headers: headers,
        data:  data,
    } 

    return (
        <section className={classes.ElJurnal}>
            <div className='container'>
                <div className={classes.col}>
                    <div className={classes.breadcrumb} onClick={() => {setWay('')}}><ChevronLeft/>Назад</div>
                    <h2 className={classes.title}>Электронный журнал</h2>

                    <div className={classes.UpdateBtn_wrapper} onClick={ () => setRows([]) }>
                        <Tooltip title='Обновить таблицу' placement='right-end'>
                            <UpdateBtn />
                        </Tooltip>
                    </div>

                    <Accordion style={{minWidth:200, overflowX:'auto'}}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Search/>
                            <Typography className={classes.subtitle} style={{marginLeft:20}}>Поиск и выгрузка</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.search_panel}>
                                <Select defultValue={'Искать по...'} onChange={(e) => setType(e)}
                                    options={[
                                        {value:'room', name:'Комната'},
                                        {value:'fio', name:'Ф.И.О'},
                                        {value:'date', name:'Дата'}
                                    ]}
                                />
                                <Input placeholder='Что искать...' onChange={(e) => setText(e.target.value)} />
                                <CSVLink {...csvReport} data={data} headers={headers} separator={";"}><Btn>Выгрузить Excel</Btn></CSVLink>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <div className={classes.table_wrapp}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650, height:'100%' }} aria-label='caption table'>
                                <caption>Сегодня суммарно брали ключи <b>{rows.length}</b> раз(а).</caption>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>№</TableCell>
                                        <TableCell align='right'>Аудитория</TableCell>
                                        <TableCell align='right'>Дата</TableCell>
                                        <TableCell align='right'>Время</TableCell>
                                        <TableCell align='right'>Ф.И.О</TableCell>
                                        <TableCell align='right'>Должность</TableCell>
                                        <TableCell align='left'>Подразделение</TableCell>
                                        <TableCell align='right'>Ответственный</TableCell>
                                        <TableCell align='right'>Телефон</TableCell>
                                        <TableCell align='right'>Тип</TableCell>
                                        <TableCell align='right'>Статус</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {_rows.map((row, indexRow) => (
                                    <TableRow key={indexRow}>
                                        <TableCell align='right'>{indexRow+1}</TableCell>
                                        <TableCell align='right'>{row.room}</TableCell>
                                        <TableCell align='right'>{row.date}</TableCell>
                                        <TableCell align='right'>{row.time}</TableCell>
                                        <TableCell align='right'>{row.fio}</TableCell>
                                        <TableCell align='right'>{row.position}</TableCell>
                                        <TableCell align='left'>{row.subunit}</TableCell>
                                        <TableCell align='right'>{row.responsible_fio}</TableCell>
                                        <TableCell align='right'>{row.responsible_phone}</TableCell>
                                        <TableCell align='right'>{row.type}</TableCell>
                                        <TableCell align='right'>{row.action}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ElJurnal