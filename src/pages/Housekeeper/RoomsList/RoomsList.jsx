import { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useAxiosPrivate } from '../../../hooks/useAxiosPrivate'
import jwt_decode from 'jwt-decode'
import { Accordion } from '../../../components/UI/Accordion/Accordion'
import { AccordionSummary } from '../../../components/UI/Accordion/AccordionSummary'
import { AccordionDetails } from '../../../components/UI/Accordion/AccordionDetails'
import { Table } from '../../../components/UI/Table/Table'
import { TableHead } from '../../../components/UI/Table/TableHead'
import { TableRow } from '../../../components/UI/Table/TableRow'
import { TableHeadCell } from '../../../components/UI/Table/TableHeadCell'
import { TableBody } from '../../../components/UI/Table/TableBody'
import { TableBodyCell } from '../../../components/UI/Table/TableBodyCell'
import { EmptyCell } from '../../../components/UI/Table/EmptyСell'
import { Alert } from '../../../components/UI/Alert/Alert'
import { Input } from '../../../components/UI/inputs/Input/Input'
import { Select } from '../../../components/UI/Select/Select'
import { Button } from '../../../components/UI/buttons/Button/Button'
import { UpdateBtn } from '../../../components/UI/buttons/UpdateBtn/UpdateBtn'
import { Loading } from '../../../components/UI/loadings/Loading/Loading'
import { PlusIcon, SearchIcon, UserCircle, PencilIcon, TrashCanIcon } from '../../../components/svg.module'
import ModalWorkers from './ModalWorkers'
import ModalEditRoom from './ModalEditRoom'
import classes from './rooms_list.module.scss'


const RoomsList = () => {
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const [roomsData, setRoomsData] = useState([])
    const [newRoom, setNewRoom] = useState({ building: '', room: '', subunit: '', type: '', head: '', phone: '', signaling: '' })
    const [isLoading, setIsLoading] = useState(false)

    const [queryParam, setQueryParam] = useState('room')
    const [queryText, setQueryText] = useState('')

    const [sortedField, setSortedField] = useState('')
    const [sortDirection, setSortDirection] = useState('asc')

    const [visible, setVisible] = useState('')
    const [transmitData, setTransmitData] = useState({})

    const [alertState, setAlertState] = useState({ show: false, type: '', message: '' })
    
    const decoded = auth?.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined
    const userRole = decoded?.UserInfo?.roles || []

    const validation = (obj) => !Object.values(obj).includes('')


    const getRoomsList = async () => {
        try {
            const response = await axiosPrivate.get('/housekeeper/rooms')
            setRoomsData(response.data.map(el => {
            return {
                id: el._id,
                building: el.building,
                room: el.room,
                subunit: el.subunit,
                type: el.type,
                head: el.head,
                phone: el.phone,
                key_status: el.key_status,
                signal_status: el.signal_status,
                signaling: el.signaling
            }
          }))
          setIsLoading(false)
        } catch (err) {
            if (!err?.response) console.log(`No response from server`)
            else console.error(err)
        }
    }

    useEffect(() => {
        setIsLoading(true)
        let isMounted = true
        const controller = new AbortController()
    
        getRoomsList().catch(err => {
            console.error(err)
        })
    
        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])


    const handleNewRommSend = async (obj) => {
        const newRoomSend = async () => {
            try {
                const response = await axiosPrivate.post('/housekeeper/rooms', obj)
                if (response?.status === 200) {
                    setAlertState({ 
                        show: true, 
                        message: `Аудитория ${obj.building}-${obj.room} добавлена!`
                    })
                    setNewRoom({ building: '', room: '', subunit: '', type: '', head: '', phone: '', signaling: '' })
                    getRoomsList()
                }
                else if(response?.status === 204) {
                    setAlertState({ 
                        show: true, 
                        type: 'error',
                        message: `Аудитория ${obj.building}-${obj.room} уже существует!`
                    })
                }
            } catch(err) {
                if(!err?.response) {
                    setAlertState({ 
                        show: true, 
                        type: 'error',
                        message: `Нет ответа от сервера!`
                    })
                } else {
                    setAlertState({ 
                        show: true, 
                        type: 'error',
                        message: `Ошибка добавления! \nПопробуйте повторить`
                    })
                }
            }
        }
        newRoomSend()
    }


    const handleDeleteRoom = async (id) => {
        const deleteRoom = async () => {
            try {
                const response = await axiosPrivate.post('/housekeeper/rooms/delete', { id })
                if (response?.status === 200) {
                    setAlertState({ 
                        show: true, 
                        message: `Аудитория удалена успешно!`
                    })

                    getRoomsList().catch((err) => {
                        console.error(err)
                    })
                }
                else if(response?.status === 204) {
                    setAlertState({ 
                        show: true, 
                        type: 'error',
                        message: `Такой аудитории не было найдено!`
                    })
                }
            } catch(err) {
                if(!err?.response) {
                    setAlertState({ 
                        show: true, 
                        type: 'error',
                        message: `Нет ответа от сервера!`
                    })
                } else {
                    setAlertState({ 
                        show: true, 
                        type: 'error',
                        message: `Ошибка удаления! \nПопробуйте повторить`
                    })
                }
            }
        }
        deleteRoom()
    }

    const handleWorkersListOpen = (id, room) => {
        setVisible('modal_workers')
        setTransmitData({ id: id, room: room })
    }

    const handleRoomsEditOpen = (id, room) => {
        setVisible('modal_edit_room')
        setTransmitData({ id: id, room: room })
    }


    const filterFunctions = {
        room: (room, queryText) => room.room.toLowerCase().includes(queryText),
        department: (room, queryText) => room?.subunit?.toLowerCase().includes(queryText),
        type: (room, queryText) => room.type.toLowerCase().includes(queryText),
        head: (room, queryText) => room?.head?.toLowerCase().includes(queryText),
    }
      
    const filteredRooms = roomsData.filter(room =>
        filterFunctions[queryParam]
            ? filterFunctions[queryParam](room, queryText.toLowerCase())
            : true
    )

    const handleSortClick = field => {
        if (field === sortedField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortedField(field)
            setSortDirection('asc')
        }
    }

    const sortedRooms = [...filteredRooms].sort((a, b) => {
        const direction = sortDirection === 'asc' ? 1 : -1
        if (sortedField) {
            if (a[sortedField] < b[sortedField]) {
                return -1 * direction
            }
            if (a[sortedField] > b[sortedField]) {
                return 1 * direction
            }
        }
        return 0
    })
    

    const rooms_list = (
        <section className={classes.rooms_list}>
            <div className={classes.row}>
                <h1 className='title'>Список аудиторий</h1>
            </div>
            <div className={classes.accordions_wrapper}>
                { [1, 2, 3].includes(userRole[0]) && 
                    <Accordion>
                        <AccordionSummary>
                            <PlusIcon/>
                            Добавление аудитории
                        </AccordionSummary>
                        <AccordionDetails>
                            <Input name='building'
                                label='Корпус...'
                                value={newRoom?.building}
                                onChange={e => setNewRoom({ ...newRoom, building: e.target.value })}
                                required
                            />
                            <Input name='room'
                                label='Комната...'
                                value={newRoom?.room}
                                onChange={e => setNewRoom({ ...newRoom, room: e.target.value })}
                                required
                            />
                            <Input name='subunit'
                                label='Подразделение...'
                                value={newRoom?.subunit}
                                onChange={e => setNewRoom({ ...newRoom, subunit: e.target.value })}
                                required
                            />
                            <Input name='type'
                                label='Тип...'
                                value={newRoom?.type}
                                onChange={e => setNewRoom({ ...newRoom, type: e.target.value })}
                                required
                            />
                            <Input name='head'
                                label='Ответственный...'
                                value={newRoom?.head}
                                onChange={e => setNewRoom({ ...newRoom, head: e.target.value })}
                                required
                            />
                            <Input name='phone'
                                label='Телефон...'
                                value={newRoom?.phone}
                                onChange={e => setNewRoom({ ...newRoom, phone: e.target.value })}
                                required
                            />
                            <Select defultValue='Сигнализация...'
                                options={[
                                    { type: true, value:'есть' },
                                    { type: false, value:'нет' },
                                ]}
                                updateSelect={e => setNewRoom({ ...newRoom, signaling: e })}
                            />
                            <Button onClick={() => handleNewRommSend(newRoom)} disabled={!validation(newRoom)}>
                                Добавить
                            </Button>
                        </AccordionDetails>
                    </Accordion>
                }
                <Accordion>
                    <AccordionSummary>
                        <SearchIcon/>
                        Поиск по таблице
                    </AccordionSummary>
                    <AccordionDetails>
                        <UpdateBtn setData={getRoomsList}/>
                        <Input name='query_text'
                            label='Поисковой запрос...'
                            value={queryText}
                            onChange={e => setQueryText(e.target.value)}
                        />
                        <Select defultValue='Искать...'
                            options={[
                                { type:'room', value:'по аудитории' },
                                { type:'department', value:'по подразделению' },
                                { type:'type', value:'по типу' },
                                { type:'head', value:'по руководителю' }
                            ]}
                            updateSelect={setQueryParam}
                        />
                    </AccordionDetails>
                </Accordion>
            </div>
            <div className={classes.table_wrapper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>№</TableHeadCell>
                            <TableHeadCell onClick={() => handleSortClick('room')}>
                                Аудитория
                            </TableHeadCell>
                            <TableHeadCell onClick={() => handleSortClick('subunit')}>
                                Подразделение
                            </TableHeadCell>
                            <TableHeadCell onClick={() => handleSortClick('type')}>
                                Тип
                            </TableHeadCell>
                            <TableHeadCell onClick={() => handleSortClick('head')}>
                                Руководитель
                            </TableHeadCell>
                            <TableHeadCell onClick={() => handleSortClick('phone')}>
                                Телефон
                            </TableHeadCell>
                            <TableHeadCell>
                                Статусы
                            </TableHeadCell>
{ [1, 2, 3].includes(userRole[0]) ? <TableHeadCell>
                                Сотрудники
                            </TableHeadCell> : null }
{ [1, 3].includes(userRole[0]) ? <TableHeadCell>
                                Править
                            </TableHeadCell> : null }
{ [1].includes(userRole[0]) ? <TableHeadCell>
                                Удалить
                            </TableHeadCell> : null }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            isLoading ? <TableRow><TableBodyCell><Loading/></TableBodyCell></TableRow> : (roomsData.length > 0
                                ? (
                                    sortedRooms.map((room, index) => (
                                        <TableRow key={room.id}>
                                            <TableBodyCell>
                                                { index + 1 }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { `${room.building}-${room.room}` }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { room.subunit }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { room.type }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { room.head }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { room. phone }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                <p>{ `Ключ ${room.key_status ? 'на вахте' : 'у сотрудника'}\n` }</p>
                                                <p>{ room.signaling ? `Сигнализация: ${room.signal_status? 'вкл' : 'выкл'}` : '' }</p>
                                            </TableBodyCell>
        { [1, 2, 3].includes(userRole[0]) ? <TableBodyCell onClick={() => handleWorkersListOpen(room.id, room.room)}>
                                                <div className='svg-wrapp'>
                                                    <UserCircle/>
                                                </div>
                                            </TableBodyCell> : null }
           { [1, 3].includes(userRole[0]) ? <TableBodyCell onClick={() => handleRoomsEditOpen(room.id, room.room)}>
                                                <div className='svg-wrapp green'>
                                                    <PencilIcon/>
                                                </div>
                                            </TableBodyCell> : null }
              { [1].includes(userRole[0]) ? <TableBodyCell onClick={() => handleDeleteRoom(room.id)}>
                                                <div className='svg-wrapp red'>
                                                    <TrashCanIcon/>
                                                </div>
                                            </TableBodyCell> : null }
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableBodyCell>
                                            <EmptyCell>
                                                Список пуст ! Обратитесь к программисту
                                            </EmptyCell> 
                                        </TableBodyCell>
                                    </TableRow>
                                )
                            )
                        }
                    </TableBody>
                    <caption>Всего <b>{ sortedRooms.length }</b> аудиторий</caption>
                </Table>
            </div>
            
            {
                visible === 'modal_workers' && (
                    <ModalWorkers 
                        data={transmitData} 
                        setVisible={setVisible} 
                        setAlertState={setAlertState} 
                    />
                )
            }
            {
                visible === 'modal_edit_room' && (
                    <ModalEditRoom 
                        data={transmitData} 
                        setVisible={setVisible} 
                        setAlertState={setAlertState} 
                        cb={getRoomsList}
                    />
                )
            }

            <Alert 
                alertState={alertState} 
                setAlertState={setAlertState} 
            />

        </section>
    )

    return rooms_list
}

export default RoomsList