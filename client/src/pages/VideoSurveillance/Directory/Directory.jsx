import React from 'react'
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
import { ChevronLeft, Search } from '../../../svg.module'


import Input from '../../../components/UI/inputs/Input'

import classes from './directory.module.scss'


function createData(department, nick, room, phone, lastEnter) {
    return { department, nick, room, phone, lastEnter }
}
const rows = [
    createData('11 общежитие', '11 общежитие', `102`, '2738419', '13.12.2021'),
];

const Directory = ({setWay}) => {
    
    return (
        <section className={classes.directory}>
            <div className='container'>
            <div className={classes.breadcrumb} onClick={() => setWay(true)}><ChevronLeft/>Назад</div>
                <div className={classes.row}>
                    <h2 className={classes.title}>Справочник</h2>
                </div>

                <div className={classes.row} style={{flexWrap:'wrap-reverse'}}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Search/>
                            <Typography className={classes.subtitle} style={{marginLeft:20}}>Поиск по таблице</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.search_panel}> 
                                <Input placeholder='Искать по кафедре...'/>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>

                <div className={classes.table_wrapp}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650, height:'100%'}} aria-label='caption table'>
                            <caption valign='top'>Конец списка. Всего : <b>{rows.length}</b> шт.</caption>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='right'>№</TableCell>
                                    <TableCell>Кафедра</TableCell>
                                    <TableCell align='right'>Сокращённое название</TableCell>
                                    <TableCell align='right'>Номер комнаты</TableCell>
                                    <TableCell align='right'>Номер телефона</TableCell>
                                    <TableCell align='right'>Последний вход</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row, indexRow) => (
                                <TableRow key={row.name}>
                                    <TableCell align='right'>{indexRow+1}</TableCell>
                                    <TableCell component='th' scope='row'>{row.department}</TableCell>
                                    <TableCell align='right'>{row.nick}</TableCell>
                                    <TableCell align='right'>{row.room}</TableCell>
                                    <TableCell align='right'>{row.phone}</TableCell>
                                    <TableCell align='right'>{row.lastEnter}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>


            </div>
        </section>
    )
}
export default Directory