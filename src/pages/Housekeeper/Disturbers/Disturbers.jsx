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
import { UpdateBtn } from '../../../components/UI/buttons/UpdateBtn/UpdateBtn'
import { Loading } from '../../../components/UI/loadings/Loading/Loading'
import { SearchIcon } from '../../../components/svg.module'
import classes from './disturbers.module.scss'


const Disturbers = () => {
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const [disturbersData, setDisturbersData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [queryParam, setQueryParam] = useState('room')
    const [queryText, setQueryText] = useState('')

    const [sortedField, setSortedField] = useState('')
    const [sortDirection, setSortDirection] = useState('asc')

    const decoded = auth?.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined
    const userRole = decoded?.UserInfo?.roles || []


    const getDisturbers = async () => {
        try {
            const response = await axiosPrivate.get('/housekeeper/disturbers')
            setDisturbersData(response.data.disturbers.map(el => {
                return {
                    id: el.id,
                    disturb: el.dist_count,
                    fio: el.fio,
                    position: el.position,
                    department: el.department,
                    room: el.room,
                    date: el.date,
                    type: el.type
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
    
        getDisturbers().catch(err => {
            console.error(err)
        })
    
        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])


    const filterFunctions = {
        disturb: (disturb, queryText) => disturb.disturb.toString().includes(queryText),
        fio: (disturb, queryText) => disturb?.fio?.toLowerCase().includes(queryText),
        position: (disturb, queryText) => disturb.position.toLowerCase().includes(queryText),
        department: (disturb, queryText) => disturb?.department?.toLowerCase().includes(queryText),
        room: (disturb, queryText) => disturb?.room?.toLowerCase().includes(queryText),
        date: (disturb, queryText) => disturb?.date?.toLowerCase().includes(queryText),
        type: (disturb, queryText) => disturb?.type?.toLowerCase().includes(queryText),
    }

    const filteredDisturbers = disturbersData.filter(room =>
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

    const sortedDisturbers = [...filteredDisturbers].sort((a, b) => {
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

    const setDisturberColorBall = (type) => {
        let ballType = ''
        switch (true) {
            case type < 5: ballType = `${classes.light}`; break;
            case type > 5 && type < 10: ballType = `${classes.middle}`; break;
            case type > 10: ballType = `${classes.high}`; break;
            default: ballType = `${classes.default}`; break;
          }

        return ballType
    }


    const disturbers = (
        <section className={classes.disturbers}>
            <div className={classes.row}>
                <h1 className='title'>Список нарушителей</h1>
            </div>
            <div className={classes.accordions_wrapper}>
                <Accordion>
                    <AccordionSummary>
                        <SearchIcon/>
                        Поиск по таблице
                    </AccordionSummary>
                    <AccordionDetails>
                        <UpdateBtn setData={getDisturbers}/>
                        <Input name='query_text'
                            lable='Поисковой запрос...'
                            value={queryText}
                            onChange={e => setQueryText(e.target.value)}
                        />
                        <Select defultValue='Искать...'
                            options={[
                                { type:'disturb', value:'по кол-ву нарушений' },
                                { type:'fio', value:'по Ф.И.О.' },
                                { type:'position', value:'по должности' },
                                { type:'department', value:'по подразделению' },
                                { type:'room', value:'по аудитории' },
                                { type:'date', value:'по дате крайнего нарушения' },
                                { type:'type', value:'по типу события' },
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
                            <TableHeadCell onClick={() => handleSortClick('disturb')}>
                                Кол-во нарушений
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
                            <TableHeadCell onClick={() => handleSortClick('room')}>
                                Аудитория
                            </TableHeadCell>
                            <TableHeadCell onClick={() => handleSortClick('date')}>
                                Дата крайнего нарушения
                            </TableHeadCell>
                            <TableHeadCell onClick={() => handleSortClick('type')}>
                                Тип события
                            </TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            isLoading ? <TableRow><TableBodyCell><Loading/></TableBodyCell></TableRow> : (disturbersData.length > 0
                                ? (
                                    sortedDisturbers.map(disturber => (
                                        <TableRow key={disturber.id}>
                                            <TableBodyCell>
                                                <div className={`${classes.colorBall} ${setDisturberColorBall(disturber.disturb)}`}>
                                                    { disturber.disturb }
                                                </div>
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { disturber.fio }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { disturber.position }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { disturber.department }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { disturber.room }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { disturber.date }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { disturber.type }
                                            </TableBodyCell>
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
                    <caption>Всего <b>{ sortedDisturbers.length }</b> нарушителей</caption>
                </Table>
            </div>
        </section>
    )

    return disturbers
}

export default Disturbers