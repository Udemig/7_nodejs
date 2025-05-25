import React from 'react'
import Hero from '../components/Hero'
import { useQuery } from '@tanstack/react-query'
import api from '../utils/api';
import MovieCard from '../components/MovieCard';

const MainPage = () => {


  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["movies"],
    queryFn: () => api.get('/api/movies').then((res) => res.data)
  })


  return (
    <div>
      <Hero />

      {
        isLoading ?
          <h1 className='text-4xl'>LOADING</h1>
          : error ?
            <h1 className='text-4xl text-red-600'>
              {error.message}
            </h1>
            :
            
              <div>
                {
                  data.map((movie)=><MovieCard movie={movie}/>)
                }
              </div>
            

      }
    </div>
  )
}

export default MainPage