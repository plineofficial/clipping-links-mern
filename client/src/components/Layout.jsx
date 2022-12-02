import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Layout = () => {
    const auth = useContext(AuthContext)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
    }

    return(
        <>
            <header>
                <a href="http://roman-blinov.epizy.com">Developed by <span>Roman</span> <span>Blinov</span></a>
                <div>
                    <Link to='/create'>Главная</Link>
                    <Link to='/links'>Ссылки</Link>
                    <button onClick={logoutHandler}>Выход</button>
                </div>
            </header>
            <Outlet/>
            <footer>
                <h4>ROMAN BLINOV</h4>
                <div>Web-Разработка.</div>
            </footer>
        </>
    )
}