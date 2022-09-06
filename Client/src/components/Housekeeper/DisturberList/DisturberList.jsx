import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'


import UpdateBtn from '../../UI/elements/UpdateBtn/UpdateBtn'
import { GetDisturbers } from '../../../Fetch'
import { ChevronLeft } from '../../../svg.module'
import classes from './DisturberList.module.scss'


const DisturberList = ({setWay}) => {

    const [rows, setRows] = useState([])

    useEffect(() => {
        GetDisturbers().then(e => {
            if(e.state) {
                setRows(e.body.map(ee => {
                    return {
                        count: ee.dist_count,
                        fio: ee.fio,
                        position: ee.position,
                        room: ee.room,
                        date: ee.date,
                        subunit: ee.department,
                        type: ee.type
                    }
                }))
            }
        })
    },[])

    return (
        <section className={classes.DisturberList}>
            <div className='container'>
                <div className={classes.col}>
                    <div className={classes.breadcrumb} onClick={() => setWay(true)}><ChevronLeft/>Назад</div>
                    <h2 className={classes.title}>Список нарущителей</h2>


                    <div className={classes.UpdateBtn_wrapper} onClick={ () => setRows([]) }>
                        <Tooltip title='Обновить таблицу' placement='right-end'>
                            <UpdateBtn />
                        </Tooltip>
                    </div>


                    <div className={classes.table_wrapp}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650, height:'100%'}} aria-label='caption table'>
                                <caption>Всего <b>{rows.length}</b> нарушителей.</caption>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Кол-во нарушений</TableCell>
                                        <TableCell align='left'>Ф.И.О</TableCell>
                                        <TableCell align='right'>Должность</TableCell>
                                        <TableCell align='right'>Аудитория</TableCell>
                                        <TableCell align='right'>Дата</TableCell>
                                        <TableCell align='right'>Подразделение</TableCell>
                                        <TableCell align='right'>Тип</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.map((row, indexRow) => (
                                    <TableRow key={indexRow}>
                                        <TableCell component='th' scope='row'><div className='countBall' id={row.count==0?'good':row.count<5?'light':row.count<15?'middle':'high'}>{row.count}</div></TableCell>
                                        <TableCell align='left'>{row.fio}</TableCell>
                                        <TableCell align='right'>{row.position}</TableCell>
                                        <TableCell align='right'>{row.room}</TableCell>
                                        <TableCell align='right'>{row.date}</TableCell>
                                        <TableCell align='right'>{row.subunit}</TableCell>
                                        <TableCell align='right'>{row.type}</TableCell>
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
export default DisturberList