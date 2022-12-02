import React from "react"
import {Routes, Route, Navigate} from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from './pages/DetailPage'
import {AuthPage} from './pages/AuthPage'
import {Layout} from './components/Layout'

export function useRoutes(isAuth, logout = () => {}) {
    if (isAuth){
        return(
            <>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route path='create' element={<CreatePage />} />
                        <Route path='links' element={<LinksPage />} />
                        <Route path='detail/:id' element={<DetailPage />} />
                        <Route path='*' element={<Navigate to="/create"/>} />   
                        <Route index element={<Navigate to="/create"/>} />   
                    </Route>
                </Routes>
            </>
            
        )
    }
    return(
        <>
            <Routes>
                <Route path='/' element={<AuthPage />} />
                <Route path='*' element={<Navigate to="/"/>} />
            </Routes>
        </>
        
     )
}