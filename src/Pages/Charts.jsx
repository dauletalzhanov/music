import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import Header from "../Components/Header";
import Ranking from "../Components/Ranking";
import Player from "@/Components/Player";

import './CSS/charts.css';

import "./CSS/album.css?inline"
import "./CSS/search.css?inline"
import "./CSS/profile.css?inline"
import "./CSS/no_page.css?inline"
import aaa from './CSS/search.css?inline' 

export default function Charts() {
    const [beginning, setBeginning] = useState('');
    const [end, setEnd] = useState('');
    const { currentTrack } = useSelector((state) => state.player)

    const url100 = 'https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-hot-100/recent.json';
    const url200 = 'https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-200/recent.json';
    const urlGlo = 'https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-global-200/recent.json';

    useEffect(() => {
        async function getCharts(url) {
            let response = await fetch(url);
            response = await response.json();

            const responseDate = new Date(response.date);
            setBeginning(responseDate.toISOString().slice(0, 10));

            const endDate = new Date(responseDate);
            endDate.setDate(responseDate.getDate() + 7);
            setEnd(endDate.toISOString().slice(0, 10));

            console.log(response);
            return response['data'];
        }

        function getRand(min, max) {
            const minCeiled = Math.ceil(min);
            const maxFloored = Math.floor(max);
            return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
        }

        getCharts(url100);

        //document.body.style.backgroundColor = `rgb(${getRand(230, 255)},${getRand(230, 255)},${getRand(230, 255)})`;
		//document.title = `Billboard Rankings`
    }, []);

    return(<>
            <Header></Header>
            <div role="banner" className="billboard-title">
                <h1>Billboard Charts</h1>
                <p role="contentinfo" aria-label="charts for this week">{beginning} - {end}</p>
            </div>

            <div role="main" className="rank-container">
                <Ranking title='Albums' url={url200} />
                <Ranking title='Songs' url={url100} />
                <Ranking title='Global' url={urlGlo} />
            </div>

            { currentTrack ? <Player musicSrc={ "" } /> : "" }

            <Helmet>
                <title>Billboard Rankings</title>
                <meta name="description" content="iTunes Search Engine! Browse Popular Songs of the Week on Billboard Charts! Save Your Favourite Songs into Personal Playlists."/>
            </Helmet>

    </>);
}
