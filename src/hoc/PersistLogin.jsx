import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useRefreshToken } from '../hooks/useRefreshToken'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { CatLoading } from '../components/UI/loadings/CatLoading/CatLoading'


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth } = useAuth()
    const [persist] = useLocalStorage('persist', false)

    useEffect(() => {
        let isMounted = true

        const verifyRefreshToken = async () => {
            try {
                await refresh()
            }
            catch (err) {
                console.error(err)
            }
            finally {
                isMounted && setIsLoading(false)
            }
        }

        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false)

        return () => isMounted = false
    }, [])

    const content = (<>
        {
            !persist
                ? <Outlet />
                : isLoading
                    ? <CatLoading />
                    : <Outlet />
        }
    </>)

    return content
}

export default PersistLogin