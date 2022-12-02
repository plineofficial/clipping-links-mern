import React from "react"
import {Link} from 'react-router-dom'


export const LinksList = ({links}) => {
    if (!links.length) {
        return <p style={{marginLeft:'auto', marginRight:'auto'}}>Ссылок пока нет</p>
    }
    return(
        <>
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Оригинальная</th>
                        <th>Сокращенная</th>
                        <th>Детали</th>
                    </tr>
                </thead>
                <tbody>
                    {links.map((link, index) => {
                        return(
                            <tr key={link._id}>
                                <td>{index + 1}</td>
                                <td>{link.from}</td>
                                <td><a href={link.to}>{link.to}</a></td>
                                <td><Link to={`/detail/${link._id}`}>Смотреть</Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}