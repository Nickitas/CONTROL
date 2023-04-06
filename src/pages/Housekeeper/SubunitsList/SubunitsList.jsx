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
import { SearchIcon, LinkIcon, PencilIcon, TrashCanIcon } from '../../../components/svg.module'
import ModalEditSubunits from './ModalEditSubunits'
import classes from './subunits_list.module.scss'


const SubunitsList = () => {
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const [subunitsData, setSubunitsData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [queryParam, setQueryParam] = useState('subunit')
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


    const getSubunitsList = async () => {
        try {
            const response = await axiosPrivate.get(`/housekeeper/subunits`)
            setSubunitsData(response.data.map(el => {
                return {
                    id: el._id,
                    subunit: el.complete,
                    sub_short: el.shortcut,
                    head: el.responsible_fio,
                    phone: el.responsible_phone,
                    email: el.responsible_email,
                    profile: el.responsible_profile
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

        getSubunitsList().catch(err => {
            console.error(err)
        })

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    const handleDeleteSubunit = async (id) => {
        const deleteSubunit = async (id) => {
            try {
                const response = await axiosPrivate.post('/housekeeper/subunits/delete', { id })
                if (response?.status === 200) {
                    setAlertState({ 
                        show: true, 
                        message: `Подразделение удалено успешно!`
                    })

                    getSubunitsList().catch((err) => {
                        console.error(err)
                    })
                }
                else if(response?.status === 204) {
                    setAlertState({ 
                        show: true, 
                        type: 'error',
                        message: `Такого подразделения не было найдено!`
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
        deleteSubunit(id)
    }

    const handleSubunitEditOpen = (id, subunit) => {
        setVisible('modal_edit_subunit')
        setTransmitData({ id: id, subunit: subunit })
    }

    const filterFunctions = {
        subunit: (subunit, queryText) => subunit.subunit?.toLowerCase().includes(queryText),
        sub_short: (subunit, queryText) => subunit.sub_short?.toLowerCase().includes(queryText),
        head: (subunit, queryText) => subunit?.head?.toLowerCase().includes(queryText),
        phone: (subunit, queryText) => subunit?.phone?.toLowerCase().includes(queryText),
        email: (subunit, queryText) => subunit?.email?.toLowerCase().includes(queryText)
    }

    const filteredSubunits = subunitsData.filter(subunit => 
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

    const sortedSubunits = [...filteredSubunits].sort((a, b) => {
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


    const subunits_list = (
        <section className={classes.subunits_list}>
            <div className={classes.row}>
                <h1 className='title'>Список подразделений</h1>
            </div>
            <div className={classes.accordions_wrapper}>
                <Accordion>
                    <AccordionSummary>
                        <SearchIcon/>
                        Поиск по таблице
                    </AccordionSummary>
                    <AccordionDetails>
                        <UpdateBtn setData={getSubunitsList}/>
                        <Input name='query_text'
                            lable='Поисковой запрос...'
                            value={queryText}
                            onChange={e => setQueryText(e.target.value)}
                        />
                        <Select defultValue='Искать...'
                            options={[
                                { type:'subunit', value:'по подразделению' },
                                { type:'sub_short', value:'по краткому названию' },
                                { type:'head', value:'по ответственному' },
                                { type:'phone', value:'по телефону' },
                                { type:'email', value:'по эл. почте' }
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
                            <TableHeadCell onClick={() => handleSortClick('subunit')}>
                                Подразделение
                            </TableHeadCell>
                            <TableHeadCell onClick={() => handleSortClick('sub_short')}>
                                Кратко
                            </TableHeadCell>
                            <TableHeadCell onClick={() => handleSortClick('head')}>
                                Ответственный
                            </TableHeadCell>
                            <TableHeadCell onClick={() => handleSortClick('phone')}>
                                Телефон
                            </TableHeadCell>
                            <TableHeadCell onClick={() => handleSortClick('email')}>
                                Почта
                            </TableHeadCell>
                            <TableHeadCell>
                                Профиль
                            </TableHeadCell>
{[1, 3].includes(userRole[0]) ? <TableHeadCell>
                                Править
                            </TableHeadCell> : null }
{[1].includes(userRole[0]) ? <TableHeadCell>
                                Удалить
                            </TableHeadCell> : null }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            isLoading ? <TableRow><TableBodyCell><Loading/></TableBodyCell></TableRow> : (subunitsData.length > 0
                                ? (
                                    sortedSubunits.map((subunit, index) => (
                                        <TableRow key={subunit.id}>
                                            <TableBodyCell>
                                                { index + 1 }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { subunit.subunit }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { subunit.sub_short }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { subunit.head }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { subunit.phone }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                { subunit.email }
                                            </TableBodyCell>
                                            <TableBodyCell>
                                                <div className='svg-wrapp' onClick={() => window.open(`${subunit.profile}`, '_blank')}>
                                                    <LinkIcon/>
                                                </div>
                                            </TableBodyCell>
           { [1, 3].includes(userRole[0]) ? <TableBodyCell onClick={() => handleSubunitEditOpen(subunit.id, subunit.subunit)}>
                                                <div className='svg-wrapp green'>
                                                    <PencilIcon/>
                                                </div>
                                            </TableBodyCell> : null }
              { [1].includes(userRole[0]) ? <TableBodyCell onClick={() => handleDeleteSubunit(subunit.id)}>
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
                    <caption>Всего <b>{ sortedSubunits.length }</b> подразделений</caption>
                </Table>
            </div>

            {
                visible === 'modal_edit_subunit' && (
                    <ModalEditSubunits
                        data={transmitData} 
                        setVisible={setVisible} 
                        setAlertState={setAlertState} 
                        cb={getSubunitsList}
                    />
                )
            }

            <Alert 
                alertState={alertState} 
                setAlertState={setAlertState} 
            />

        </section>
    )

    return subunits_list
}

export default SubunitsList