import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'


import Cards from '../Cards'
import Input from '../../UI/inputs/Input'
import Select from '../../UI/selects/Select'
import Btn from '../../UI/buttons/Btn'
import classes from './CarsCards.module.scss'



const CarsCards = ({isAuth, success}) => {
    const [rows, setRows] = useState([])
    const [back, setBack] = useState(false)


    const history = useNavigate()
    useEffect(() => {
        if(success&&!isAuth){
            history('/auth')
        }   
    },[isAuth, success])
    if (!isAuth) return <div></div>


    if(back) {
        return <Cards/>
    }
    else {
        return (
            <section className={classes.CarsCards}>
                <div className='container'>
                    <div className={classes.breadcrumb} onClick={() => setBack(true)}><box-icon name='chevron-left' color='#8a8a8a'></box-icon>Назад</div>
                    <h2 className={classes.title}>Список заявок (Авто)</h2>

                    <Accordion style={{minWidth:200, overflowX:'auto'}}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.subtitle} style={{minWidth:'auto'}}>Поиск заявки</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className={classes.search_panel}>
                                    <Input placeholder='Искать...'/>
                                    <Select defultValue={'Сигнализация...'}
                                        options={[
                                            {value:'car', name:'Поиск по машине'},
                                            {value:'fio', name:'Поис по ФИО'}
                                        ]}
                                    />
                                    <Btn onClick={() => {alert('TODO: Отправить запрос куда-то')}}>
                                       Найти
                                    </Btn>
                                </div>
                            </AccordionDetails>
                        </Accordion>

                    <div className={classes.table_wrapp}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650, height: '100%' }} aria-label="caption table">
                                <caption>Всего заявок: <b>{rows.length}</b> шт.</caption>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Ф.И.О</TableCell>
                                        <TableCell align="right">Подразделение</TableCell>
                                        <TableCell align="right">Должность</TableCell>
                                        <TableCell align="right">Место</TableCell>
                                        <TableCell align="right">Основание</TableCell>
                                        <TableCell align="right">Телефон</TableCell>
                                        <TableCell align="right">Машина</TableCell>
                                        <TableCell align="right">Гос. номер</TableCell>
                                        <TableCell align="right">Заявка</TableCell>
                                        <TableCell align="right">Печать</TableCell>
                                        <TableCell align="right">Править</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.map((row, indexRow) => (
                                    <TableRow key={indexRow}>
                                        <TableCell component="th" scope="row">ФИО</TableCell>
                                        <TableCell align="right">Подразделение</TableCell>
                                        <TableCell align="right">Должность</TableCell>
                                        <TableCell align="right">Место</TableCell>
                                        <TableCell align="right">Основание</TableCell>
                                        <TableCell align="right">Телефон</TableCell>
                                        <TableCell align="right">Машина</TableCell>
                                        <TableCell align="right">Гос. номер</TableCell>
                                        <TableCell align="right">Заявка</TableCell>
                                        <TableCell align="right">Печать</TableCell>
                                        <TableCell align="right">{row.edit}</TableCell>
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
}
export default CarsCards