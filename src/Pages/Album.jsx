import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import React from "react"

import Header from "../Components/Header"

import "./CSS/album.css"

export default function Album(){
    const params =  useParams()
    const albumID = params["id"]

    const [trackList, setTracks] = useState([])
	const [albumInfo, setAlbumInfo] = useState({})

    useEffect(()=>{
        async function getAlbums(){
            let url = `https://itunes.apple.com/lookup?id=${albumID}&entity=song`
            let results = await fetch(url, { mode: 'cors' })
            results = await results.json()
            results = results.results

            let albums = results.slice(0)[0]
            albums.releaseDate = albums.releaseDate.slice(0, 10)
            
            setTracks(results.slice(1))
            setAlbumInfo(albums)
            
            //console.log(albumInfo)

            
            document.title = "Album: " + albumInfo.collectionName
        }
        getAlbums();
    }, [trackList, albumInfo])

    return(<>
        <Header></Header>
        <div id="album-details">
            <div className="album-leftie">
                <div>
                    <div className="album-name">
                        <img src={albumInfo.artworkUrl100} alt="album cover" id="album-cover" />
                        <div>
                            <h2>{albumInfo.collectionName}</h2>
                            <h2>{albumInfo.artistName}</h2>
                        </div>

                    </div>
                    <div className="album-metrics">
                        <p>Genre: <strong>{albumInfo.primaryGenreName}</strong></p>
                        <p>Tracks: <strong>{albumInfo.trackCount}</strong></p>
                        <p>Country: <strong>{albumInfo.country}</strong></p>
                        <p>Release: <strong>{albumInfo.releaseDate}</strong></p>
                    </div>
                </div>
                <div className="gray">
                    <p>{albumInfo.copyright}</p>
                    <a href={albumInfo.collectionViewUrl}>iTunes Link</a>
                </div>
            </div>
            <img src="" alt="Music Video of 'Artist Name - Song Name'" />
        </div>

        <div id="trackList">
            { trackList.map(i => {
                let content = `${i.trackNumber}. `
                content += `${i.trackName}`
                return <p key={i.trackNumber}> {content} </p>
            })}
        </div>
    
    </>)
}