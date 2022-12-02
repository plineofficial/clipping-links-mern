import React from "react"
import { useState, useCallback } from "react"
import { useHttp } from "../hooks/http.hook";
import {useParams} from "react-router-dom"
import { LinkCard } from "../components/LinkCard";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";

export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const [link, setLink] = useState(null)
    const linkId = useParams().id
    const {request, loading} = useHttp()

    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log('Fetched: ', fetched)
            setLink(fetched)
        } catch (e) {}
    }, [token, linkId, request])

    useEffect(() => {
        getLink()
    }, [])

    if (loading) {
        return <div>Идет подгрузка...</div>
      }
    
      return (
        <>
          { !loading && link && <LinkCard link={link} /> }
        </>
      )
}