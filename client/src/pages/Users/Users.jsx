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
import ExtraBtn from '../../components/UI/buttons/ExtraBtn'
import { UserPlus, Pencil } from '../../svg.module'
import classes from './users.module.scss'


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
                    }
                }))
            }
        })
    }, [])

    return (
        <section className={classes.users}>
            <div className='container'>
                <div className={classes.row}>
                    <h2 className={classes.title}>Пользователи</h2>
                    <ExtraBtn onClick={() => setVisibleAdd(true)}>
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
                                    <TableCell>Подразделение</TableCell>
                                    <TableCell>Логин</TableCell>
                                    <TableCell>Пароль</TableCell>
                                    <TableCell>Комната</TableCell>
                                    <TableCell>Телефон</TableCell>
                                    <TableCell>Править</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row, indexRow) => (
                                <TableRow key={indexRow}>
                                    <TableCell>{ row.name }</TableCell>
                                    <TableCell>{ row.subunit }</TableCell>
                                    <TableCell>{ row.login }</TableCell>
                                    <TableCell>{ row.password }</TableCell>
                                    <TableCell>{ row.room }</TableCell>
                                    <TableCell>{ row.phone }</TableCell>
                                    <TableCell><div className='svg-wrapp' onClick={() => setVisibleEdit(true)}><Pencil/></div></TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            {visibleAdd && <AddUserModal setVisibleAdd={setVisibleAdd}/>}
            {visibleEdit && <EditUserModal setVisibleEdit={setVisibleEdit}/>}
        </section>
    )
}

export default Users