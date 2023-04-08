import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import jwt_decode from 'jwt-decode'
import { UserCard } from './UserCard/UserCard'
import { TableFrame } from './TableFrame/TableFrame'
import { BackLink } from '../../components/UI/BackLink/BackLink'
import { Accordion } from '../../components/UI/Accordion/Accordion'
import { AccordionSummary } from '../../components/UI/Accordion/AccordionSummary'
import { AccordionDetails } from '../../components/UI/Accordion/AccordionDetails'
import { ProcessInfoBlock } from '../../components/UI/ModalWindow/ProcessInfoBlock'
import { Table } from '../../components/UI/Table/Table'
import { TableHead } from '../../components/UI/Table/TableHead'
import { TableBody } from '../../components/UI/Table/TableBody'
import { TableRow } from '../../components/UI/Table/TableRow'
import { TableHeadCell } from '../../components/UI/Table/TableHeadCell'
import { TableBodyCell } from '../../components/UI/Table/TableBodyCell'
import { EmptyCell } from '../../components/UI/Table/EmptyСell'
import { ActionBtn } from '../../components/UI/buttons/ActionBtn/ActionBtn'
import { Button } from '../../components/UI/buttons/Button/Button'
import { Input } from '../../components/UI/inputs/Input/Input'
import { Select } from '../../components/UI/Select/Select'
import { Alert } from '../../components/UI/Alert/Alert'
import { Loading } from '../../components/UI/loadings/Loading/Loading'
import { NICK, ILIM } from '../../utils/baseConsts'
import classes from './profile.module.scss'


const Profile = () => {
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const [accountData, setAccountData] = useState({
        id: '628bd0b197b53279123ffdd2',
        surname: 'Кодацкий',
        name: 'Никита',
        lastname: 'Максимович',
        ava: 'https://pikuco.ru/upload/test_stable/96d/96d01aba12f9a99d9c0362b263d03969.jpg',
        status: ['👋', 'Работаю', [' ', ' ']],
        post: 'Инженер-программист',
        department: 'Отдел систем технического контроля',
        workers: [{}],
        room: '1-391а',
        role: 'Admin',
        block: false,
        phone: '89673180303',
        email: 'nickitadatsky@gmail.com',
        social_media: ['https://vk.com'],
        messenger: ['https://t.me/Nidatsky'], 
        login: 'nickitakod',
        password: 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg',
        reg: '10.05.2022',
        last_ip: '127.0.0.1',
        last_date_in_system: '07.03.2023',
    })


    const [editMode, setEditMode] = useState(false)

    const [alertState, setAlertState] = useState({ show: false, type: '', message: '' })

    const decoded = auth?.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined
    const userRole = decoded?.UserInfo?.roles || []


    const getAccount = async () => {
        try {
            const response = await axiosPrivate.get(`/account`)
            setAccountData(response.data.map(el => {
                return {
                    id: el._id,
                    fio: `${el.surname ? el.surname : ''} ${el.name ? el.name : ''} ${el.lastname ? el.lastname : ''}`,
                    ava: el.ava,
                    status: el.status, // ['emoju', 'value',  [from, to]]
                    post: el.position,
                    department: el.departmen,
                    workers: el.workers, // [{ все данные по сотрудникам }...]
                    room: el.room,
                    role: el.role,
                    block: el.role,
                    phone: el.phone,
                    email: el.email,
                    social_media: el.social_media, // [item, item...]
                    messenger: el.messenger, // [item, item...]
                    login: el.login,
                    password: el.password,
                    reg: el.reg,
                    last_ip: el.last_ip,
                    last_date_in_system: el.last_date_in_system,
                }
            }))
        } catch (err) {
            if (!err?.response) console.log(`No response from server`)
            else console.error(err)
        }
    } 

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        getAccount().catch(err => {
            console.error(err)
        })

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])



    const profile = (
        <section className={classes.profile}>
            <div className='container'>
                <BackLink />

                <div className={classes.row}>
                    <h1 className='title'>Профиль</h1>
                </div>

                <div className={classes.grid}>
                    <UserCard
                        editMode={editMode}
                        setEditMode={setEditMode}
                        ava={accountData.ava}
                        status={accountData.status}
                        name={accountData.name}
                        surname={accountData.surname}
                        post={accountData.post}
                        workers={accountData.workers}
                    />

                    <TableFrame
                        editMode={editMode}
                        setEditMode={setEditMode}

                    />
                </div>
            </div>

            <Alert 
                alertState={alertState} 
                setAlertState={setAlertState} 
            />

        </section>
    )

    return profile
}

export default Profile