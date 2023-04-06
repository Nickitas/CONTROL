import { useEffect, useState } from 'react'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { ModalWindow } from '../../components/UI/ModalWindow/ModalWindow'
import { ModalHeader } from '../../components/UI/ModalWindow/ModalHeader'
import { ModalBody } from '../../components/UI/ModalWindow/ModalBody'
import { ModalRow } from '../../components/UI/ModalWindow/ModalRow'
import { ModalFooter } from '../../components/UI/ModalWindow/ModalFooter'
import { ProcessInfoBlock } from '../../components/UI/ModalWindow/ProcessInfoBlock'
import { Input } from '../../components/UI/inputs/Input/Input'
import { Select } from '../../components/UI/Select/Select'
import { Button } from '../../components/UI/buttons/Button/Button'


const ModalEditUser = ({ data, setVisible, setAlertState, cb }) => {
    const axiosPrivate = useAxiosPrivate()
    const [userData, setUserData] = useState({})

    const getUserData = async () => {
        try {
            const response = await axiosPrivate.get(`/users/${data.id}`)
            setUserData(response.data)
        } catch (err) {
            if (!err?.response) console.log(`No response from server`)
            else console.error(err)
        }
    }

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        getUserData().catch(err => {
            console.error(err)
        })

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    const handleEditUserSend = async (obj) => {
        const editUserSend = async () => {
            try {
                const response = await axiosPrivate.post(`users/${obj._id}`, { obj })
                if (response?.status === 200) {
                    setAlertState({
                        show: true,
                        message: `Изменения данных приняты!`
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
        editUserSend()
        cb()
    }


    const modal_edit_user = (
        <ModalWindow visible={data ? true : false} setVisible={setVisible}>
            <ModalHeader>
                { data.fio }
            </ModalHeader>
            <ModalBody>
                <ModalRow>
                    <Input name='surname'
                        lable='Фамилия...'
                        value={userData?.surname}
                        onChange={e => setUserData({ ...userData, surname: e.target.value })}
                        required
                    />
                    <Input name='name'
                        lable='Имя...'
                        value={userData?.name}
                        onChange={e => setUserData({ ...userData, name: e.target.value })}
                        required
                    />
                    <Input name='lastname'
                        lable='Отчество...'
                        value={userData?.lastname}
                        onChange={e => setUserData({ ...userData, lastname: e.target.value })}
                    />
                </ModalRow>
                <ModalRow>
                    <Input name='subunit'
                        lable='Подразделение...'
                        value={userData?.subunit}
                        onChange={e => setUserData({ ...userData, subunit: e.target.value })}
                        required
                    />
                    <Input name='room'
                        lable='Аудитория...'
                        value={userData?.room}
                        onChange={e => setUserData({ ...userData, room: e.target.value })}
                        required
                    />
                </ModalRow>
                <ModalRow>
                    <Select defultValue='Роль аккаунта...'
                        options={[
                            { type: 1, value:'администратор' },
                            { type: 2, value:'оператор УКБ' },
                            { type: 3, value:'бюро пропусков' },
                            { type: 4, value:'вахта' },
                            { type: 5, value:'пользователь' },
                        ]}
                        updateSelect={e => setUserData({ ...userData, role: e })}
                    />
                    <Select defultValue='Состояние аккаунта...'
                        options={[
                            { type: true, value:'активирован' },
                            { type: false, value:'заблокирован' },
                        ]}
                        updateSelect={e => setUserData({ ...userData, block: e })}
                    />
                </ModalRow>
                <ModalRow>
                    <Input name='phone'
                        lable='Телефон...'
                        value={userData?.phone}
                        onChange={e => setUserData({ ...userData, phone: e.target.value })}
                        required
                    />
                    <Input name='email'
                        lable='Почта...'
                        value={userData?.email}
                        onChange={e => setUserData({ ...userData, email: e.target.value })}
                        required
                    />
                </ModalRow>
                <ModalRow>
                    <Input name='login'
                        lable='Логин...'
                        value={userData?.login}
                        onChange={e => setUserData({ ...userData, login: e.target.value })}
                        required
                    />
                    <Input name='password'
                        lable='Пароль...'
                        value={userData?.password}
                        onChange={e => setUserData({ ...userData, password: e.target.value })}
                        required
                    />
                </ModalRow>
                <ModalRow>
                    <Button onClick={() => handleEditUserSend(userData)}  >
                        {/* disabled={!validation(userData)} */}
                        Отправить изменения
                    </Button>
                </ModalRow>
            </ModalBody>
            <ModalFooter>
                {/* {
                    !validation(userData) ? (
                        <ProcessInfoBlock type='error'>
                            Для принятия изменений необходимо заполнить все поля
                        </ProcessInfoBlock>
                    ) : null
                } */}
            </ModalFooter>
        </ModalWindow>
    )

    return modal_edit_user
}

export default ModalEditUser