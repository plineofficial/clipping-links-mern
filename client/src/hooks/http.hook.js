import {useState} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const request = async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body){
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(url, {
                method, body, headers
            })
            const data = await response.json()
            console.log('Data from hooks: ', data)
            if (!response.ok){
                throw new Error(data.message || 'Какая-то ошибка')
            }
            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }
    const clearError = () => setError(null)
    return {loading, request, error, clearError}
    
}