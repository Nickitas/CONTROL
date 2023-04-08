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
import { Button } from '../../../components/UI/buttons/Button/Button'
import { ActionBtn } from '../../../components/UI/buttons/ActionBtn/ActionBtn'
import { PhotoUploadInput } from '../../../components/UI/inputs/PhotoUploadInput/PhotoUploadInput'
import defaultperson from '../../../assets/images/pic/defaultperson.svg'
import { UserCircle, SettingsIcon, EditIcon, BroomIcon, EmojiHappyIcon, EmojiSadIcon, LogOutIcon } from '../../../components/svg.module'
import classes from './user_card.module.scss'


const UserCard = ({ editMode, setEditMode, ...props }) => {


    const handleAvatarSend = () => {

    }

    const user_card = (
        <div className={classes.user_card}>
            <div className={classes.pic}>
                <div className={classes.img_wrapper}>
                    {
                        !editMode
                            ? <img src={ props.ava || defaultperson } />
                            : <PhotoUploadInput onFileChange={handleAvatarSend} /> 
                    }
                </div>
                <div className={classes.status}>
                    { props.status[0] }
                    <span>{ props.status[1] }</span>
                </div>
            </div>
            <div className={classes.user}>
                <h2 className='subtitle'>{ `${props.name} ${props.surname}` }</h2>
                <p className='text'>{ props.post }</p>
            </div>
            <div className={classes.accordions_wrapper}>
                <Accordion>
                    <AccordionSummary>
                        <UserCircle/>
                        Мои сотрудники
                    </AccordionSummary>
                    <AccordionDetails>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell>
                                        Ф.И.О.
                                    </TableHeadCell>
                                    <TableHeadCell>
                                        Должность
                                    </TableHeadCell>
                                    <TableHeadCell>
                                        Ставка
                                    </TableHeadCell>
                                    <TableHeadCell>
                                        Крайний проход
                                    </TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    
                                }
                            </TableBody>
                        </Table>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>
                        <SettingsIcon/>
                        Настройки
                    </AccordionSummary>
                    <AccordionDetails>
                        <ActionBtn ico={!editMode ? <EditIcon/> : <BroomIcon/>} onClick={() => setEditMode(prev => !prev)}>
                            { !editMode ? 'Вкл. ред.' : 'Выкл. ред.' }
                        </ActionBtn>
                        <Button>
                            <EmojiHappyIcon/>
                            Сохранить
                        </Button>
                        <Button data-red>
                            <EmojiSadIcon/>
                            Отмена
                        </Button>
                        <ActionBtn ico={<LogOutIcon/>}>
                            Выйти
                        </ActionBtn>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )

    return user_card
}

export { UserCard }