import React from "react";
import { useContext, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";

export const CreatePage = () => {
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')

    const pressHandler = async event => {
        if (event.key === 'Enter'){
            try {
                console.log(link)
                const data = await request('/api/link/generate', 'POST', {from: link}, {Authorization: `Bearer ${auth.token}`})
                console.log(data)
            } catch (e) {}
        }
    }

    return(
        <>
            
            <div className="block__inputs">
                <h1>Сокращение ссылки</h1>
                <input type="text" placeholder='Вставьте ссылку...' onChange={e => setLink(e.target.value)} onKeyPress={pressHandler}/>
            </div>
            
        </>
    )
}