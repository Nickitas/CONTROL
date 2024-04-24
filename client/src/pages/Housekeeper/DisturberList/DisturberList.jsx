import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { getDisturbers } from '../../../Fetch'
import { ChevronLeft } from '../../../svg.module'
import UpdateBtn from '../../../components/UI/elements/UpdateBtn/UpdateBtn'
import Loading from '../../../components/UI/Loading/Loading'
import classes from './DisturberList.module.scss'


const DisturberList = ({ setWay }) => {

    const [rows, setRows] = useState([])

    useEffect(() => {
        if(rows.length != 0) return 
        getDisturbers().then(e => {
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
    },[rows])

    return (
        <section className={classes.DisturberList}>
            <div className='container'>
                <div className={classes.col}>
                    <div className={classes.breadcrumb} onClick={() => setWay(true)}><ChevronLeft/>Назад</div>
                    <h2 className={classes.title}>Список нарущителей</h2>

                    <div className={classes.UpdateBtn_wrapper} onClick={ () => setRows([]) }>
                        <UpdateBtn />
                    </div>
                    {
                        rows.length ? (
                            <div className={classes.table_wrapp}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650, height:'100%'}} aria-label='caption table'>
                                        <caption>Всего <b>{rows.length}</b> нарушителей.</caption>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Кол-во нарушений</TableCell>
                                                <TableCell>Ф.И.О</TableCell>
                                                <TableCell>Должность</TableCell>
                                                <TableCell>Аудитория</TableCell>
                                                <TableCell>Дата</TableCell>
                                                <TableCell>Подразделение</TableCell>
                                                <TableCell>Тип</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                rows.map((row, indexRow) => (
                                                    <TableRow key={indexRow}>
                                                        <TableCell component='th' scope='row'><div className='countBall' id={row.count==0?'good':row.count<5?'light':row.count<15?'middle':'high'}>{row.count}</div></TableCell>
                                                        <TableCell>{ row.fio }</TableCell>
                                                        <TableCell>{ row.position }</TableCell>
                                                        <TableCell>{ row.room }</TableCell>
                                                        <TableCell>{ row.date }</TableCell>
                                                        <TableCell>{ row.subunit }</TableCell>
                                                        <TableCell>{ row.type }</TableCell>
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

export default DisturberList