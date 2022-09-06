import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'

import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Btn from '../UI/buttons/Btn'
import ExtraBtn from '../UI/buttons/ExtraBtn'
import Input from '../UI/inputs/Input'
import Select from '../UI/selects/Select'
import classes from './Operator.module.scss'


function createData(name, tub_nam, group, subunit, photo, status, activity, date_end, route, edit) {
    return { name, tub_nam, group, subunit, photo, status, activity, date_end, route, edit };
}
const rows = [
    createData('Кодацкий Никита Максимович', '1243424', 'ВИБ-41', 'ИиВТ', '-', 'Учится', '16.10.2010', '01.01.2025', '1, 2, 5', <div className='svg-wrapp'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' style={{fill: '#676767'}}><path d='M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z'></path></svg></div>),
    createData('Кодацкий Никита Максимович', '1243424', 'ВИБ-41', 'ИиВТ', '-', 'Учится', '16.10.2010', '01.01.2025', '1, 2, 5', <div className='svg-wrapp'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' style={{fill: '#676767'}}><path d='M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z'></path></svg></div>),
    createData('Кодацкий Никита Максимович', '1243424', 'ВИБ-41', 'ИиВТ', '-', 'Учится', '16.10.2010', '01.01.2025', '1, 2, 5', <div className='svg-wrapp'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' style={{fill: '#676767'}}><path d='M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z'></path></svg></div>),
    createData('Кодацкий Никита Максимович', '1243424', 'ВИБ-41', 'ИиВТ', '-', 'Учится', '16.10.2010', '01.01.2025', '1, 2, 5', <div className='svg-wrapp'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' style={{fill: '#676767'}}><path d='M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z'></path></svg></div>),
    createData('Кодацкий Никита Максимович', '1243424', 'ВИБ-41', 'ИиВТ', '-', 'Учится', '16.10.2010', '01.01.2025', '1, 2, 5', <div className='svg-wrapp'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' style={{fill: '#676767'}}><path d='M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z'></path></svg></div>),
    createData('Кодацкий Никита Максимович', '1243424', 'ВИБ-41', 'ИиВТ', '-', 'Учится', '16.10.2010', '01.01.2025', '1, 2, 5', <div className='svg-wrapp'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' style={{fill: '#676767'}}><path d='M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z'></path></svg></div>),
    createData('Кодацкий Никита Максимович', '1243424', 'ВИБ-41', 'ИиВТ', '-', 'Учится', '16.10.2010', '01.01.2025', '1, 2, 5', <div className='svg-wrapp'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' style={{fill: '#676767'}}><path d='M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z'></path></svg></div>),
    createData('Кодацкий Никита Максимович', '1243424', 'ВИБ-41', 'ИиВТ', '-', 'Учится', '16.10.2010', '01.01.2025', '1, 2, 5', <div className='svg-wrapp'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' style={{fill: '#676767'}}><path d='M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z'></path></svg></div>),
    createData('Кодацкий Никита Максимович', '1243424', 'ВИБ-41', 'ИиВТ', '-', 'Учится', '16.10.2010', '01.01.2025', '1, 2, 5', <div className='svg-wrapp'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' style={{fill: '#676767'}}><path d='M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z'></path></svg></div>),
    createData('Кодацкий Никита Максимович', '1243424', 'ВИБ-41', 'ИиВТ', '-', 'Учится', '16.10.2010', '01.01.2025', '1, 2, 5', <div className='svg-wrapp'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' style={{fill: '#676767'}}><path d='M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z'></path></svg></div>),
    createData('Кодацкий Никита Максимович', '1243424', 'ВИБ-41', 'ИиВТ', '-', 'Учится', '16.10.2010', '01.01.2025', '1, 2, 5', <div className='svg-wrapp'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' style={{fill: '#676767'}}><path d='M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z'></path></svg></div>),
    createData('Кодацкий Никита Максимович', '1243424', 'ВИБ-41', 'ИиВТ', '-', 'Учится', '16.10.2010', '01.01.2025', '1, 2, 5', <div className='svg-wrapp'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' style={{fill: '#676767'}}><path d='M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z'></path></svg></div>),
    createData('Кодацкий Никита Максимович', '1243424', 'ВИБ-41', 'ИиВТ', '-', 'Учится', '16.10.2010', '01.01.2025', '1, 2, 5', <div className='svg-wrapp'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' style={{fill: '#676767'}}><path d='M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z'></path></svg></div>),
    createData('Кодацкий Никита Максимович', '1243424', 'ВИБ-41', 'ИиВТ', '-', 'Учится', '16.10.2010', '01.01.2025', '1, 2, 5', <div className='svg-wrapp'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' style={{fill: '#676767'}}><path d='M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z'></path></svg></div>),
    createData('Кодацкий Никита Максимович', '1243424', 'ВИБ-41', 'ИиВТ', '-', 'Учится', '16.10.2010', '01.01.2025', '1, 2, 5', <div className='svg-wrapp'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' style={{fill: '#676767'}}><path d='M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z'></path></svg></div>),
    createData('Кодацкий Никита Максимович', '1243424', 'ВИБ-41', 'ИиВТ', '-', 'Учится', '16.10.2010', '01.01.2025', '1, 2, 5', <div className='svg-wrapp'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' style={{fill: '#676767'}}><path d='M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z'></path></svg></div>),
    createData('Кодацкий Никита Максимович', '1243424', 'ВИБ-41', 'ИиВТ', '-', 'Учится', '16.10.2010', '01.01.2025', '1, 2, 5', <div className='svg-wrapp'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' style={{fill: '#676767'}}><path d='M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z'></path></svg></div>),
];


const Operator = ({success, isAuth}) => {




    

    

    return (
        <section className={classes.Operator}>
            <div className='container'>
                <div className={classes.row}>
                    <h2 className={classes.title}>Оператор отдела</h2>
                    <ExtraBtn onClick={() => {alert('TODO: Открыть модальное окно создания пропуска')}}>
                        <span><box-icon name='list-plus' color='#fff' ></box-icon></span>
                        Создать
                    </ExtraBtn>    
                </div>

                <div className={classes.row} style={{flexWrap:'wrap-reverse'}}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Поиск по таблице</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.search_panel}>
                                <div className={classes.search_input}>
                                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#848484' className='bi bi-search' viewBox='0 0 16 16'>
                                        <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'/>
                                    </svg>
                                    <Input placeholder='Поле поиска...'/>
                                </div>
                                <Select defultValue={'Сортировка по...'}
                                        options={[
                                        {value:'fio', name:'По Ф.И.О.'},
                                        {value:'key', name:'По ключу'}
                                    ]}
                                />    
                                <FormControl component='fieldset'>
                                    <FormGroup aria-label='position' row>
                                        <FormControlLabel control={<Checkbox />}
                                            label='Точный поиск'
                                            labelPlacement='top'
                                        />        
                                    </FormGroup>
                                </FormControl>
                                <Btn onClick={() => {alert('TODO: Отобразить данные по запросу в таблице')}}>
                                    Показать
                                </Btn>  
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Работа с базой пропусков</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.panel}>
                                <div>
                                    <ExtraBtn onClick={() => {alert('TODO: Открыть добавление студента')}}>
                                        <span><box-icon name='user-plus' color='#fff'></box-icon></span>
                                        Добавление студента
                                    </ExtraBtn>
                                    <ExtraBtn onClick={() => {alert('TODO: Открыть учет карт')}}>
                                        <span><box-icon name='task' color='#fff'></box-icon></span>
                                        Учет карт
                                    </ExtraBtn>
                                </div>
                                <div>
                                    <ExtraBtn onClick={() => {alert('TODO: Открыть обходной лист')}}>
                                        <span><box-icon name='book-content' color='#fff'></box-icon></span>
                                        Обходной лист
                                    </ExtraBtn>
                                    <ExtraBtn style={{background: 'red'}} onClick={() => {alert('TODO: Открыть запрос окно запроса данных prompt для ввода ключа или фамилии для удаления')}}>
                                        <span><box-icon name='x-circle' color='#fff'></box-icon></span>
                                        Удалить пропуск
                                    </ExtraBtn> 
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>

                <div className={classes.table_wrapp}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650, height: '100%' }} aria-label='caption table'>
                            <caption><p>Конец списка по данному запросу. Всего найдено: <b>{rows.length}</b></p></caption>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ф.И.О.</TableCell>
                                    <TableCell align='right'>Табельный номер</TableCell>
                                    <TableCell align='right'>Группа</TableCell>
                                    <TableCell align='right'>Подразделение</TableCell>
                                    <TableCell align='right'>Фото</TableCell>
                                    <TableCell align='right'>Статус</TableCell>
                                    <TableCell align='right'>Активност</TableCell>
                                    <TableCell align='right'>Дата конца</TableCell>
                                    <TableCell align='right'>Маршрут</TableCell>
                                    <TableCell align='right'>Править</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component='th' scope='row'>{row.name}</TableCell>
                                    <TableCell align='right'>{row.tub_nam}</TableCell>
                                    <TableCell align='right'>{row.group}</TableCell>
                                    <TableCell align='right'>{row.subunit}</TableCell>
                                    <TableCell align='right'>{row.photo}</TableCell>
                                    <TableCell align='right'>{row.status}</TableCell>
                                    <TableCell align='right'>{row.activity}</TableCell>
                                    <TableCell align='right'>{row.date_end}</TableCell>
                                    <TableCell align='right'>{row.route}</TableCell>
                                    <TableCell align='right'>{row.edit}</TableCell>
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
export default Operator