// SIDEBAR ITEMEMS

import { 
    MenuAdmin, 
    MenuOperator, 
    MenuMonitoring,
    MenuCard,
    MenuSecurity,
    MenuVideoSurveillance, 
    MenuHousekeeper, 
    MenuHostels, 
    MenuGame
} from '../components/svg.module'

import { 
    ADMIN_ROUT, 
    OPERATOR_ROUT, 
    MONITORING_ROUT, 
    CARDS_ROUT, 
    SECURITY_ROUT, 
    VIDEO_SURVEILLANCE_ROUT, 
    HOUSEKEEPER_ROUT, 
    HOSTELS_ROUT, 
    GAME_ROUT 
} from './routersPath'


export const SIDEBAR_ITEMS = [
    {
        to: ADMIN_ROUT,
        img: <MenuAdmin/>,
        name: 'Админ панель',
        _lvl: [1],
        anim: ''
    },
    {
        to: OPERATOR_ROUT,
        img: <MenuOperator/>,
        name: 'Оператор',
        _lvl: [1, 2, 3],
        anim: 'spin'
    },
    {
        to: MONITORING_ROUT,
        img: <MenuMonitoring/>,
        name: 'Мониторинг',
        _lvl: [1, 2, 3, 6],
        anim: ''
    },
    {
        to: CARDS_ROUT,
        img: <MenuCard/>,
        name: 'Пропуска',
        _lvl: [1, 2, 3],
        anim: ''
    },
    {
        to: SECURITY_ROUT,
        img: <MenuSecurity/>,
        name: 'Security',
        _lvl: [1, 2],
        anim: ''
    },
    {
        to: VIDEO_SURVEILLANCE_ROUT,
        img: <MenuVideoSurveillance/>,
        name: 'Видеонаблюдение',
        _lvl: [1, 2, 3],
        anim: ''
    },
    {
        to: HOUSEKEEPER_ROUT,
        img: <MenuHousekeeper/>,
        name: 'Ключница',
        _lvl: [1, 2, 3, 4],
        anim: ''
    },
    {
        to: HOSTELS_ROUT,
        img: <MenuHostels/>,
        name: 'Общежития',
        _lvl: [1, 2, 5],
        anim: ''
    },
    {
        to: GAME_ROUT,
        img: <MenuGame/>,
        name: 'Игры',
        _lvl: [1, 2, 3, 4, 5, 6],
        anim: ''
    }
]