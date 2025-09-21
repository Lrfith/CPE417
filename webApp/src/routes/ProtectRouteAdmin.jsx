import React ,{ use, useEffect, useState } from 'react'
import useWebStore from '../store/web-store'
import { currentAdmin } from '../api/auth'
import LoadingToRedirect from './LoadingToRedirect'

const ProtectRouteAdmin = ({ element }) => {
    const [ok, setOk] = useState(false)
    const user = useWebStore((state) => state.username)
    const token = useWebStore((state) => state.token)

    useEffect(() => {
        if (user && token) {
            // send to back
            currentAdmin(token)
                .then((res) => setOk(true))
                .catch((err) => setOk(false))
        }
    }, [])

    return ok ? element : <LoadingToRedirect />
}

export default ProtectRouteAdmin