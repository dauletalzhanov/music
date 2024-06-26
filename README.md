# Music Catalogue
Links:
- [Website (Vercel)](https://smoky-music.vercel.app/)
- [Website (Netlify)](https://smoky-music.netlify.app/)


Web Application themed around music where you can:
- Browse artists, albums and songs.
- Save songs into a personal playlist
- Browse popular charts from billboards: Top Songs, Top Albums, Top Songs Globally
- Play music!

## Figma
- [Wireframes - Figma Link](https://www.figma.com/file/7IF7jA9pTjnaRbCxaD7PFt/MUSIC?type=design&node-id=0%3A1&mode=design&t=hEiavYoXwH2cQrqQ-1 )
- [User Flow and User Stories - FigJam](https://www.figma.com/file/kA4iYdeiksnQHSevGY2PxU/Music?type=whiteboard&t=q3FVA1RO74xrnEGe-1)

Additional Research Process:
- Personas
- User Journeys
- Information Architecture Map
- Survey about UX / UI design for album and artist pages

## Technical Aspects
Web application was made using:
- React
- Vite
- HTML, CSS, Javascript with .jsx extension

React Sublibraries:
- React-Router-Dom
- React-Helmet
- React-Cookies
- Redux Toolkit

Third Party Tools and Libraries:
- Firebase DB
- iTunes API
- Giphy API

## Assists
Had help from:
- Used [Box-Shadow](https://www.cssmatic.com/box-shadow) to preview box shadow values.
- [HTML color picker](https://htmlcolorcodes.com/color-picker/) to pick color for Figma. Was not helpful honestly.
- Google Fonts

## Music Player
Music player was built using:
- Audio element and react component
- Redux for storing current time

## How to Install
Probably not possible because of the custom .env file which requires Giphy Api key and the Firebase Config ¯\_(ツ)_/¯

Install:
- git clone this repo
- npm install
- request for the .env file
- put the .env file in the main directory
- npm run dev for development mode
- npm run build > npm run preview for production mode
