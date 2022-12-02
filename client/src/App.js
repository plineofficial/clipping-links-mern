import React from 'react'
import { useRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'



function App() {
  const {login, logout, token, userId, routes} = useAuth(useRoutes)
  const isAuthenticated = !!token
  //const routes = useRoutes(isAuthenticated)
  return(
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </AuthContext.Provider>
    
  )
  
}

export default App
