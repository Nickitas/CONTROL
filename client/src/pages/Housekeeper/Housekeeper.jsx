import React, { useState, useEffect  } from 'react'

import KeyAccounting from './KeyAccounting/KeyAccounting'
import ElJurnal from './ElJurnal/ElJurnal'
import Subunit from './Subunit/Subunit'
import RoomsList from './RoomsList/RoomsList'
import DisturberList from './DisturberList/DisturberList'
import ExtraBtn from '../../components/UI/buttons/ExtraBtn'
import { Key, TableIcon, Landmark, DoorOpen, FaceMask } from '../../svg.module'
import classes from './Housekeeper.module.scss'


const Housekeeper = ({ lvl }) => {
    
    const [way, setWay] = useState('')

    if(way == 'KeyAccounting' & [0, 1, 2, 3, 4, 5].includes(lvl)) {
        return <KeyAccounting setWay={setWay} />
    }
    if(way == 'ElJurnal' & [0, 1, 2, 3, 4, 5].includes(lvl)) {
        return <ElJurnal setWay={setWay}/>
    }
    if(way == 'Subunit'&[0].includes(lvl)) {
        return <Subunit setWay={setWay} />
    }
    if(way == 'RoomsList' & [0, 2, 3].includes(lvl)) {
        return <RoomsList setWay={setWay} lvl={lvl} />
    }
    if(way == 'DisturberList' & [0].includes(lvl)) {
        return <DisturberList setWay={setWay} />
    }
    else {
        return (
            <section className={classes.Housekeeper}>
                <div className='container'>
                    <div className={classes.row}>
                        <h2 className={classes.title}>Ключница</h2>
                    </div>
                    <div className={classes.buttons_list}>
                        <h3 className={classes.subtitle}>Доступный функционал:</h3>
                        <ExtraBtn onClick={() => {setWay('KeyAccounting')}}>
                            <Key/>
                            <span>Учет ключей</span> 
                        </ExtraBtn>
                        <ExtraBtn onClick={() => {setWay('ElJurnal')}}>
                            <TableIcon/>
                            <span>Электронный журнал</span>
                        </ExtraBtn>
                        {[0].includes(lvl) && <ExtraBtn onClick={() => {setWay('Subunit')}}>
                            <Landmark/>
                            <span>Подразделения</span>
                        </ExtraBtn>}
                        {[0, 2, 3].includes(lvl) && <ExtraBtn onClick={() => {setWay('RoomsList')}}>
                            <DoorOpen/>
                            <span>Список комнат</span>
                        </ExtraBtn>}
                        {[0].includes(lvl) && <ExtraBtn onClick={() => {setWay('DisturberList')}}>
                            <FaceMask/>
                            <span>Список нарушителей</span>
                        </ExtraBtn>}
                    </div>
                </div>
            </section>
        )
    }
}

export default Housekeeper