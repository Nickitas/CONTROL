

// GLASS ICONT
import lock from '../assets/images/icons/glass/lock.svg'
import table from '../assets/images/icons/glass/table.svg'
import home from '../assets/images/icons/glass/home.svg'
import room from '../assets/images/icons/glass/room.svg'
import danger from '../assets/images/icons/glass/danger.svg'
import report from '../assets/images/icons/glass/report.svg'
import calendar from '../assets/images/icons/glass/calendar.svg'
import folder from '../assets/images/icons/glass/folder.svg'
import camera from '../assets/images/icons/glass/camera.svg'
import net from '../assets/images/icons/glass/net.svg'
import activity from '../assets/images/icons/glass/activity.svg'
import eye from '../assets/images/icons/glass/eye.svg'
import location from '../assets/images/icons/glass/location.svg'
import users from '../assets/images/icons/glass/users.svg'
import console from '../assets/images/icons/glass/console.svg'




// ADMIN FUNCTIONAL
import { USERS_ROUT, SYSLOGS_ROUT } from './routersPath'
export const adminFunctional = [
    {
        img: users,
        title: 'Пользователи',
        disc: 'Управление аккаунтами пользователей системы CONTROL',
        path: USERS_ROUT,
        _lvl: [1],
    },
    {
        img: console,
        title: 'Логи системы',
        disc: 'Просмотр системных событий',
        path: SYSLOGS_ROUT,
        _lvl: [1, 2],
    }
]

// OPERATOR FUNCTIONAL


// MONITORING FUNCTIONAL
import { STATISTICS_ROUT, VISITS_ROUT, VIEW_AUDIENCES_ROUT, SEARCH_PERSON_ROUT, MONITORING_REPORTS_ROUT } from './routersPath'
export const monitoringFunctional = [
    {
        img: activity,
        title: 'Статистика событий',
        disc: 'Статистические данные по посещаемости субъектов мониторинга',
        path: STATISTICS_ROUT,
        _lvl: [1, 2, 3, 6],
    },
    {
        img: calendar,
        title: 'График посещаемости',
        disc: 'Мониторинг событий входа-выхода по кампусам и аудиториям субъектов мониторинга',
        path: VISITS_ROUT,
        _lvl: [1, 2, 3, 6],
    },
    {
        img: eye,
        title: 'Наблюдение за аудиториями',
        disc: 'Наблюдение за аудиториями в режиме реального времени',
        path: VIEW_AUDIENCES_ROUT,
        _lvl: [1, 2, 3, 6],
    },
    {
        img: location,
        title: 'Поиск персоны',
        disc: 'Получение истории перемещения по идентификатору субъектов мониторинга',
        path: SEARCH_PERSON_ROUT,
        _lvl: [1, 2, 3, 6],
    },
    {
        img: report,
        title: 'Выгрузка',
        disc: 'Формирование отчетов выгрузки по работе мониторинга',
        path: MONITORING_REPORTS_ROUT,
        _lvl: [1, 2, 3, 6],
    },
]

// CARDS FUNCTIONAL


// SECURITY FUNCTIONAL


// VIDEO_SURVEILLANCE FUNCTIONAL


// HOUSEKEEPER FUNCTIONAL
import { KEY_ACCOUNTING_ROUT, EL_JOURNAL_ROUT, SUBUNIT_ROUT, ROOMS_LIST_ROUT, DISTURBERS_ROUT } from './routersPath'
export const housekeeperFunctional = [
    {
        img: lock,
        title: 'Учет ключей',
        disc: 'Управление электронными ключами',
        path: KEY_ACCOUNTING_ROUT,
        _lvl: [1, 2, 3, 4],
    },
    {
        img: table,
        title: 'Электронный журнал',
        disc: 'Просмотр событий с ключами за день',
        path: EL_JOURNAL_ROUT,
        _lvl: [1, 2, 3, 4],
    },
    {
        img: home,
        title: 'Подразделения',
        disc: 'Просмотр списка подразделений',
        path: SUBUNIT_ROUT,
        _lvl: [1, 2, 3],
    },
    {
        img: room,
        title: 'Список комнат',
        disc: 'Просмотр списка аудиторий',
        path: ROOMS_LIST_ROUT,
        _lvl: [1, 2, 3],
    },
    {
        img: danger,
        title: 'Нарушители',
        disc: 'Просмотр списка нарушителей',
        path: DISTURBERS_ROUT,
        _lvl: [1, 2, 3],
    },
]

// HOSTELS FUNCTIONAL


// GAME FUNCTIONAL