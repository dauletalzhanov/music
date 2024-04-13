import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import React from "react"

import Header from "../Components/Header"
import TrackList from "../Components/Tracklist"

import "./CSS/album.css"

export default function Album(){
    const params =  useParams()
    const albumID = params["id"]

    const [trackList, setTracks] = useState([])
	const [albumInfo, setAlbumInfo] = useState({})

    let [query, setQuery] = useState('')
    let [embedURL, setEmbedURL] = useState('')
    const key = import.meta.env.VITE_keyGIF //process.env.keyGIF
    let url = `https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${query}`

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
            setQuery(albumInfo.artistName)
            url = `https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${query}`
            
            //console.log(albumInfo)
            //console.log(trackList)

            
            document.title = "Album: " + albumInfo.collectionName
        }
        getAlbums();
    }, [trackList, albumInfo])

    useEffect(()=>{
        async function getGIF(){
            let result = await fetch(url, { mode: 'cors' })
			result = await result.json()
            setEmbedURL(result.data.images.downsized_medium.url)
        }
        getGIF()

    }, [url])

    function hovering(event){
        let songTitle = event.target.querySelector("p").innerHTML
        songTitle = songTitle.split(".")[1]

        setQuery(`${songTitle} - ${albumInfo.artistName}`)
        url = `https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${query}`

        //console.log(query)
    }

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
            <img src={embedURL} alt="Music Video of 'Artist Name - Song Name'" />
        </div>

        <div id="trackList">
            { trackList.map(i => {
                let trackNum = `${i.trackNumber}. `
                if(i.discCount > 1){
                    trackNum = `${i.discNumber}) ` + trackNum
                }
                let content = trackNum + `${i.trackName}`
                
                let time = i.trackTimeMillis
                time /= 1000
                time = Math.floor(time)
                let mins = Math.floor(time/60)
                let secs = time - 60*mins
                mins = mins <= 10 ? "0"+mins : mins
                secs = secs <= 10 ? "0"+secs : secs
                time = `${mins}:${secs}`

                
                let p = <p>{content}</p>

                let div = <div>{time}</div>
                return <div key={trackNum} onMouseEnter={hovering}>{p} {div}</div>
            })}
        </div>
    
    </>)
}