import { useEffect, useState } from 'react'
import { useAxiosPrivate } from '../../../hooks/useAxiosPrivate'
import { ModalWindow } from '../../../components/UI/ModalWindow/ModalWindow'
import { ModalHeader } from '../../../components/UI/ModalWindow/ModalHeader'
import { ModalRow } from '../../../components/UI/ModalWindow/ModalRow'
import { ModalBody } from '../../../components/UI/ModalWindow/ModalBody'
import { ModalFooter } from '../../../components/UI/ModalWindow/ModalFooter'
import { ProcessInfoBlock } from '../../../components/UI/ModalWindow/ProcessInfoBlock'
import { Table } from '../../../components/UI/Table/Table'
import { TableHead } from '../../../components/UI/Table/TableHead'
import { TableBody } from '../../../components/UI/Table/TableBody'
import { TableRow } from '../../../components/UI/Table/TableRow'
import { TableHeadCell } from '../../../components/UI/Table/TableHeadCell'
import { TableBodyCell } from '../../../components/UI/Table/TableBodyCell'
import { EmptyCell } from '../../../components/UI/Table/EmptyСell'
import { Input } from '../../../components/UI/inputs/Input/Input'
import { Button } from '../../../components/UI/buttons/Button/Button'
import { Loading } from '../../../components/UI/loadings/Loading/Loading'
import { TrashCanIcon, InfoIcon } from '../../../components/svg.module'

// 0120CEEF0B09
// 0120CEEEBF04

const ModalWorkers = ({ data, setVisible, setAlertState }) => {
    const axiosPrivate = useAxiosPrivate()
    const [workersData, setWorkersData] = useState([])
    const [roomId, setRoomId] = useState('')
    const [cardKey, setCardKey] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [sortedField, setSortedField] = useState('')
    const [sortDirection, setSortDirection] = useState('asc')

    const getWorkers = async () => {
        try {
            const response = await axiosPrivate.get(`/housekeeper/rooms/${data.id}/permissions`)
            setWorkersData(response.data.result.map(el => {
                return {
                    key: el.user_key,
                    fio: el.fio,
                }
            }))
            setRoomId(response.data.room_id)
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
        
        getWorkers().catch(err => {
            console.error(err)
        })
        
        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    const handlePermissionOnRoomAdd = async (cardKey, roomId) => {
        const permissionOnRoomAdd = async (cardKey, roomId) => {
            try {
                const response = await axiosPrivate.post(`/housekeeper/permissions`, {  user_key: cardKey, room_id: roomId })
                if (response?.status === 205) {
                    setAlertState({
                        show: true,
                        type: 'info',
                        message: `Ключа ${cardKey} не существует в базе!`
                    })
                }
                if (response?.status === 200) {
                    setAlertState({
                        show: true,
                        message: `Сотрудник добавлен по ключу ${cardKey}!`
                    })
                    getWorkers()
                }
            } catch (err) {
                if (!err?.response) {
                    setAlertState({
                        show: true,
                        type: 'error',
                        message: `Нет ответа от сервера!`
                    })
                } else {
                    setAlertState({
                        show: true,
                        type: 'error',
                        message: `Ошибка добвления! \nПопробуйте повторить`
                    })
                }
            }   
        }
        permissionOnRoomAdd(cardKey, roomId)
        setCardKey('')
    }

    const handlePermissionOnRoomRemove = async (roomId, cardKey) => {
        const permissionOnRoomRemove = async (roomId, cardKey) => {
            try {
                const response = await axiosPrivate.post(`/housekeeper/permissions/delete`, { room_id: roomId, user_key: cardKey })
                if (response?.status === 200) {
                    setAlertState({ 
                        show: true, 
                        message: `Сотрудник был удален!`
                    })

                    getWorkers().catch((err) => {
                        console.error(err)
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
        permissionOnRoomRemove(roomId, cardKey)
    }

    const handleSortClick = (field) => {
        if (field === sortedField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortedField(field)
            setSortDirection('asc')
        }
    }

    const sorteWorkers = [...workersData].sort((a, b) => {
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


    const modal_workers = (
        <ModalWindow visibleAdd={data ? true : false} setVisible={setVisible}>
            <ModalHeader>
                Сотрудники ауд. { data.room }
            </ModalHeader>
            <ModalBody>
                <ModalRow>
                    <Input name='card_key'
                        lable='Карточка сотрудника...'
                        value={cardKey}
                        onChange={e => setCardKey(ee => e.target.value)}
                        required
                    />
                    <Button onClick={() => handlePermissionOnRoomAdd(cardKey, roomId)}>
                        Добавить
                    </Button>
                </ModalRow>
                <ModalRow>
                    {
                        isLoading ? <Loading /> : (workersData.length > 0
                            ? (
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableHeadCell>№</TableHeadCell>
                                            <TableHeadCell onClick={() => handleSortClick('fio')}>
                                                Ф. И. О
                                            </TableHeadCell>
                                            <TableHeadCell>
                                                Ключ
                                            </TableHeadCell>
                                            <TableHeadCell>
                                                Удалить
                                            </TableHeadCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            sorteWorkers.map((worker, index) => (
                                                <TableRow key={`${index}-${worker.key}`}>
                                                    <TableBodyCell>
                                                        { index + 1 }
                                                    </TableBodyCell>
                                                    <TableBodyCell>
                                                        { worker.fio }
                                                    </TableBodyCell>
                                                    <TableBodyCell>
                                                        { worker.key }
                                                    </TableBodyCell>
                                                    <TableBodyCell>
                                                        <div className='svg-wrapp red' onClick={() => handlePermissionOnRoomRemove(roomId, worker.key)}>
                                                            <TrashCanIcon/>
                                                        </div>
                                                    </TableBodyCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                    <caption>Всего <b>{ workersData.length }</b> сотрудников</caption>
                                </Table>
                            ) : (
                                <EmptyCell>
                                    <InfoIcon/>
                                    Сотрудники не были найдены !
                                </EmptyCell> 
                            )
                        )
                    }
                </ModalRow>
            </ModalBody>
            <ModalFooter>
                {
                    !workersData.length > 0 && !isLoading ? (
                        <ProcessInfoBlock>
                            Возможно, они просто не были добавлены
                        </ProcessInfoBlock>
                    ) : null
                }
            </ModalFooter>
        </ModalWindow>
    )

  return modal_workers
}

export default ModalWorkers