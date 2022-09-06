import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'

import { getSubunit } from '../../../Fetch'
import EditSubunitModal from './EditSubunitModal'
import UpdateBtn from '../../UI/elements/UpdateBtn/UpdateBtn'
import { Pencil, ChevronLeft } from '../../../svg.module'
import classes from './Subunit.module.scss'


const Subunit = ({setWay}) => {

    const [rows, setRows] = useState([])
    const [visibleEditSubunit, setVisibleEditSubunit] = useState(false)

    useEffect(() => {
        getSubunit().then(e => {
            if(e.state){
                setRows(e.body.map(ee => {
                    return {
                        id: ee.id,
                        subunit: ee.complete,
                        head: ee.responsible_fio,
                        phone: ee.responsible_phone,
                        email: ee.responsible_email,
                        edit: <div className='svg-wrapp' onClick={()=>{setVisibleEditSubunit(true)}}><Pencil/></div>
                    }
                }))
            }
        })
    },[])

    return (
        <section className={classes.Subunit}>
            <div className='container'>
                <div className={classes.col}>
                    <div className={classes.breadcrumb} onClick={() => setWay(true)}><ChevronLeft/>Назад</div>
                    <h2 className={classes.title}>Подразделения</h2>
                    
                    <div className={classes.UpdateBtn_wrapper} onClick={ () => setRows([]) }>
                        <Tooltip title='Обновить таблицу' placement='right-end'>
                            <UpdateBtn />
                        </Tooltip>
                    </div>
                    
                    <div className={classes.table_wrapp}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650, height:'100%'}} aria-label='caption table'>
                                <caption>Всего <b>{rows.length}</b> подразделений.</caption>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>№</TableCell>
                                        <TableCell align='left'>Подразделение</TableCell>
                                        <TableCell align='left'>Ответственный</TableCell>
                                        <TableCell align='left'>Телефон</TableCell>
                                        <TableCell align='left'>Почта</TableCell>
                                        <TableCell align='right'>Править</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.map((row, indexRow) => (
                                    <TableRow key={indexRow}>
                                        <TableCell component='th' scope='row'>{indexRow+1}</TableCell>
                                        <TableCell align='left'>{row.subunit}</TableCell>
                                        <TableCell align='left'>{row.head}</TableCell>
                                        <TableCell align='left'>{row.phone}</TableCell>
                                        <TableCell align='left'>{row.email}</TableCell>
                                        <TableCell align='right'>{row.edit}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
            {visibleEditSubunit&&<EditSubunitModal setVisibleEditSubunit={setVisibleEditSubunit}/>}
        </section>
    )
}
export default Subunit