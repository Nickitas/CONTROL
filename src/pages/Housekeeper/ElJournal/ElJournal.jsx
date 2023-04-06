import { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useAxiosPrivate } from '../../../hooks/useAxiosPrivate'
import jwt_decode from 'jwt-decode'
import { CSVLink } from 'react-csv'
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
import { SearchIcon } from '../../../components/svg.module'
import classes from './el_journal.module.scss'


const ElJournal = () => {
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const [elJournalData, setElJournalData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [queryParam, setQueryParam] = useState('room')
    const [queryText, setQueryText] = useState('')

    const [sortedField, setSortedField] = useState('')
    const [sortDirection, setSortDirection] = useState('asc')

    const [alertState, setAlertState] = useState({ show: false, type: '', message: '' })

    const decoded = auth?.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined
    const userRole = decoded?.UserInfo?.roles || []


    const getElJournal = async () => {
        try {
            const response = await axiosPrivate.get('/housekeeper/el_journal')
            setElJournalData(response.logs.map(el => {
                return {
                    room: el.room,
                    date: el.date,
                    time: el.time,
                    fio: el.fio,
                    position: el.position,
                    department: el.department,
                    responsible_fio: el.responsible_fio,
                    responsible_phone: el.responsible_phone,
                    type: el.type,
                    status: el.status
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

        getElJournal().catch(err => {
            console.error(err)
        })

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])


    const filterFunctions = {
        room: (el_journal, queryText) => el_journal.room?.toLowerCase().includes(queryText),
        date: (el_journal, queryText) => el_journal.date?.toLowerCase().includes(queryText),
        time: (el_journal, queryText) => el_journal.time?.toLowerCase().includes(queryText),
        fio: (el_journal, queryText) => el_journal.fio?.toLowerCase().includes(queryText),
        position: (el_journal, queryText) => el_journal.position?.toLowerCase().includes(queryText),
        department: (el_journal, queryText) => el_journal.department?.toLowerCase().includes(queryText),
        responsible_fio: (el_journal, queryText) => el_journal.responsible_fio?.toLowerCase().includes(queryText),
        responsible_phone: (el_journal, queryText) => el_journal.responsible_phone?.toLowerCase().includes(queryText),
        type: (el_journal, queryText) => el_journal.type?.toLowerCase().includes(queryText),
        status: (el_journal, queryText) => el_journal.status?.toLowerCase().includes(queryText),
    }

    const filteredElJournal = elJournalData.filter(el_lournal => 
        filterFunctions[queryParam]
            ? filterFunctions[queryParam](el_lournal, queryText.toLowerCase())
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

    const sortedElJournal = [...filteredElJournal].sort((a, b) => {
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

    const headers = [
        { label:'Комната', key:'room' },
        { label:'Дата', key:'date' },
        { label:'Время', key:'time' },
        { label:'Ф.И.О', key:'fio' },
        { label:'Должность', key:'position' },
        { label:'Подразделение', key:'department' },
        { label:'Ответственный', key:'responsible_fio' },
        { label:'Тип', key:'type' },
        { label:'Статус', key:'status' }
    ]

    const csvReport = {
        filename: `Ключница. Электронный журнал_${new Date().getDate()}.csv`,
        headers: headers,
        data:  sortedElJournal
    }

    const el_journal = (
        <section className={classes.el_journal}>
            <div className={classes.row}>
                <h1 className='title'>Электронный журнал</h1>
            </div>
            <div className={classes.accordions_wrapper}>
                <Accordion>
                    <AccordionSummary>
                        <SearchIcon/>
                        Поиск по таблице и выгрузка
                    </AccordionSummary>
                    <AccordionDetails>
                        <UpdateBtn setData={getElJournal}/>
                        <Input name='query_text'
                            lable='Поисковой запрос...'
                            value={queryText}
                            onChange={e => setQueryText(e.target.value)}
                        />
                        <Select defultValue='Искать...'
                            options={[
                                { type:'room', value:'по аудитории' },
                                { type:'date', value:'по дате' },
                                { type:'time', value:'по времени' },
                                { type:'fio', value:'по Ф.И.О.' },
                                { type:'position', value:'по должности' },
                                { type:'department', value:'по подразделению' },
                                { type:'responsible_fio', value:'по ответственному' },
                                { type:'responsible_phone', value:'по телефону ответственного' },
                                { type:'type', value:'по типу события' },
                                { type:'status', value:'по статусу' },
                            ]}
                            updateSelect={setQueryParam}
                        />
{[1,2,3].includes(userRole[0]) ? ( <CSVLink {...csvReport} data={sortedElJournal} headers={headers} separator={';'}>
                        <Button>
                            Выгрузить Excel
                        </Button></CSVLink> ) : null }
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
                            <TableHeadCell onClick={() => handleSortClick('date')}>
                                Дата
                            </TableHeadCell>
                            <TableHeadCell onClick={() => handleSortClick('time')}>
                                Время
                            </TableHeadCell>
                            <TableHeadCell onClick={() => handleSortClick('fio')}>
                                Ф.И.О
                            </TableHeadCell>
                            <TableHeadCell onClick={() => handleSortClick('position')}>
                                Должность
                            </TableHeadCell>
                            <TableHeadCell onClick={() => handleSortClick('department')}>
                                Подразделение
                            </TableHeadCell>
                            <TableHeadCell onClick={() => handleSortClick('responsible_fio')}>
                                Ответственный
                            </TableHeadCell>
                            <TableHeadCell onClick={() => handleSortClick('responsible_phone')}>
                                Телефон
                            </TableHeadCell>
                            <TableHeadCell onClick={() => handleSortClick('type')}>
                                Тип события
                            </TableHeadCell>
                            <TableHeadCell onClick={() => handleSortClick('status')}>
                                Статус
                            </TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            isLoading ? <TableRow><TableBodyCell><Loading/></TableBodyCell></TableRow> : (elJournalData.length > 0
                                ? (
                                    sortedElJournal.map((el_journal, index) => (
                                        <TableRow key={`${el_journal.room}${el_journal.time}`}>
                                            <TableBodyCell>
                                                { index + 1 }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { el_journal.room }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { el_journal.date }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { el_journal.time }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { el_journal.fio }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { el_journal.position }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { el_journal.department }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { el_journal.responsible_fio }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { el_journal.responsible_phone }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { el_journal.type }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { el_journal.status }
                                            </TableBodyCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableBodyCell>
                                            <EmptyCell>
                                                Список пуст ! Событий за последние дни не было или сервер СКУД не работает
                                            </EmptyCell> 
                                        </TableBodyCell>
                                    </TableRow>
                                )
                            )
                        }
                    </TableBody>
                    <caption>Всего <b>{ sortedElJournal.length }</b> событий</caption>
                </Table>
            </div>

            <Alert 
                alertState={alertState} 
                setAlertState={setAlertState} 
            />

        </section>
    )

    return el_journal
}

export default ElJournal