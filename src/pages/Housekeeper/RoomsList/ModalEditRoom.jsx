import { useEffect, useState } from 'react'
import { useAxiosPrivate } from '../../../hooks/useAxiosPrivate'
import { ModalWindow } from '../../../components/UI/ModalWindow/ModalWindow'
import { ModalHeader } from '../../../components/UI/ModalWindow/ModalHeader'
import { ModalBody } from '../../../components/UI/ModalWindow/ModalBody'
import { ModalRow } from '../../../components/UI/ModalWindow/ModalRow'
import { ModalFooter } from '../../../components/UI/ModalWindow/ModalFooter'
import { ProcessInfoBlock } from '../../../components/UI/ModalWindow/ProcessInfoBlock'
import { Input } from '../../../components/UI/inputs/Input/Input'
import { Select } from '../../../components/UI/Select/Select'
import { Button } from '../../../components/UI/buttons/Button/Button'


const ModalEditRoom = ({ data, setVisible, setAlertState, cb }) => {
    const axiosPrivate = useAxiosPrivate()
    const [roomData, setRoomData] = useState({})

    const validation = (obj) => !Object.values(obj).includes('')

    const getRoomData = async () => {
        try {
            const response = await axiosPrivate.get(`/housekeeper/rooms/${data.id}`)
            setRoomData(response.data.room)
        } catch (err) {
            if (!err?.response) console.log(`No response from server`)
            else console.error(err)
        }
    }

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        getRoomData().catch(err => {
            console.error(err)
        })

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    const handleEditRommSend = async (obj) => {
        const editRoomSend = async () => {
            try {
                const response = await axiosPrivate.post(`/housekeeper/rooms/${obj._id}`, { obj })
                if (response?.status === 200) {
                    setAlertState({
                        show: true,
                        message: `Изменения аудитории приняты!`
                    })
                    setVisible(false)
                    cb()
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
                        message: `Ошибка изменения! \nПопробуйте повторить`
                    })
                }
            }
        }
        editRoomSend()
    }


    const modal_edit_room = (
        <ModalWindow visible={data ? true : false} setVisible={setVisible}>
            <ModalHeader>
                Редактирование ауд. {data.room}
            </ModalHeader>
            <ModalBody>
                <ModalRow>
                    <Input name='building'
                        label='Корпус...'
                        value={roomData.building || ''}
                        onChange={e => setRoomData({ ...roomData, building: e.target.value })}
                        required
                    />
                    <Input name='room'
                        label='Комната...'
                        value={roomData.room || ''}
                        onChange={e => setRoomData({ ...roomData, room: e.target.value })}
                        required
                    />
                </ModalRow>
                <ModalRow>
                    <Input name='subunit'
                        label='Подразделение...'
                        value={roomData.subunit || ''}
                        onChange={e => setRoomData({ ...roomData, subunit: e.target.value })}
                        required
                    />
                    <Input name='type'
                        label='Тип...'
                        value={roomData.type || ''}
                        onChange={e => setRoomData({ ...roomData, type: e.target.value })}
                        required
                    />
                </ModalRow>
                <ModalRow>
                    <Input name='head'
                        label='Ответственный...'
                        value={roomData.head || ''}
                        onChange={e => setRoomData({ ...roomData, head: e.target.value })}
                        required
                    />
                    <Input name='phone'
                        label='Телефон...'
                        value={roomData.phone || ''}
                        onChange={e => setRoomData({ ...roomData, phone: e.target.value })}
                        required
                    />
                </ModalRow>
                <ModalRow>
                    <Select defultValue='Сигнализация...'
                        options={[
                            { type: true, value: 'есть' },
                            { type: false, value: 'нет' },
                        ]}
                        updateSelect={e => setRoomData({ ...roomData, signaling: e })}
                    />
                </ModalRow>
                <ModalRow>
                    <Button onClick={() => handleEditRommSend(roomData)} disabled={!validation(roomData)} >
                        Отправить изменения
                    </Button>
                </ModalRow>
            </ModalBody>
            <ModalFooter>
                {
                    !validation(roomData) ? (
                        <ProcessInfoBlock type='error'>
                            Для принятия изменений необходимо заполнить все поля
                        </ProcessInfoBlock>
                    ) : null
                }
            </ModalFooter>
        </ModalWindow>
    )

    return modal_edit_room
}

export default ModalEditRoom