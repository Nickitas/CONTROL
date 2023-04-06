import { useEffect, useState } from 'react'
import { useAxiosPrivate } from '../../../hooks/useAxiosPrivate'
import { ModalWindow } from '../../../components/UI/ModalWindow/ModalWindow'
import { ModalHeader } from '../../../components/UI/ModalWindow/ModalHeader'
import { ModalBody } from '../../../components/UI/ModalWindow/ModalBody'
import { ModalRow } from '../../../components/UI/ModalWindow/ModalRow'
import { ModalFooter } from '../../../components/UI/ModalWindow/ModalFooter'
import { ProcessInfoBlock } from '../../../components/UI/ModalWindow/ProcessInfoBlock'
import { Input } from '../../../components/UI/inputs/Input/Input'
import { Button } from '../../../components/UI/buttons/Button/Button'


const ModalEditSubunits = ({ data, setVisible, setAlertState, cb }) => {
    const axiosPrivate = useAxiosPrivate()
    const [subunitData, setSubunitData] = useState({})

    console.log(subunitData)
    const validation = (obj) => !Object.values(obj).includes('')


    const getSubunitData = async () => {
        try {
            const response = await axiosPrivate.get(`/housekeeper/subunits/${data.id}`)
            setSubunitData(response.data.subunit)
        } catch (err) {
            if (!err?.response) console.log(`No response from server`)
            else console.error(err)
        }
    }

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        getSubunitData().catch(err => {
            console.error(err)
        })

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    const handleEditSubunitSend = async (obj) => {
        const editSubunitSend = async (obj) => {
            try {
                const response = await axiosPrivate.post(`/housekeeper/subunits/${obj._id}`, { obj })
                if (response?.status === 200) {
                    setAlertState({
                        show: true,
                        message: `Изменения подразделения приняты!`
                    })
                    setVisible(false)
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
        editSubunitSend(obj)
        cb()
    }


    const modal_edit_subunits = (
        <ModalWindow visible={data ? true : false} setVisible={setVisible}>
            <ModalHeader>
                Редактирование.<br/>{data.subunit}
            </ModalHeader>
            <ModalBody>
                <ModalRow>
                    <Input name='subunit'
                        lable='Подразделение...'
                        value={subunitData.complete}
                        onChange={e => setSubunitData({ ...subunitData, complete: e.target.value })}
                        required
                    />
                </ModalRow>
                <ModalRow>
                    <Input name='sub_short'
                        lable='Краткое название...'
                        value={subunitData.shortcut}
                        onChange={e => setSubunitData({ ...subunitData, shortcut: e.target.value })}
                        required
                    />
                    <Input name='head'
                        lable='Ответственный...'
                        value={subunitData.responsible_fio}
                        onChange={e => setSubunitData({ ...subunitData, responsible_fio: e.target.value })}
                        required
                    />
                </ModalRow>
                <ModalRow>
                    <Input name='phone'
                        lable='Телефон...'
                        value={subunitData.responsible_phone}
                        onChange={e => setSubunitData({ ...subunitData, responsible_phone: e.target.value })}
                        required
                    />
                    <Input name='email'
                        lable='Эл. почта...'
                        value={subunitData.responsible_email}
                        onChange={e => setSubunitData({ ...subunitData, responsible_email: e.target.value })}
                        required
                    />
                </ModalRow>
                <ModalRow>
                    <Button onClick={() => handleEditSubunitSend(subunitData)} disabled={!validation(subunitData)} >
                        Отправить изменения
                    </Button>
                </ModalRow>
            </ModalBody>
            <ModalFooter>
                {
                    !validation(subunitData) ? (
                        <ProcessInfoBlock type='error'>
                            Для принятия изменений необходимо заполнить все поля
                        </ProcessInfoBlock>
                    ) : null
                }
            </ModalFooter>
        </ModalWindow>
    )

    return modal_edit_subunits
}

export default ModalEditSubunits