import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Edit from './pages/Edit'
import Add from './pages/Add'
import NotFound from './pages/NotFound'
import Sidebar from './components/Sidebar'

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex">

        <Sidebar />

        <div className="flex-1 bg-gray-200 p-5">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/tarif/:id' element={<Detail />} />
            <Route path='/düzenle/:id' element={<Edit />} />
            <Route path='/ekle' element={<Add />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </div>


      </div>
    </BrowserRouter>
  )
}

export default App