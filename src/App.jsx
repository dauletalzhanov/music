import { ReactDOM } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Search from "./Pages/Search"
import Artist from "./Pages/Artist"
import NoPage from "./Pages/NoPage"


function App() {

  return (<>
    <BrowserRouter>
      <Routes>
        <Route index element={<Search/>}></Route>
        <Route path="/artist/:id" styles='./Pages/artist.css' element={<Artist/>} ></Route>
        <Route path="*" element={<NoPage/>}></Route>
        
      </Routes>
    </BrowserRouter>
  </>)
}

export default App
