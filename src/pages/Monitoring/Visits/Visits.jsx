import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useAxiosPrivate } from '../../../hooks/useAxiosPrivate'
import jwt_decode from 'jwt-decode'
import dateFormat from 'dateformat'
import { Calendar } from '../../../components/UI/Calendar/Calendar'
import { Accordion } from '../../../components/UI/Accordion/Accordion'
import { AccordionSummary } from '../../../components/UI/Accordion/AccordionSummary'
import { AccordionDetails } from '../../../components/UI/Accordion/AccordionDetails'
import { Table } from '../../../components/UI/Table/Table'
import { TableHead } from '../../../components/UI/Table/TableHead'
import { TableBody } from '../../../components/UI/Table/TableBody'
import { TableRow } from '../../../components/UI/Table/TableRow'
import { TableHeadCell } from '../../../components/UI/Table/TableHeadCell'
import { TableBodyCell } from '../../../components/UI/Table/TableBodyCell'
import { EmptyCell } from '../../../components/UI/Table/EmptyСell'
import { ProcessInfoBlock } from '../../../components/UI/ModalWindow/ProcessInfoBlock'
import { Alert } from '../../../components/UI/Alert/Alert'
import { Select } from '../../../components/UI/Select/Select'
import { Input } from '../../../components/UI/inputs/Input/Input'
import { UpdateBtn } from '../../../components/UI/buttons/UpdateBtn/UpdateBtn'
import { ActionBtn } from '../../../components/UI/buttons/ActionBtn/ActionBtn'
import { Loading } from '../../../components/UI/loadings/Loading/Loading'
import { UserCircle, ReportAddIcon, CalendarIcon, CrossInSquareIcon, OkeyInSquareIcon, DownloadIcon, UploadIcon } from '../../../components/svg.module'
import classes from './visits.module.scss'


const Visits = () => {
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const [monitoringSubjectsData, setMonitoringSubjectsData] = useState([])
    const [historyCalendarData, setHistoryCalendarData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [queryParam, setQueryParam] = useState('fio')
    const [queryText, setQueryText] = useState('')

    const [sortedField, setSortedField] = useState('')
    const [sortDirection, setSortDirection] = useState('asc')

    const [groupParam, setGroupParam] = useState('все')

    const [alertState, setAlertState] = useState({ show: false, type: '', message: '' })

    const decoded = auth?.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined
    const userRole = decoded?.UserInfo?.roles || []

    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)

    const dd = String(yesterday.getDate()).padStart(2, '0')
    const mm = String(yesterday.getMonth() + 1).padStart(2, '0')

    const yesterdayFormatted = `${dd}.${mm}`


    const getMonitoringSubjects = async () => {
        try {
            const response = await axiosPrivate.get(`/monitoring/monitoring_subjects`)
            setMonitoringSubjectsData(response.data.map(el => {
                return {
                    id: el._id,
                    fio: el.fio,
                    group: el.group, // post 
                    last_date: el.last_date, 
                    time_in: el.time_in || el.time_in === '' ? el.time_in : 'нет',
                    time_out: el.time_out || el.time_out === '' ? el.time_out : 'нет',
                    is_check: el.is_check // включать ли в мониторинг
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

        getMonitoringSubjects().catch(err => {
            console.error(err)
        })

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])


    const handleMonitoringSubjectCalendarOpen = async (id, fio) => {
        try {
            const response = await axiosPrivate.get(`/monitoring/history_calendar/${id}`)
            if (response?.status === 200) {
                setAlertState({ 
                    show: true, 
                    message: `График-календарь открыт!`
                })
                setHistoryCalendarData({
                    id: e.body.id,
                    fio: fio,
                    event: e.body.dates.map(e => {
                        return {
                            title: `Факт прохода`,
                            date: e.calendar_date,
                            customText: `${e.time_in ? e.time_in : 'нет'} - ${e.time_out ? e.time_out : 'нет'}`
                        }
                    })
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
                    message: `Ошибка открытия! \nПопробуйте повторить`
                })
            }
        }
    }

    const handleToggleMonitoringSubjectCheck = async (id) => {
        // возможно если ее будет выключать декан, то добавить открытие формы причины прекращения мониторинга
    }


    const filterFunctions = {
        tab_num: ( monitoring_subject, queryText) => monitoring_subject.tab_num?.includes(queryText),
        fio: (monitoring_subject, queryText) => monitoring_subject.fio?.toLowerCase().includes(queryText),
        corps: (monitoring_subject, queryText) => monitoring_subject.corps?.includes(queryText),
        passage_status: (monitoring_subject, queryText) => monitoring_subject.passage_status?.toLowerCase().includes(queryText),
        last_pass_fact: (monitoring_subject, queryText) => monitoring_subject.last_pass_fact?.toLowerCase().includes(queryText),
        time_inside: (monitoring_subject, queryText) => monitoring_subject.time_inside?.toLowerCase().includes(queryText),
    }

    const filteredMonitoringSubjects = monitoringSubjectsData.filter(subunit => 
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

    const sortedMonitoringSubjects = [...filteredMonitoringSubjects].sort((a, b) => {
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



    const visits = (
        <section className={classes.visits}>
             <div className={classes.row}>
                <h1 className='title'>График посещаемости за {yesterdayFormatted}</h1>
            </div>

            <div className={classes.accordions_wrapper}>
                <Accordion>
                    <AccordionSummary>
                        <UserCircle/>
                        Список субъектов мониторинга
                    </AccordionSummary>
                    <AccordionDetails>
                        <h3 className='headline'>Группа: { groupParam }</h3>
                        <Select defultValue='Выбрать группу...'
                            options={[
                                { type:'ПШАМ11_type', value:'ПШАМ11' },
                                // все группы (отделы или кафедры), за которые отвечает оператор
                            ]}
                            updateSelect={setGroupParam}
                        />
                    </AccordionDetails>
                    <AccordionDetails>
                        <UpdateBtn setData={getMonitoringSubjects}/>
                        <Input name='query_text'
                            label='Поисковой запрос...'
                            value={queryText}
                            onChange={e => setQueryText(e.target.value)}
                        />
                        <Select defultValue='Искать...'
                            options={[
                                { type:'tab_num', value:'по табельному номеру' },
                                { type:'fio', value:'по Ф.И.О.' },
                                { type:'corps', value:'по проходу/выходу корпуса' },
                                { type:'passage_status', value:'по статусу события проходной' },
                                { type:'last_pass_fact', value:'по крайнему факту прохода' },
                                { type:'time_inside', value:'по проведенному времени внутри' },
                            ]}
                            updateSelect={setQueryParam}
                        />
                    </AccordionDetails>
                    <AccordionDetails>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell onClick={() => handleSortClick('tab_num')}>
                                        Таб. номер
                                    </TableHeadCell>
                                    <TableHeadCell onClick={() => handleSortClick('fio')}>
                                        Ф.И.О.
                                    </TableHeadCell>
                                    <TableHeadCell onClick={() => handleSortClick('post')}>
                                        Группа
                                    </TableHeadCell>
                                    <TableHeadCell onClick={() => handleSortClick('corps')}>
                                        Корпус
                                    </TableHeadCell>
                                    <TableHeadCell onClick={() => handleSortClick('passage_status')}>
                                        Статус прохода
                                    </TableHeadCell>
                                    <TableHeadCell onClick={() => handleSortClick('last_pass_fact')}>
                                        Крайний факт прохода
                                    </TableHeadCell>
                                    <TableHeadCell onClick={() => handleSortClick('time_inside')}>
                                        Время нахождения
                                    </TableHeadCell>
                                    <TableHeadCell>
                                        Откр. график
                                    </TableHeadCell>
                                    <TableHeadCell>
                                        Мониторинг
                                    </TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    isLoading ? <TableRow><TableBodyCell><Loading/></TableBodyCell></TableRow> : (monitoringSubjectsData.length > 0
                                        ? (
                                            sortedMonitoringSubjects.map(monitoring_subject => (
                                                <TableRow key={monitoring_subject.id}>
                                                    <TableBodyCell>{ monitoring_subject.tab_num }</TableBodyCell>
                                                    <TableBodyCell>{ monitoring_subject.fio }</TableBodyCell>
                                                    <TableBodyCell>{ monitoring_subject.post }</TableBodyCell>
                                                    <TableBodyCell>{ monitoring_subject.corps }</TableBodyCell>
                                                    <TableBodyCell>{ monitoring_subject.passage_status }</TableBodyCell>
                                                    <TableBodyCell>{ monitoring_subject.last_pass_fact }</TableBodyCell>
                                                    <TableBodyCell>{ monitoring_subject.time_inside }</TableBodyCell>
                                                    <TableBodyCell onClick={() => handleMonitoringSubjectCalendarOpen(monitoring_subject.id, monitoring_subject.fio)}>
                                                        <div className='svg-wrapp'>
                                                            <CalendarIcon/>
                                                        </div>
                                                    </TableBodyCell>
                     { [1].includes(userRole[0]) ? <TableBodyCell onClick={() => handleToggleMonitoringSubjectCheck(monitoring_subject.id)}>
                                                    <div className={`svg-wrapp ${monitoring_subject.is_check ? 'green' : 'red'}`}>
                                                        { monitoring_subject.is_check ? <OkeyInSquareIcon/> : <CrossInSquareIcon/> }
                                                    </div>
                                                    </TableBodyCell> : null }
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
                            <caption>Всего <b>{ sortedMonitoringSubjects.length }</b> субъектов мониторинга</caption>
                        </Table>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>
                        <ReportAddIcon/>
                        Выгрузки
                    </AccordionSummary>
                    <AccordionDetails>
                        <h3 className='headline'>Сформировать Excel</h3>
                        <ActionBtn ico={<DownloadIcon/>}>
                            таблицы субъектов
                        </ActionBtn>
                        <ActionBtn ico={<DownloadIcon/>}>
                            календарь субъекта
                        </ActionBtn>
                        <ActionBtn ico={<DownloadIcon/>}>
                            всю историю посящения
                        </ActionBtn>
                    </AccordionDetails>
                </Accordion>
            </div>
            
            <div className={classes.table_wrapper}>
                {
                    historyCalendarData.length > 0
                        ? <h2 className='subtitle'>{ historyCalendarData.fio }</h2>
                        : <ProcessInfoBlock>Субъект мониторинга не выбран!</ProcessInfoBlock>
                }
                <Calendar 
                    data={historyCalendarData.event} 
                />
            </div>
            
            <Alert 
                alertState={alertState} 
                setAlertState={setAlertState} 
            />

        </section>
    )

    return visits
}

export default Visits