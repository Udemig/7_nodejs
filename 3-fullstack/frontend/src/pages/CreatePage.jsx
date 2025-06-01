import React from 'react'
import InputField from '../components/InputField'
import { inputs } from '../utils/constants'
import api from '../utils/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CreatePage = () => {


  const navigate = useNavigate();


  const handleSubmit = (e) => {

    e.preventDefault();

    // input verilini nesne şeklinde alma

    const formData = new FormData(e.target);
    const movieData = Object.fromEntries(formData.entries())

    // genres'ı diziye çevir
    movieData.genre = movieData.genre.split(',')
    // cast'i diziye çevir
    movieData.cast = movieData.cast.split(',')

    // api'a film oluşturma isteği at
    api
    .post('/api/movies', movieData)
    .then((res)=>{
      //bildirim yayınla
      toast.success('Film başarıyla veritabanına eklendi.')
      console.log(res)

      navigate(`/movie/${res.data.id}`)
    })
    .catch(err=>{
      console.log(err);
      toast.error(err.response ? err.response.data : err.message)
    })
  }


  return (
    <div className="min-h-screen bg-yellow-400 flex items-center justify-center px-5 py-5">
      <div className="bg-white w-full max-w-[600px] p-10 rounded-xl shadow-lg">

        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <h1 className='text-center text-2xl font-semibold'>Yeni Film Oluştur</h1>
          
          {/* inputlar */}
          {
            inputs.map((props)=><InputField {...props}/>)
          }

          <button className='border py-3 px-4 rounded-lg bg-green-500 text-white'>
            Oluştur
          </button>

        </form>

      </div>
    </div>
  )
}

export default CreatePage