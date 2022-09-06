import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { getUsers } from '../../Fetch'
import AddUserModal from './AddUserModal'
import EditUserModal from './EditUserModal'
import ExtraBtn from '../UI/buttons/ExtraBtn'
import { UserPlus } from '../../svg.module'
import classes from './Users.module.scss'


const Users = () => {
    
    const [rows, setRows] = useState([])
    const [visibleAdd, setVisibleAdd] = useState(false)
    const [visibleEdit, setVisibleEdit] = useState(false)

    useEffect(() => {
        getUsers().then(e => {
            if(e.state){
                setRows(e.body.map(ee => {
                    return {
                        name: `${ee.surname?ee.surname:''} ${ee.name?ee.name:''} ${ee.lastname?ee.lastname:''}`,
                        subunit: ee.subunit,
                        login: ee.login,
                        password: ee.password,
                        room: ee.number_room,
                        phone: ee.phone,
                        edit: <div className='svg-wrapp' onClick={()=>{setVisibleEdit(true)}}><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' style={{fill:'#676767'}}><path d='M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z'></path></svg></div>
                    }
                }))
            }
        })
    },[])

    return (
        <section className={classes.Users}>
            <div className='container'>
                <div className={classes.row}>
                    <h2 className={classes.title}>Пользователи</h2>
                    <ExtraBtn onClick={() => {setVisibleAdd(true)}}>
                        <UserPlus/>
                        <span>Создать пользователя</span>
                    </ExtraBtn>
                </div>
                <div className={classes.table_wrapp}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650, height: '100%' }} aria-label='caption table'>
                            <caption>Всего <b>{rows.length}</b> пользователей</caption>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ф.И.О.</TableCell>
                                    <TableCell align='right'>Подразделение</TableCell>
                                    <TableCell align='right'>Логин</TableCell>
                                    <TableCell align='right'>Пароль</TableCell>
                                    <TableCell align='right'>Комната</TableCell>
                                    <TableCell align='right'>Телефон</TableCell>
                                    <TableCell align='right'>Править</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row, indexRow) => (
                                <TableRow key={indexRow}>
                                    <TableCell component='th' scope='row'>{row.name}</TableCell>
                                    <TableCell align='right'>{row.subunit}</TableCell>
                                    <TableCell align='right'>{row.login}</TableCell>
                                    <TableCell align='right'>{row.password}</TableCell>
                                    <TableCell align='right'>{row.room}</TableCell>
                                    <TableCell align='right'>{row.phone}</TableCell>
                                    <TableCell align='right'>{row.edit}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            {visibleAdd&&<AddUserModal setVisibleAdd={setVisibleAdd}/>}
            {visibleEdit&&<EditUserModal setVisibleEdit={setVisibleEdit}/>}
        </section>
    )
}
export default Users