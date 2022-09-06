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


import { Plus, ChevronLeft, Search } from '../../../svg.module'

import ExtraBtn from '../../UI/buttons/ExtraBtn'
import Input from '../../UI/inputs/Input'
import Select from '../../UI/selects/Select'

import classes from './Net.module.scss'


function createData(ip, plase, time, comment, edit) {
    return {ip, plase, time, comment, edit };
}
const rows = [
    createData('10.76.0.10', '1 корпус', `min = 2мс; max = 8мс; mean = ${'5мс'}`, '1 этаж west', <div className='svg-wrapp'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' style={{fill: '#676767'}}><path d='M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z'></path></svg></div>),
    createData('10.76.0.11', '1 корпус', `min = 2мс; max = 8мс; mean = ${'5мс'}`, '1 этаж midle', <div className='svg-wrapp'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' style={{fill: '#676767'}}><path d='M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z'></path></svg></div>),
    createData('10.204.0.15', '1 корпус', `min = 2мс; max = 8мс; mean = ${'5мс'}`, '1 этаж west', <div className='svg-wrapp'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' style={{fill: '#676767'}}><path d='M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z'></path></svg></div>),
    createData('10.204.0.103', '1 корпус', `min = 2мс; max = 8мс; mean = ${'5мс'}`, '1 этаж east', <div className='svg-wrapp'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' style={{fill: '#676767'}}><path d='M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z'></path></svg></div>),
];

const Net = ({setWay}) => {
    return (
        <section className={classes.Net}>
            <div className='container'>
            <div className={classes.breadcrumb} onClick={() => setWay(true)}><ChevronLeft/>Назад</div>
                <div className={classes.row}>
                    <h2 className={classes.title}>Сеть</h2>
                    <ExtraBtn onClick={() => {alert('TODO: Открвть модальное окно добавления регистратора')}}>
                        <span><box-icon name='video-recording' type='solid' color='#fff'></box-icon></span>
                            <Plus/>
                            <span>Добавить регистратор</span>
                    </ExtraBtn>
                </div>
                <div className={classes.col}>   
                    <div className={classes.row} style={{flexWrap:'wrap-reverse'}}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Search/>
                                <Typography className={classes.subtitle} style={{marginLeft:20}}>Поиск по таблице</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className={classes.search_panel}> 
                                    <Select defultValue={'Искать по...'} onChange={(e) => setType(e)}
                                        options={[
                                            {value:'1', name:'1 корпус'},
                                            {value:'2', name:'2 корпус'},
                                            {value:'3', name:'3-5 корпуса'},
                                            {value:'6', name:'6 корпус'},
                                            {value:'7', name:'7 корпус'},
                                            {value:'9', name:'9 корпус'},
                                            {value:'10', name:'10 корпус'},
                                            {value:'14', name:'14 корпус'},
                                            {value:'15', name:'15 корпус'},
                                            {value:'asa', name:'АСА'},
                                            {value:'kpp', name:'КПП'},
                                            {value:'shap', name:'Шаповалова'},
                                            {value:'building', name:'Стройка'},
                                            {value:'hostels', name:'Общежития'},
                                        ]}
                                    />
                                    <Input placeholder='Что искать...'  />
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
                                        <TableCell>IP-адресс</TableCell>
                                        <TableCell align='right'>Местоположение</TableCell>
                                        <TableCell align='right'>Время отклика</TableCell>
                                        <TableCell align='right'>Коментарий</TableCell>
                                        <TableCell align='right'>Править</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.map((row, indexRow) => (
                                    <TableRow key={row.name}>
                                        <TableCell align='right'>{indexRow+1}</TableCell>
                                        <TableCell component='th' scope='row'>{row.ip}</TableCell>
                                        <TableCell align='right'>{row.plase}</TableCell>
                                        <TableCell align='right'>{row.time}</TableCell>
                                        <TableCell align='right'>{row.comment}</TableCell>
                                        <TableCell align='right'>{row.edit}</TableCell>
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
export default Net