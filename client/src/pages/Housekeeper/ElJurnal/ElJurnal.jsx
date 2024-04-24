import React, { useEffect, useState } from 'react'
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
import UpdateBtn from '../../../components/UI/elements/UpdateBtn/UpdateBtn'
import Select  from '../../../components/UI/selects/Select'
import Input  from '../../../components/UI/inputs/Input'
import Btn from '../../../components/UI/buttons/Btn'
import Loading from '../../../components/UI/Loading/Loading'
import classes from './ElJurnal.module.scss'


const ElJurnal = ({ setWay }) => {
    
    const [rows, setRows] = useState([])
    const [query, setQuery] = useState('room')
    const [textQuery, setTextQuery] = useState('')

    useEffect(() => {
        if(rows.length != 0) return
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
    }, [rows])


    const _rows = rows.filter(e => e[query].toString().toLowerCase().includes(textQuery.toLowerCase()))
    const data = _rows

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
        filename: `Ключница. Электронный журнал_${new Date().getDate()}.csv`,
        headers: headers,
        data:  data,
    }

    return (
        <section className={classes.ElJurnal}>
            <div className='container'>
                <div className={classes.col}>
                    <div className={classes.breadcrumb} onClick={() => {setWay('')}}><ChevronLeft/>Назад</div>
                    <h2 className={classes.title}>Электронный журнал</h2>

                    <div className={classes.UpdateBtn_wrapper} onClick={() => setRows([])}>
                        <UpdateBtn />
                    </div>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Search/>
                            <Typography className={classes.subtitle}>Поиск и выгрузка</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.search_panel}>
                                <Select defultValue={'Искать по...'}
                                    options={[
                                        {value:'room', name:'Комната'},
                                        {value:'fio', name:'Ф.И.О'},
                                        {value:'date', name:'Дата'}
                                    ]}
                                    onChange={e => setQuery(e)}
                                />
                                <Input placeholder='Что искать...' onChange={e => setTextQuery(e.target.value)} />
                                <CSVLink {...csvReport} data={data} headers={headers} separator={";"}><Btn>Выгрузить Excel</Btn></CSVLink>
                            </div>
                        </AccordionDetails>
                    </Accordion>

                    {
                        rows.length ? (
                            <div className={classes.table_wrapp}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650, height:'100%' }} aria-label='caption table'>
                                        <caption>Сегодня суммарно брали ключи <b>{rows.length}</b> раз(а).</caption>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>№</TableCell>
                                                <TableCell>Аудитория</TableCell>
                                                <TableCell>Дата</TableCell>
                                                <TableCell>Время</TableCell>
                                                <TableCell>Ф.И.О</TableCell>
                                                <TableCell>Должность</TableCell>
                                                <TableCell>Подразделение</TableCell>
                                                <TableCell>Ответственный</TableCell>
                                                <TableCell>Телефон</TableCell>
                                                <TableCell>Тип</TableCell>
                                                <TableCell>Статус</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                _rows.map((row, indexRow) => (
                                                    <TableRow key={indexRow}>
                                                        <TableCell>{ indexRow+1 }</TableCell>
                                                        <TableCell>{ row.room }</TableCell>
                                                        <TableCell>{ row.date }</TableCell>
                                                        <TableCell>{ row.time }</TableCell>
                                                        <TableCell>{ row.fio }</TableCell>
                                                        <TableCell>{ row.position }</TableCell>
                                                        <TableCell>{ row.subunit }</TableCell>
                                                        <TableCell>{ row.responsible_fio }</TableCell>
                                                        <TableCell>{ row.responsible_phone }</TableCell>
                                                        <TableCell>{ row.type }</TableCell>
                                                        <TableCell>{ row.action }</TableCell>
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
        </section>
    )
}

export default ElJurnal