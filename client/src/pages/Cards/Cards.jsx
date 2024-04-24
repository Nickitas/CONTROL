import React, { useState, useEffect } from 'react'

import CreationCardsModal from './CreationCardsModal'
import CardsList from './CardsList/CardsList'
import CarsCards from './CarsCards/CarsCards'
import PoolCards from './PoolCards/PoolCards'
import ExtraBtn from '../../components/UI/buttons/ExtraBtn'
import { FilePluse, List, Car, Water } from '../../svg.module'
import classes from './cards.module.scss'


const Cards = ({ lvl }) => {

  const [way, setWay] = useState('')

  if(way == 'CreationCardsModal' & [0].includes(lvl)) {
    return <CreationCardsModal setWay={setWay} />
  }
  if(way == 'CardsList' & [0].includes(lvl)) {
    return <CardsList setWay={setWay} />
  }
  if(way == 'CarsCards' & [0].includes(lvl)) {
    return <CarsCards setWay={setWay} />
  }
  if(way == 'PoolCards' & [0].includes(lvl)) {
    return <PoolCards setWay={setWay} />
  }
  else {
    return (
      <section className={classes.cards}>
          <div className='container'>
              <div className={classes.row}>
                <h2 className={classes.title}>Пропуска</h2>
              </div>
              <div className={classes.buttons_list}>
                <h3 className={classes.subtitle}>Доступный функционал:</h3>
                <ExtraBtn onClick={() => setWay('CreationCardsModal')}>
                  <FilePluse/>
                  <span>Создание заявки</span>
                </ExtraBtn>
                <ExtraBtn onClick={() => setWay('CardsList')}>
                  <List/>
                  <span>Список заявок</span>
                </ExtraBtn>
                <ExtraBtn onClick={() => setWay('CarsCards')}>
                  <Car/>
                  <span>Список заявок Авто</span>
                </ExtraBtn>
                <ExtraBtn onClick={() => setWay('PoolCards')}>
                  <Water/>
                  <span>Пропуска в бассейн</span>
                </ExtraBtn>
              </div>
          </div>
      </section>
    )
  }
}
export default Cards