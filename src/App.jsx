import React, { ReactDOM } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Search from "./Pages/Search"
import Artist from "./Pages/Artist"
import NoPage from "./Pages/NoPage"
import Charts from "./Pages/Charts"

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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Search></Search>,
    errorElement: <NoPage/>
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

  //{
  //  path: "*",
  //  element: <NoPage></NoPage>
  //}
])

function App() {

  return (<>
    <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
  </>)

}

export default App
