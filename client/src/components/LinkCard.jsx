import React from 'react'

export const LinkCard = ({link}) => {
    return(
        <div className="LinkCard">
            <h1>Ссылка</h1>
            <p>Сокращенная ссылка: <a href={link.to} target="_blank" rel={'noopener noreferrer'}>{link.to}</a></p>
            <p>Откуда: <a href={link.from} target="_blank" rel={'noopener noreferrer'}>{link.from}</a></p>
            <p>Кол-во кликов по ссылке: <strong>{link.clicks}</strong></p>
            <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </div>
    )
}