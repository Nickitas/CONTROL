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

import ExtraBtn from '../UI/buttons/ExtraBtn'
import Btn from '../UI/buttons/Btn'
import Select from '../UI/selects/Select'
import classes from './reports.module.scss'


function createData(num, name, subunit, post, entry, output, plase, date, time) {
    return { num, name, subunit, post, entry, output, plase, date, time };
}
const rows = [
    createData('Быкадарова Наталья Викторовна', 'Отдел главного энергетика', 'лифтер', '+', ' ', 'КПП Выход', '13.11.2021', '08:59:18'),
    createData('Быкадарова Наталья Викторовна', 'Отдел главного энергетика', 'лифтер', '+', ' ', 'КПП Выход', '13.11.2021', '08:59:18'),
    createData('Быкадарова Наталья Викторовна', 'Отдел главного энергетика', 'лифтер', '+', ' ', 'КПП Выход', '13.11.2021', '08:59:18'),
    createData('Быкадарова Наталья Викторовна', 'Отдел главного энергетика', 'лифтер', '+', ' ', 'КПП Выход', '13.11.2021', '08:59:18'),
    createData('Быкадарова Наталья Викторовна', 'Отдел главного энергетика', 'лифтер', '+', ' ', 'КПП Выход', '13.11.2021', '08:59:18'),
    createData('Быкадарова Наталья Викторовна', 'Отдел главного энергетика', 'лифтер', '+', ' ', 'КПП Выход', '13.11.2021', '08:59:18'),
    createData('Быкадарова Наталья Викторовна', 'Отдел главного энергетика', 'лифтер', '+', ' ', 'КПП Выход', '13.11.2021', '08:59:18'),
    createData('Быкадарова Наталья Викторовна', 'Отдел главного энергетика', 'лифтер', '+', ' ', 'КПП Выход', '13.11.2021', '08:59:18'),
    createData('Быкадарова Наталья Викторовна', 'Отдел главного энергетика', 'лифтер', '+', ' ', 'КПП Выход', '13.11.2021', '08:59:18'),
    createData('Быкадарова Наталья Викторовна', 'Отдел главного энергетика', 'лифтер', '+', ' ', 'КПП Выход', '13.11.2021', '08:59:18'),
    createData('Быкадарова Наталья Викторовна', 'Отдел главного энергетика', 'лифтер', '+', ' ', 'КПП Выход', '13.11.2021', '08:59:18'),
    createData('Быкадарова Наталья Викторовна', 'Отдел главного энергетика', 'лифтер', '+', ' ', 'КПП Выход', '13.11.2021', '08:59:18'),
    createData('Быкадарова Наталья Викторовна', 'Отдел главного энергетика', 'лифтер', '+', ' ', 'КПП Выход', '13.11.2021', '08:59:18'),
];

const Reports = ({success, isAuth}) => {



    


    

    return (
        <section className={classes.Reports}>
            <div className='container'>
                <div className={classes.row}>
                    <h2 className={classes.title}>Отчет активности</h2>
                    <ExtraBtn onClick={() => {alert('TODO: Выыводить аналитику прохода')}}>
                        <span><box-icon name='bar-chart-square' color='#fff'></box-icon></span>
                        Анализ прохода
                    </ExtraBtn>
                </div>

                <div className={classes.row} style={{flexWrap:'wrap-reverse'}}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Поиск по таблице</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.search_panel}>
                                <Select defultValue={'Показать...'}
                                    options={[
                                        {value:'all', name:'Все корпуса'},
                                        {value:'corps1', name:'Главный корпус'},
                                        {value:'corps2', name:'Второй корпус'},
                                        {value:'corps7', name:'Седьмой корпус'},
                                        {value:'corps10', name:'Десятый корпус'}
                                    ]}
                                />
                                <Btn onClick={()=> {alert('TODO: Вывести по запросу данные в таблицу')}}>
                                    Показать
                                </Btn>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Работа с отчетами</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.panel}>
                                <ExtraBtn onClick={() => {alert('TODO: Вывести общий отчет')}}>
                                    <span><box-icon name='detail' color='#fff'></box-icon></span>
                                    Общий отчет
                                </ExtraBtn>
                                <ExtraBtn onClick={() => {alert('TODO: Вывести отчет по категории')}}>
                                    <span><box-icon name='spreadsheet' color='#fff' ></box-icon></span>
                                    Отчет по категориям
                                </ExtraBtn>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            
                <div className={classes.table_wrapp}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650, height: '100%' }} aria-label='caption table'>
                            <caption valign='top'>
                                <div style={{display:'flex', justifyContent:'space-between', alignContent:'center'}}>
                                    <p>На данный момент в ДГТУ <b>{rows.length / 3}</b> человека(а)<br/>В течениие дня было <b>{rows.length}</b> человека(а)</p>
                                    <Btn>Сформировать выгрузку</Btn>
                                </div>
                            </caption>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='right'>№</TableCell>
                                    <TableCell>Ф.И.О.</TableCell>
                                    <TableCell align='right'>Подразделение</TableCell>
                                    <TableCell align='right'>Должность</TableCell>
                                    <TableCell align='right'>Вход</TableCell>
                                    <TableCell align='right'>Выход</TableCell>
                                    <TableCell align='right'>Место</TableCell>
                                    <TableCell align='right'>Дата</TableCell>
                                    <TableCell align='right'>Время</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row, indexRow) => (
                                <TableRow key={row.name}>
                                    <TableCell align='right'>{indexRow+1}</TableCell>
                                    <TableCell component='th' scope='row'>{row.name}</TableCell>
                                    <TableCell align='right'>{row.subunit}</TableCell>
                                    <TableCell align='right'>{row.post}</TableCell>
                                    <TableCell align='right'>{row.entry}</TableCell>
                                    <TableCell align='right'>{row.output}</TableCell>
                                    <TableCell align='right'>{row.plase}</TableCell>
                                    <TableCell align='right'>{row.date}</TableCell>
                                    <TableCell align='right'>{row.time}</TableCell>
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
export default Reports