import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import React from "react"

import { db } from "../../firebase"
import { collection, doc, collectionGroup, addDoc, getDocs, setDoc} from "firebase/firestore";


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
        async function getAlbum(){
            let url = `https://itunes.apple.com/lookup?id=${albumID}&entity=song`
            let results = await fetch(url, { mode: 'cors' })
            results = await results.json()
            results = results.results

            let album = results.slice(0)[0]
            album.releaseDate = album.releaseDate.slice(0, 10)
            let albumCover = album.artworkUrl100
            albumCover = albumCover.replace("100x100bb", "1000x1000bb")
            album["albumCover"] = albumCover
            //album.artworkUrl100 = albumCover

            
            setTracks(results.slice(1))
            setAlbumInfo(album)
            setQuery(albumInfo.artistName)
            url = `https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${query}`
            
            //console.log(albumInfo)
            //console.log(trackList)

            
            document.title = "Album: " + albumInfo.collectionName
        }
        getAlbum();
    }, [trackList, albumInfo])

    useEffect(()=>{
        async function getGIF(){
            let result = await fetch(url, { mode: 'cors' })
			result = await result.json()
            setEmbedURL(result.data.images.downsized_medium.url)
        }
        getGIF()

    }, [url])

    function convertTime(millies){

        let time = millies
        time /= 1000
        time = Math.floor(time)
        let mins = Math.floor(time/60)
        let secs = time - 60*mins
        mins = mins < 10 ? "0"+mins : mins
        secs = secs < 10 ? "0"+secs : secs
        time = `${mins}:${secs}`

        return time
    }

    function hovering(event){
        let songTitle = event.target.querySelector("p").innerHTML
        songTitle = songTitle.split(".")[1]

        setQuery(`${songTitle} - ${albumInfo.artistName}`)
        url = `https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${query}`

        //console.log(query)
    }

    async function addSong(event){
        //console.log(event.target.getAttribute("id"))
        const index = event.target.getAttribute("id")
        console.log(trackList[index])
        const song = trackList[index]

        let addition = {
            artworkURL: albumInfo.albumCover,
            artistName: song.artistName,
            songName: song.trackName,
            artistURL : `artist/${song.artistId}`,
            genre: song.primaryGenreName,
            length: convertTime(song.trackTimeMillis),
            user: "user"
            //timeAdded: new Date().now(),
        }

        const docID = `${addition.artistName} - ${addition.songName}`

        await setDoc(doc(db, "song", docID), addition)

        console.log(addition)
    }

    return(<>
        <Header></Header>
        <div role="contentinfo" id="album-details">
            <div className="album-leftie">
                <div>
                    <div className="album-name">
                        <img src={albumInfo.albumCover} alt="album cover" id="album-cover" />
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

        <main>
            <ul id="trackList">
                { trackList.map((i, index) => {
                    let trackNum = `${i.trackNumber}. `
                    if(i.discCount > 1){
                        trackNum = `${i.discNumber}) ` + trackNum
                    }
                    let content = trackNum + `${i.trackName}`
                    let time = convertTime(i.trackTimeMillis)

                    return (<li className="album-track" key={index} onMouseEnter={hovering}>
                                <p>{content}</p>
                                
                                <div className="track-rightie">
                                    <p>{time}</p>
                                    <button aria-label="add song to a playlist" id={index} onClick={addSong}>+</button>
                                </div>
                                
                            </li>)
                })}
            </ul>
        </main>
    </>)
}