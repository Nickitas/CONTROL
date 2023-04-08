
import { Accordion } from '../../../components/UI/Accordion/Accordion'
import { AccordionSummary } from '../../../components/UI/Accordion/AccordionSummary'
import { AccordionDetails } from '../../../components/UI/Accordion/AccordionDetails'
import { ProcessInfoBlock } from '../../../components/UI/ModalWindow/ProcessInfoBlock'
import { Table } from '../../../components/UI/Table/Table'
import { TableHead } from '../../../components/UI/Table/TableHead'
import { TableBody } from '../../../components/UI/Table/TableBody'
import { TableRow } from '../../../components/UI/Table/TableRow'
import { TableHeadCell } from '../../../components/UI/Table/TableHeadCell'
import { TableBodyCell } from '../../../components/UI/Table/TableBodyCell'
import { EmptyCell } from '../../../components/UI/Table/EmptyСell'
import { ActionBtn } from '../../../components/UI/buttons/ActionBtn/ActionBtn'
import { Button } from '../../../components/UI/buttons/Button/Button'
import { Input } from '../../../components/UI/inputs/Input/Input'
import { Select } from '../../../components/UI/Select/Select'
import { PaperAirplaneIcon } from '../../../components/svg.module'
import classes from './table_frame.module.scss'


const TableFrame = ({ editMode, setEditMode, ...props }) => {

    const table_frame = (
        <div className={`${classes.table_frame} ${ editMode ? classes.edit_mode : ''}`}>
            <div className={classes.baner}>
                <div className={classes.blure}>
                    {
                        !editMode ? (<>
                            <h1 className='title'>{ 'Отдел систем технического контроля' }</h1>
                            <h2 className='subtitle'>{ 'Кодацкий Никита Максимович' }</h2>
                        </>) : (
                            <h1 className='title'>Режим редактирования</h1>
                        )
                    }
                </div>
            </div>
            <div className={classes.container}>
                {
                    editMode ? (
                        <div className={classes.edit_info}>
                            <div className={classes.category}>
                                <h3 className={classes.headline}>⭐️ Личные данные</h3>
                                <ul className={classes.list}>
                                    <Input name='surname'
                                        label='Фамилия...'
                                        // value={newUser?.surname}
                                        // onChange={e => setNewUser({ ...newUser, surname: e.target.value })}
                                    />
                                    <Input name='name'
                                        label='Имя...'
                                        // value={newUser?.name}
                                        // onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                    />
                                    <Input name='lastname'
                                        label='Отчество...'
                                        // value={newUser?.lastname}
                                        // onChange={e => setNewUser({ ...newUser, lastname: e.target.value })}
                                    />
                                </ul>
                            </div>
                            <div className={classes.category}>
                                <h3 className={classes.headline}>🚩 Статус</h3>
                                <ul className={classes.list}>
                                    <Select defultValue='Категория...'
                                        options={[
                                            { type: 'working', value:'работаю' },
                                            { type: 'vacation', value:'отпуск' },
                                            { type: 'sick_leave', value:'больничный' },
                                            { type: 'decree', value:'дикрет' },
                                        ]}
                                        // updateSelect={e => setNewUser({ ...newUser, block: e })}
                                    />
                                    <Input name='from'
                                        label='С...'
                                        // value={newUser?.from}
                                        // onChange={e => setNewUser({ ...newUser, from: e.target.value })}
                                    />
                                    <Input name='to'
                                        label='По...'
                                        // value={newUser?.to}
                                        // onChange={e => setNewUser({ ...newUser, to: e.target.value })}
                                    />
                                </ul>
                            </div>
                            <div className={classes.category}>
                                <h3 className={classes.headline}>📞 Контакты</h3>
                                <ul className={classes.list}>
                                    <Input name='phone'
                                        label='Телефон...'
                                        // value={newUser?.phone}
                                        // onChange={e => setNewUser({ ...newUser, phone: e.target.value })}
                                    />
                                    <Input name='email'
                                        label='Эл. пота...'
                                        // value={newUser?.email}
                                        // onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                    />
                                </ul>
                            </div>
                            <div className={classes.category}>
                                <h3 className={classes.headline}>👨🏻‍💻 Дополнительно</h3>
                                <ul className={classes.list}>
                                    <ProcessInfoBlock>
                                        При необходимости изменения других данных, обратитесь в аудиторию 1-391а
                                    </ProcessInfoBlock>
                                    <ActionBtn ico={<PaperAirplaneIcon/>} onClick={() => window.open(`${NICK}`, '_blank')}>
                                        или написав программистам
                                    </ActionBtn>
                                </ul>
                            </div>

                        </div>
                    ) : (
                        <div className={classes.read_info}>
                            <div className={classes.category}>
                                <h3 className={classes.headline}>💼 Место работы</h3>
                                <ul className={classes.list}>
                                    <li className={classes.item}><b>Подразделение:</b><span>{ 'Отдел систем технического контроля | 391a' }</span></li>
                                    <li className={classes.item}><b>Должность:</b><span>{ 'инженер-программист' }</span></li>
                                    <li className={classes.item}><b>Аудитория:</b><span>{ '391a' }</span></li>
                                </ul>
                            </div>
                            <div className={classes.category}>
                                <h3 className={classes.headline}>📞 Контакты</h3>
                                <ul className={classes.list}>
                                    <li className={classes.item}><b>Телефон:</b><span>{ '8(967)-318-03-03' }</span></li>
                                    <li className={classes.item}><b>Эл. почта:</b><span>{ 'nickitadatsky@gmail.com' }</span></li>
                                    <li className={classes.item}><b>Соц. сеть:</b><span>{ 'не указана' }</span></li>
                                    <li className={classes.item}><b>Мессенджер:</b><span>{ 'не указан' }</span></li>
                                </ul>
                            </div>
                            <div className={classes.category}>
                                <h3 className={classes.headline}>👤 Данные аккаунта</h3>
                                <ul className={classes.list}>
                                    <li className={classes.item}><b>Логин:</b><span>{ 'nidatsky' }</span></li>
                                    <li className={classes.item}><b>Хеш пароля:</b><span>{ '$2b$10$Kjx/HDHd5.fA8QBIkHVLd.785h7ZDfjKjXlS1MrlGyjE.ZtPgcvc6' }</span></li>
                                    <li className={classes.item}><b>Статус аккаунта:</b><span>{ 'активен' }</span></li>
                                    <li className={classes.item}><b>Дата регистрации:</b><span>{ '10.05.2022' }</span></li>
                                </ul>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )

    return table_frame
} 

export { TableFrame }