import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const UseAuthStatus = () => {
    const { user } = useSelector(state => state.auth)
    const [logedin, setLogedin] = useState(false)

    const [checkingStatus, setCheckingStatus] = useState(true)

    useEffect(() => {
        if (user) {
            setLogedin(true)
        } else {
            setLogedin(false)
        }
        setCheckingStatus(false)
    }, [user])
    return { logedin, checkingStatus }

}

export default UseAuthStatus
