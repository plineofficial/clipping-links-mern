import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState , useContext} from "react";
import { LinksList } from "../components/LinksList";
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"


export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    
    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [])

    if (loading) {
        return <p style={{marginLeft:'auto', marginRight:'auto'}}>Идет подгрузка...</p>
      }
    
      return (
        <>
          { !loading && <LinksList links={links}/>}
        </>
      )
}