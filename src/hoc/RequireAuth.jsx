import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { AUTH_ROUT, UNAUTHORIZED_ROUT } from '../utils/routersPath'
import { useAuth } from '../hooks/useAuth'
import jwt_decode from 'jwt-decode'


const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth()
    const location = useLocation()

    const decoded = auth?.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined

    const userRole = decoded?.UserInfo?.roles || []


    return (
        userRole.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.accessToken
                ? <Navigate to={UNAUTHORIZED_ROUT} state={{ from: location }} replace />
                : <Navigate to={AUTH_ROUT} state={{ from: location }} replace />
    )
}

export default RequireAuth