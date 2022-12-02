import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import '../index.css'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error,message,clearError])
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log('Data ', data)
        } catch (e) {
            
        }
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
            console.log('Data ', data)
        } catch (e) {
            
        }
    }

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    return(
        <div className="auth__block">
            <h1>Сокращение ссылок</h1>
            <span>Авторизация/Регистрация</span>
            <div className="auth__block__inputs">
               <input name="email" placeholder="Email" onChange={changeHandler} />
               <input name="password" placeholder="Пароль" onChange={changeHandler} type='password' />
            </div>
            <div className="auth__block__buttons">
                <button onClick={loginHandler} disabled={loading}>Войти</button>
                <button onClick={registerHandler} disabled={loading}>Регистрация</button>
            </div>
        </div>
    )
}