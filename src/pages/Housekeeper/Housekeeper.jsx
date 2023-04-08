
import { Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import jwt_decode from 'jwt-decode'

import { BackLink } from '../../components/UI/BackLink/BackLink'
import { FuncBtn } from '../../components/UI/buttons/FuncBtn/FuncBtn'

import { HOUSEKEEPER_ROUT } from '../../utils/routersPath'
import { housekeeperFunctional } from '../../utils/functionalConsts'
import classes from './housekeeper.module.scss'


const Housekeeper = () => {
    const { auth } = useAuth()
    const location = useLocation()

    const decoded = auth?.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined
    const userRole = decoded?.UserInfo?.roles || []
    
    
    const housekeeper = (
        <section className={classes.housekeeper}>
            <div className='container'>
                <BackLink />
                {
                    location.pathname === `/${HOUSEKEEPER_ROUT}` ? (<>
                        <div className={classes.row}>
                            <h1 className='title'>Ключница</h1>
                        </div>
                        <h2 className='subtitle'>Доступный функционал:</h2>
                        <div className={classes.grid}>
                            {
                                housekeeperFunctional.filter(ctx => ctx._lvl.includes(userRole[0])).map(ctx => (
                                    <FuncBtn key={ctx.path}
                                        img={ctx.img}
                                        title={ctx.title}
                                        disc={ctx.disc}
                                        path={ctx.path}
                                    />
                                ))
                            }
                        </div>
                    </>) : <Outlet />
                }
            </div>
        </section>
    )

    return housekeeper
}

export default Housekeeper