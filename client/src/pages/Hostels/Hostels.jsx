import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

import ExtraBtn from '../../components/UI/buttons/ExtraBtn'
import Btn from '../../components/UI/buttons/Btn'
import Select from '../../components/UI/selects/Select'
import { Search } from '../../svg.module'
import classes from './hostels.module.scss'


function createData(num, name, tab_num, statys, room, state, state_date, action) {
    return { num, name, tab_num, statys, room, state, state_date, action };
}
const rows = [
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
    createData('1', 'Потапова Валерия Витальевна', '42413231832', 'Активен', '10-1112', 'Внутри', '10.11.2021', <ExtraBtn style={{background: 'red', justifyContent: 'center'}} onClick={() => {}}>Блокировать</ExtraBtn>),
   
];

const Hostels = ({success, isAuth}) => {




    
    

    return (
        <section className={classes.hostels}>
            <div className='container'>
                <div className={classes.row}>
                    <h2 className={classes.title}>Проживающие</h2>
                    <ExtraBtn onClick={() => {alert('TODO: Выводить активность')}}>
                        <span><box-icon name='run' color='#fff'></box-icon></span>
                        Активность
                    </ExtraBtn>
                </div>

                <div className={classes.row} style={{flexWrap:'wrap-reverse'}} >
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Search/>
                            <Typography className={classes.subtitle} style={{marginLeft:20}}>Поиск по таблице</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.panel_search}>
                                <Select defultValue={'Поиск по...'}
                                    options={[
                                        {value:'hostel1', name:'Общежитие 1'},
                                        {value:'hostel2', name:'Общежитие 2'},
                                        {value:'hostel4', name:'Общежитие 4'},
                                        {value:'hostel5', name:'Общежитие 5'},
                                        {value:'hostel6', name:'Общежитие 6'},
                                        {value:'hostel7', name:'Общежитие 7'},
                                        {value:'hostel8', name:'Общежитие 8'},
                                        {value:'hostel9', name:'Общежитие 9'},
                                        {value:'hostel10', name:'Общежитие 10'},
                                        {value:'hostel11', name:'Общежитие 11'}
                                    ]}
                                />
                                <Btn onClick={() => {alert('TODO: Отобразить выбранную категорию в таблице')}}>
                                    Показать
                                </Btn>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.subtitle}>Работа с базой проживающих</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.panel}>
                                <div>
                                    <ExtraBtn onClick={() => {alert('TODO: Открыть страницу активных')}}>
                                        Активные
                                    </ExtraBtn>
                                    <ExtraBtn onClick={() => {alert('TODO: Открыть страницу заблокированных')}}>
                                        Заблокированные
                                    </ExtraBtn>
                                </div>
                                <div>
                                    <ExtraBtn onClick={() => {alert('TODO: Открыть страницу вне общежития')}}>
                                        Вне общежития
                                    </ExtraBtn>
                                    <ExtraBtn onClick={() => {alert('TODO: Открыть страницу сформированной выгрузки')}}>
                                        Сформировать выгрузку
                                    </ExtraBtn>
                                </div>
                                <ExtraBtn style={{background: 'red'}} onClick={() => {alert('TODO: Запрашивать разрешение на подтверждение данных через prompt а затем отчиститть базу')}}>
                                    <span><box-icon name='x-circle' color='#fff' ></box-icon></span>
                                    Очистка базы
                                </ExtraBtn>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>

                <div className={classes.table_wrapp}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650, height: '100%' }} aria-label='caption table'>
                            <caption><p>Конец списка проживающих. В общежитии <b>{rows.length}</b> человек(а)</p></caption>
                            <TableHead>
                                <TableRow>
                                    <TableCell>№</TableCell>
                                    <TableCell>Ф.И.О.</TableCell>
                                    <TableCell align='right'>Табельный номер</TableCell>
                                    <TableCell align='right'>Статус</TableCell>
                                    <TableCell align='right'>Комната</TableCell>
                                    <TableCell align='right'>Состояние</TableCell>
                                    <TableCell align='right'>Последняя активность</TableCell>
                                    <TableCell align='right'>Действие</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row, indexRow) => (
                                <TableRow key={indexRow}>
                                    <TableCell align='right'>{indexRow+1}</TableCell>
                                    <TableCell component='th' scope='row'>{row.name}</TableCell>
                                    <TableCell align='right'>{row.tab_num}</TableCell>
                                    <TableCell align='right'>{row.statys}</TableCell>
                                    <TableCell align='right'>{row.room}</TableCell>
                                    <TableCell align='right'>{row.state}</TableCell>
                                    <TableCell align='right'>{row.state_date}</TableCell>
                                    <TableCell align='right'>{row.action}</TableCell>
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
export default Hostels