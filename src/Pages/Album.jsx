import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import React from "react"

import Header from "../Components/Header"

export default function Album(){
    const params =  useParams()
    const albumID = params["id"]
    //const [albumInfo, setAlbumInfo] = useState({})
	let tracks = []
	let albumInfo = {}

    useEffect(()=>{
        let isMounted = true;

        async function getAlbums(){
            let url = `https://itunes.apple.com/lookup?id=${albumID}&entity=song`
            let results = await fetch(url, { mode: 'cors' })
            results = await results.json()

            if (isMounted) {
				albumInfo = {
					...albumInfo,
					...results.results[0]
				}
                tracks = [
					...results.results.slice(1)
				]

				console.log(tracks)
            }

			document.title = `Album: ${albumInfo.collectionName}`
        }
        getAlbums();
		console.log(albumInfo)

        return () => {
            isMounted = false;
        };

    }, [])

	//let nuke = Object.keys(albumInfo).map(k => (<p key={k}>{albumInfo[k]}</p>))

    return(<>
        <Header></Header>
        <h1>{albumID}</h1>
        
        
    
    </>)
}