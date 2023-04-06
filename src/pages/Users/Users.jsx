import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import jwt_decode from 'jwt-decode'
import { Accordion } from '../../components/UI/Accordion/Accordion'
import { AccordionSummary } from '../../components/UI/Accordion/AccordionSummary'
import { AccordionDetails } from '../../components/UI/Accordion/AccordionDetails'
import { Table } from '../../components/UI/Table/Table'
import { TableHead } from '../../components/UI/Table/TableHead'
import { TableBody } from '../../components/UI/Table/TableBody'
import { TableRow } from '../../components/UI/Table/TableRow'
import { TableHeadCell } from '../../components/UI/Table/TableHeadCell'
import { TableBodyCell } from '../../components/UI/Table/TableBodyCell'
import { EmptyCell } from '../../components/UI/Table/EmptyСell'
import { Alert } from '../../components/UI/Alert/Alert'
import { Select } from '../../components/UI/Select/Select'
import { Input } from '../../components/UI/inputs/Input/Input'
import { PhotoUploadInput } from '../../components/UI/inputs/PhotoUploadInput/PhotoUploadInput'
import { UpdateBtn } from '../../components/UI/buttons/UpdateBtn/UpdateBtn'
import { Loading } from '../../components/UI/loadings/Loading/Loading'
import { Button } from '../../components/UI/buttons/Button/Button'
import { ActionBtn } from '../../components/UI/buttons/ActionBtn/ActionBtn'
import { BackLink } from '../../components/UI/BackLink/BackLink'
import defaultperson from '../../assets/images/pic/defaultperson.svg'
import { UserPlusIcon, SearchIcon, PencilIcon, TrashCanIcon, OkeyInSquareIcon, CrossInSquareIcon } from '../../components/svg.module'
import ModalEditUser from './ModalEditUser'
import classes from './users.module.scss'


const Users = () => {
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const [usersData, setUsersData] = useState([])
    const [newUser, setNewUser] = useState({ surname: '', name: '', lastname: '', subunit: '', login: '', password: '', room: '', phone: '', email: '', ava: '' })
    const [isLoading, setIsLoading] = useState(false)

    const [queryParam, setQueryParam] = useState('fio')
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


    const getUsers = async () => {
        try {
            const response = await axiosPrivate.get(`/users`)
            setUsersData(response.data.map(el => {
                return {
                    id: el._id,
                    fio: `${el.surname ? el.surname : ''} ${el.name ? el.name : ''} ${el.lastname ? el.lastname : ''}`,
                    ava: el.ava,
                    subunit: el.subunit,
                    room: el.number_room,
                    role: el.role,
                    last_ip: el.last_ip,
                    phone: el.phone,
                    email: el.email,
                    reg: el.reg,
                    block: el.block,
                    login: el.login,
                    password: el.password,
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

        getUsers().catch(err => {
            console.error(err)
        })

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    const handleNewUserSend = async (obj) => {
        const newUserSend = async (obj) => {
            try {

            } catch (err) {

            }
        }
        newUserSend(obj)
    }

    const handleUserAccauntStatysToggle = async (id, block) => {
        const userAccauntStatysToggle = async (id, block) => {
            try {
                const response = await axiosPrivate.post(`/users/block`, { id: id, block: block })
                if (response?.status === 200) {
                    setAlertState({ 
                        show: true, 
                        message: `${ block ? 'Аккаунт заблокирован' : 'Аккаунт разаблокирован'}!`
                    })

                    getUsers().catch((err) => {
                        console.error(err)
                    })
                }
                else if(response?.status === 204) {
                    setAlertState({ 
                        show: true, 
                        type: 'error',
                        message: `Не получилось обновить статус аккаунта!`
                    })
                }
            } catch (err) {
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
                        message: `Ошибка обновления! \nПопробуйте повторить`
                    })
                }
            }
        }
        userAccauntStatysToggle(id, block)
    }

    const handleDeleteUser = async (id) => {
        const deleteUser = async (id) => {
            try {
                const response = await axiosPrivate.post('/users/delete', { id })
                if (response?.status === 200) {
                    setAlertState({ 
                        show: true, 
                        message: `Аккаунт удален успешно!`
                    })

                    getUsers().catch((err) => {
                        console.error(err)
                    })
                }
                else if(response?.status === 204) {
                    setAlertState({ 
                        show: true, 
                        type: 'error',
                        message: `Не получилось удалить этот аккаунт!`
                    })
                }
            } catch (err) {
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
        deleteUser(id)
    }

    const handleUserEditOpen = (id, fio) => {
        setVisible('modal_user_edit')
        setTransmitData({ id: id, fio: fio })
    }

    const handleFileChange = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            const base64data = reader.result
            // обработка файла - здесь вы можете отправить base64data на сервер или использовать его для отображения в компоненте
            console.log('File uploaded:', file.name)
            console.log('Base64 data:', base64data)
        }
    }

    const filterFunctions = {
        id: (user, queryText) => user.id?.toLowerCase().includes(queryText),
        fio: (user, queryText) => user.fio?.toLowerCase().includes(queryText),
        ava: (user, queryText) => user.ava?.toLowerCase().includes(queryText),
        subunit: (user, queryText) => user.subunit?.toLowerCase().includes(queryText),
        room: (user, queryText) => user?.room?.toLowerCase().includes(queryText),
        role: (user, queryText) => user?.role?.toLowerCase().includes(queryText),
        last_ip: (user, queryText) => user?.last_ip?.toLowerCase().includes(queryText),
        block: (user, queryText) => user?.block?.toLowerCase().includes(queryText),
        phone: (user, queryText) => user?.phone?.toLowerCase().includes(queryText),
        email: (user, queryText) => user?.email?.toLowerCase().includes(queryText),
        reg: (user, queryText) => user?.reg?.toLowerCase().includes(queryText),
        login: (user, queryText) => user?.login?.toLowerCase().includes(queryText),
        password: (user, queryText) => user?.password?.toLowerCase().includes(queryText),
    }

    const filteredUsers = usersData.filter(subunit => 
        filterFunctions[queryParam]
            ? filterFunctions[queryParam](subunit, queryText.toLowerCase())
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

    const sortedUsers = [...filteredUsers].sort((a, b) => {
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

    const users = (
        <section className={classes.users}>
            <div className='container'>
                <BackLink  />

                <div className={classes.row}>
                    <h1 className='title'>Пользователи</h1>
                </div>

                <div className={classes.accordions_wrapper}>
                    <Accordion>
                        <AccordionSummary>
                            <UserPlusIcon/>
                            Создать
                        </AccordionSummary>
                        <AccordionDetails>
                            <PhotoUploadInput
                                onFileChange={handleFileChange}
                            />
                        </AccordionDetails>
                        <AccordionDetails>
                            <Input name='surname'
                                lable='Фамилия...'
                                value={newUser?.surname}
                                onChange={e => setNewUser({ ...newUser, surname: e.target.value })}
                                required
                            />
                            <Input name='name'
                                lable='Имя...'
                                value={newUser?.name}
                                onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                required
                            />
                            <Input name='lastname'
                                lable='Отчество...'
                                value={newUser?.lastname}
                                onChange={e => setNewUser({ ...newUser, lastname: e.target.value })}
                            />
                            <Input name='subunit'
                                lable='Подразделение...'
                                value={newUser?.subunit}
                                onChange={e => setNewUser({ ...newUser, subunit: e.target.value })}
                                required
                            />
                            <Input name='room'
                                lable='Аудитория...'
                                value={newUser?.room}
                                onChange={e => setNewUser({ ...newUser, room: e.target.value })}
                                required
                            />
                            <Select defultValue='Роль аккаунта...'
                                options={[
                                    { type: 1, value:'администратор' },
                                    { type: 2, value:'оператор УКБ' },
                                    { type: 3, value:'бюро пропусков' },
                                    { type: 4, value:'вахта' },
                                    { type: 5, value:'пользователь' },
                                ]}
                                updateSelect={e => setNewUser({ ...newUser, role: e })}
                            />
                            <Select defultValue='Состояние аккаунта...'
                                options={[
                                    { type: true, value:'активирован' },
                                    { type: false, value:'заблокирован' },
                                ]}
                                updateSelect={e => setNewUser({ ...newUser, block: e })}
                            />
                            <Input name='phone'
                                lable='Телефон...'
                                value={newUser?.phone}
                                onChange={e => setNewUser({ ...newUser, phone: e.target.value })}
                                required
                            />
                            <Input name='email'
                                lable='Почта...'
                                value={newUser?.email}
                                onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                required
                            />
                            <Input name='login'
                                lable='Логин...'
                                value={newUser?.login}
                                onChange={e => setNewUser({ ...newUser, login: e.target.value })}
                                required
                            />
                            <Input name='password'
                                lable='Пароль...'
                                value={newUser?.password}
                                onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                                required
                            />
                            <Button onClick={() => handleNewUserSend(newUser)}>
                                Создать
                            </Button>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary>
                            <SearchIcon/>
                            Поиск по таблице
                        </AccordionSummary>
                        <AccordionDetails>
                            <UpdateBtn setData={getUsers}/>
                            <Input name='query_text'
                                lable='Поисковой запрос...'
                                value={queryText}
                                onChange={e => setQueryText(e.target.value)}
                            />
                            <Select defultValue='Искать...'
                                options={[
                                    { type:'id', value:'по ID' },
                                    { type:'fio', value:'по Ф.И.О.' },
                                    { type:'subunit', value:'по подразделению' },
                                    { type:'room', value:'по комнате' },
                                    { type:'role', value:'по роле' },
                                    { type:'last_ip', value:'по IP' },
                                    { type:'block', value:'по статусу аккаунта' },
                                    { type:'phone', value:'по телефону' },
                                    { type:'email', value:'по эл. почте' },
                                    { type:'reg', value:'по дате регистрации' },
                                    { type:'login', value:'по логину' },
                                    { type:'password', value:'по паролю' },
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
                                <TableHeadCell onClick={() => handleSortClick('id')}>
                                    ID
                                </TableHeadCell>
                                <TableHeadCell onClick={() => handleSortClick('fio')}>
                                    Ф.И.О.
                                </TableHeadCell>
                                <TableHeadCell onClick={() => handleSortClick('ava')}>
                                    Фото
                                </TableHeadCell>
                                <TableHeadCell onClick={() => handleSortClick('subunit')}>
                                    Подразделение
                                </TableHeadCell>
                                <TableHeadCell onClick={() => handleSortClick('room')}>
                                    Аудитория
                                </TableHeadCell>
                                <TableHeadCell onClick={() => handleSortClick('role')}>
                                    Роль
                                </TableHeadCell>
                                <TableHeadCell onClick={() => handleSortClick('last_ip')}>
                                    Крайний IP-адрес
                                </TableHeadCell>
                                <TableHeadCell onClick={() => handleSortClick('phone')}>
                                    Телефон
                                </TableHeadCell>
                                <TableHeadCell onClick={() => handleSortClick('email')}>
                                    Эл. почта
                                </TableHeadCell>
                                <TableHeadCell onClick={() => handleSortClick('reg')}>
                                    Дата регистрации
                                </TableHeadCell>
                                <TableHeadCell onClick={() => handleSortClick('login')}>
                                    Логин
                                </TableHeadCell>
                                <TableHeadCell onClick={() => handleSortClick('password')}>
                                    Пароль
                                </TableHeadCell>
                                <TableHeadCell onClick={() => handleSortClick('block')}>
                                    Состояние аккаунта
                                </TableHeadCell>
                                <TableHeadCell>Править</TableHeadCell>
                                <TableHeadCell>Удалить</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                isLoading ? <TableRow><TableBodyCell><Loading/></TableBodyCell></TableRow> : (usersData.length > 0
                                    ? (
                                        sortedUsers.map(user => (
                                            <TableRow key={user.id}>
                                                <TableBodyCell>{ user.id }</TableBodyCell>
                                                <TableBodyCell><b>{ user.fio }</b></TableBodyCell>
                                                <TableBodyCell>
                                                    <div className={classes.pic_wrapp}>
                                                        <img src={ user.ava ? user.ava : defaultperson } />
                                                    </div>
                                                </TableBodyCell>
                                                <TableBodyCell>{ user.subunit }</TableBodyCell>
                                                <TableBodyCell>{ user.room }</TableBodyCell>
                                                <TableBodyCell>{ Object.keys(user.role ? user.role : { 'No': 0 } )[0] }</TableBodyCell>
                                                <TableBodyCell>{ user.last_ip }</TableBodyCell>
                                                <TableBodyCell>{ user.phone }</TableBodyCell>
                                                <TableBodyCell>{ user.email }</TableBodyCell>
                                                <TableBodyCell>{ user.reg }</TableBodyCell>
                                                <TableBodyCell>{ user.login }</TableBodyCell>
                                                <TableBodyCell>{ user.password }</TableBodyCell>
                                                <TableBodyCell onClick={() => handleUserAccauntStatysToggle(user.id, !user.block)}>
                                                    <div className={`svg-wrapp ${user.block ? 'red' : 'green'}`}>
                                                        { user.block ? <CrossInSquareIcon/> : <OkeyInSquareIcon/> }
                                                    </div>
                                                </TableBodyCell>
                                                <TableBodyCell onClick={() => handleUserEditOpen(user.id, user.fio)}>
                                                    <div className='svg-wrapp green'>
                                                        <PencilIcon/>
                                                    </div>
                                                </TableBodyCell>
                                                <TableBodyCell onClick={() => handleDeleteUser(user.id)}>
                                                    <div className='svg-wrapp red'>
                                                        <TrashCanIcon/>
                                                    </div>
                                                </TableBodyCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                    <TableRow>
                                        <TableBodyCell>
                                            <EmptyCell>
                                                Список пуст !
                                            </EmptyCell> 
                                        </TableBodyCell>
                                    </TableRow>
                                    ) 
                                )
                            }
                        </TableBody>
                        <caption>Всего <b>{ sortedUsers.length }</b> пользователей</caption>
                    </Table>
                </div>
            </div>

            {
                visible === 'modal_user_edit' && (
                    <ModalEditUser 
                        data={transmitData} 
                        setVisible={setVisible} 
                        setAlertState={setAlertState} 
                        cb={getUsers}
                    />
                )
            }

            <Alert 
                alertState={alertState} 
                setAlertState={setAlertState} 
            />

        </section>
    )

    return users
}

export default Users