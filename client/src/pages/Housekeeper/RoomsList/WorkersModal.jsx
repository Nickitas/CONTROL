import React, { useState, useEffect } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { getRoomPermissions, addPermission, deletePermission } from '../../../Fetch'
import { ReactComponent as Close } from '../../../../public/icons/close.svg'
import { TrashCan } from '../../../svg.module'
import Input from '../../../components/UI/inputs/Input'
import Btn from '../../../components/UI/buttons/Btn'
import Loading from '../../../components/UI/Loading/Loading'
import '../../../assets/modal_window.scss'


const WorkersModal = ({ setVisibleWorkers, room, id }) => {

    const [rows, setRows] = useState([])
    const [roomId, setRoomId] = useState('')
    const [addKey, setAddKey] = useState('')


    useEffect(() => {
        if(rows.length != 0) return 
        getRoomPermissions(id).then(e => {
            if(e.state) {
                setRows(e.body.result.map(ee => {
                    return {
                        user_key: ee.user_key,
                        fio: ee.fio,
                    }
                }))
                setRoomId(e.body.room_id)
            }
        })
    }, [rows])


    const handleAddPermission = (room_id, user_key, setRows, rows) => {
        addPermission(room_id, user_key).then(e => {
            if(e.state) {
                setRows([])
                // alert(`Ключ [${user_key}] добавлен!`)
            } else alert(`Ключа [${user_key}] нет в базе. Добавлять не будем! (｡･∀･)ﾉ`)
        })
    }
    
    const handleDeletePermission = (room_id, user_key, setRows, rows) => {
        deletePermission(room_id, user_key).then(e => {
            if(e.state) {
                setRows([])
                alert(`Ключ [${user_key}] уделен! ಠ﹏ಠ`)
            }
        })
    }

    return (
        <div className='fade_block'>
            <div className='modal'>
                <div className='header'>
                    <h3 className='subtitle'>Сотрудники ауд. {room}</h3>
                    <div className='close' onClick={() => setVisibleWorkers(false)}>
                        <Close />                     
                    </div>
                </div>
                <div className='row'>
                    <Input required placeholder='Ключ...' onChange={e => setAddKey(ee => e.target.value)}/>
                    <Btn onClick={() => handleAddPermission(roomId, addKey, setRows, rows)}>
                        Добавить
                    </Btn>
                </div>
                <div className='body'>
                    {
                        rows.length ? (
                            <TableContainer component={Paper}>
                                <Table sx={{ width: '100%'}} aria-label='caption table'>
                                    <caption>Всего <b>{rows.length}</b> сотрудников.</caption>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell>Ключ</TableCell>
                                            <TableCell>ФИО</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            rows.map((row, indexRow) => (
                                                <TableRow key={indexRow}>
                                                    <TableCell component='th' scope='row' onClick={() => handleDeletePermission(id, row.user_key, setRows, rows)}><div className='svg-wrapp'><TrashCan/></div></TableCell>
                                                    <TableCell>{ row.user_key }</TableCell>
                                                    <TableCell>{ row.fio }</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <Loading />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default WorkersModal