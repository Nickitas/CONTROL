
import defaultperson from '../../../../assets/images/pic/defaultperson.svg'
import cat1 from '../../../../assets/images/pic/cats_vectors/cat1.svg'
import cat2 from '../../../../assets/images/pic/cats_vectors/cat2.svg'
import cat3 from '../../../../assets/images/pic/cats_vectors/cat3.svg'
import cat4 from '../../../../assets/images/pic/cats_vectors/cat4.svg'
import cat5 from '../../../../assets/images/pic/cats_vectors/cat5.svg'
import cat6 from '../../../../assets/images/pic/cats_vectors/cat6.svg'
import classes from './person_card.module.scss'



const PersonCard = ({ data }) => {

    console.log(data)


    const setPersonPic = () => {
        return {
            background: `no-repeat center / cover url(${data.avatar || defaultperson})`
        }
    }

    const setCat = () => {
        const catsArr = [cat1, cat2, cat3, cat4, cat5, cat6]
        const randIndex = Math.floor(Math.random() * 6)
        return catsArr[randIndex]
    }

    const person_card = (
        <div className={classes.person_card}>
            <div className={classes.front} style={setPersonPic()}>
                {
                    data.fio ? (
                        <span className={classes.person_name}>
                            {`${data.fio?.split(' ')[0]} ${data.fio?.split(' ')[1][0]}. ${data.fio?.split(' ')[2][0]}.`}
                        </span> 
                    ) : null
                }
            </div>
            <div className={classes.back}>
                {
                    Object.entries(data).length !== 0 ? (
                        <ul className={classes.person_info}>
                            <li className={classes.item}>
                                <b>{ data.fio }</b>
                                <i>{ data.tab_number }</i>
                            </li>
                            <li className={classes.item}>
                                <span>{ data.department || 'не указано' }</span>
                            </li>
                            <li className={classes.item}>
                                <b>Должность: </b>
                                <span>{ data.position || 'не указана' }</span>
                            </li>
                            <li className={classes.item}>
                                <b>Нарушений:</b>
                                <span>{ data.distCount || 0 }</span>
                            </li>
                        </ul>
                    ) : <img src={setCat()} />
                }
            </div>
        </div>
    )

    return person_card
}

export { PersonCard }