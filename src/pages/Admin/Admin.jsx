
import { Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import jwt_decode from 'jwt-decode'

import { BackLink } from '../../components/UI/BackLink/BackLink'
import { FuncBtn } from '../../components/UI/buttons/FuncBtn/FuncBtn'

import { ADMIN_ROUT } from '../../utils/routersPath'
import { adminFunctional } from '../../utils/functionalConsts'
import classes from './admin.module.scss'


const Admin = () => {
    const { auth } = useAuth()
    const location = useLocation()

    const decoded = auth?.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined
    const userRole = decoded?.UserInfo?.roles || []
    
    
    const admin = (
        <section className={classes.admin}>
            <div className='container'>
                <BackLink />
                {
                    location.pathname === `/${ADMIN_ROUT}` ? (<>
                        <div className={classes.row}>
                            <h1 className='title'>Панель админа</h1>
                        </div>
                        <h2 className='subtitle'>Доступный функционал:</h2>
                        <div className={classes.grid}>
                            {
                                adminFunctional.filter(ctx => ctx._lvl.includes(userRole[0])).map(ctx => (
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

    return admin
}

export default Admin