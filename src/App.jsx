// importing libraries and react stuff
import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CookiesProvider, useCookies } from "react-cookie"

//import { BrowserRouter, Routes, Route } from "react-router-dom"

// i wanted to Mongo DB at first instead of Firebase
//import { MongoClient } from "mongodb"

// pages
import Search from "./Pages/Search"
import Artist from "./Pages/Artist"
import NoPage from "./Pages/NoPage"
import Charts from "./Pages/Charts"
import Profile from "./Pages/Profile"
import Album from "./Pages/Album"
import Landing from "./Pages/Landing/Landing"
import LogIn from "./Pages/LogIn"

// first router system
/*
  <BrowserRouter>
      <Routes>
        <Route index              element={<Search/>}></Route>
        <Route path="/artist/:id" element={<Artist/>} ></Route>
        <Route path='/charts'     element={<Charts/>}></Route>
        <Route path="*"           element={<NoPage/>}></Route>    
      </Routes>
  </BrowserRouter>
*/

// updated router system (2024)
const router = createBrowserRouter([
  {
    path: '/',
    element: <Search></Search>,
    errorElement: <NoPage/>,
    children: [{
      path: '/search/:query',
      element: <Search></Search>
    }],
  },
  {
    path: '/artist/',
    element: <Artist></Artist>,
    children: [{
      path: '/artist/:id',
      element: <Artist></Artist>
    }]
  },
  {
    path: '/charts',
    element: <Charts></Charts>
  },
  {
    path: '/profile',
    element: <Profile></Profile>
  },
  {
    path: '/album/',
    element: <Album></Album>,
    children: [{
      path: '/album/:id',
      element: <Album></Album>
    }]
  },
  {
    path: '/landing',
    element: <Landing></Landing>
  },
  {
    path: '/login',
    element: <LogIn></LogIn>
  },
  //{
  //  path: "*",
  //  element: <NoPage></NoPage>
  //}
])



export default function App() {
  const [user, setUser] = useCookies("user")
  if(user.user == undefined)
    setUser("user", "guest")

  console.log(user)

  return (<>
    <React.StrictMode>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <RouterProvider router={router}></RouterProvider>
      </CookiesProvider>
    </React.StrictMode>
  </>)

}