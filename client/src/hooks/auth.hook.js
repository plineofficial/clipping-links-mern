import { useState, useCallback, useEffect} from "react"

const storageName = 'userData'

export const useAuth = (route) => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [routes, setRoutes] = useState(null)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)
        setRoutes(route(true))
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken
        }))
        
    }, [route])
    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setRoutes(route(false))
        localStorage.removeItem(storageName)
        
    }, [route])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if(data && data.token){
            login(data.token, data.userId)
        }else{
            setRoutes(route(false))
        }
    }, [login,route])

    return {login, logout, token, userId, routes}
}