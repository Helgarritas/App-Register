
import { Routes, Route } from "react-router-dom"
// Components
import { Toaster } from "./components/ui/toaster"
import Auth from "./page/Auth/Auth"
import Home from "./page/Home/Home"

function App() {
  return (
    <>
      <Routes>
        <Route path={'/'} element={ <Auth/> }/>
        <Route path={'/home'} element={ <Home/> }/>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
