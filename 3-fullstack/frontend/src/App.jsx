import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainPage from "./pages/MainPage"
import CreatePage from "./pages/CreatePage"
import DetailPage from "./pages/DetailPage"
import Header from "./components/Header"

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/create" element={<CreatePage/>} />
        <Route path="/movie/:id" element={<DetailPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
