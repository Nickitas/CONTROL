import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { url, getAllBobers, getBober } from '../../Fetch'
import ExtraBtn from '../../components/UI/buttons/ExtraBtn'
import { TableIcon, CalendarIcon } from '../../../src/svg.module'
import Calendar from './Calendar/Calendar'
import dateFormat from 'dateformat'
import classes from './operator.module.scss'



const Operator = ({ lvl }) => {

    const [bobers, setBobers] = useState([])
    const [group, setGroup] = useState('Все')
    const [openCalendar, setOpenCalendar] = useState(false)
    const [historyData, setHistoryData] = useState([])

    useEffect(() => {
        getAllBobers().then(e => {
            if(e.state) {
                setBobers(e.bobers.map(ee => {
                    return {
                        id: ee.id,
                        fio: ee.fio,
                        group: ee.group,
                        last_date: ee.last_date,
                        time_in: ee.time_in || ee.time_in === '' ? ee.time_in : 'нет',
                        time_out: ee.time_out || ee.time_out === '' ? ee.time_out : 'нет'
                    }
                }))
            }
        })
    }, [])

    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)

    const dd = String(yesterday.getDate()).padStart(2, '0')
    const mm = String(yesterday.getMonth() + 1).padStart(2, '0')

    const yesterdayFormatted = `${dd}.${mm}`

    const filteredBobers = bobers.filter(bober => bober.group == group)

    const getHistoryCalendar = (id) => {
        setOpenCalendar(true)
        getBober(id).then(e => {
            if(e.state) {
                setHistoryData(
                    {
                        id: e.body.id,
                        fio: e.body.fio,
                        event: e.body.dates.map(e => {
                            return {
                                title: `Факт прохода`,
                                date: e.calendar_date,
                                customText: `${e.time_in ? e.time_in : 'нет'} - ${e.time_out ? e.time_out : 'нет'}`
                            }
                        })
                    }
                )
            }
        })
    }

    return (
        <section className={classes.operator}>
            <div className='container dx-viewport'>
                <div className={classes.row}>
                    <h2 className={classes.title}>Оператор</h2>
                    <a href={`${url}/download_bobers`}>
                        <ExtraBtn>
                            <TableIcon />
                            Выгрузить таблицу
                        </ExtraBtn>
                    </a> 
                </div>

                <div className={classes.row}>
                    <h2 className={classes.subtitle}>Группа: { group }</h2>
                    <select
                        onChange={e => setGroup(e.target.value)}
                    >
                        <option>Все</option>
                        {
                            bobers.map((option, i) => 
                                <option key={i}>
                                    { option.group }
                                </option>
                        )
                        }
                    </select>
                </div>

                <div className={classes.table_wrapp}>
                    <h2 className={classes.subtitle}>Информация за {yesterdayFormatted}</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <caption><p>Всего найдено: <b>{  group == 'Все' ? bobers.length : filteredBobers.length }</b></p></caption>
                            <TableHead>
                                <TableRow>
                                    <TableCell>№</TableCell>
                                    <TableCell>Ф.И.О.</TableCell>
                                    <TableCell align='right'>Группа</TableCell>
                                    <TableCell align='right'>Последний факт прохода</TableCell>
                                    <TableCell align='right'>Откр. график</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { 
                                    group == 'Все'
                                        ? bobers.map((bober, index) => (
                                            <TableRow key={bober.id}>
                                                <TableCell>{ index + 1 }</TableCell>
                                                <TableCell component='th' scope='row'><b>{bober.fio}</b></TableCell>
                                                <TableCell align='right'>{bober.group}</TableCell>
                                                <TableCell align='left'>
                                                    <b>{bober.last_date}</b>
                                                    <div>ВХОД: {bober.time_in}</div>
                                                    <div>ВЫХОД: {bober.time_out}</div>
                                                </TableCell>
                                                <TableCell align='right'>
                                                    <div className='svg-wrapp' onClick={() => getHistoryCalendar(bober.id)}>
                                                        <CalendarIcon/>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                    ))
                                    : filteredBobers.map((bober, index) => (
                                        <TableRow key={bober.id}>
                                            <TableCell>{ index + 1 }</TableCell>
                                            <TableCell component='th' scope='row'><b>{bober.fio}</b></TableCell>
                                            <TableCell align='right'>{bober.group}</TableCell>
                                            <TableCell align='right'>{bober.last_date}</TableCell>
                                            <TableCell align='right'>
                                                <div className='svg-wrapp' onClick={() => getHistoryCalendar(bober.id)}>
                                                    <CalendarIcon/>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                
                <div className={classes.row}>
                    <h2 className={classes.title}>
                        График-календарь <br/> 
                        <span>{ openCalendar ? historyData.fio : 'Студент не выбран' }</span>
                    </h2>
  { openCalendar && <a href={`${url}/download_bober/${historyData.id}/2023.02.08/${dateFormat(new Date(), 'yyyy.mm.dd')}/archive`} >
                        <ExtraBtn >
                            <CalendarIcon />
                            Выгрузить календарь
                        </ExtraBtn> 
                    </a> }
                </div>
                {
                    openCalendar
                        ? <Calendar data={historyData.event} />
                        : <p> Ⓘ Для открытия календаря посящения, нажмите на иконку "календарь" в строке интересующего Вас студента</p>
                }

            </div>
        </section>
    )
}

export default Operator