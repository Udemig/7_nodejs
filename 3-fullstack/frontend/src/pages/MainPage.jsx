import React from 'react'
import Hero from '../components/Hero'
import { useQuery } from '@tanstack/react-query'
import api from '../utils/api';
import MovieCard from '../components/MovieCard';
import Error from '../components/Error';
import Loader from '../components/Loader';

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
          <Loader />
          : error ?
            <Error info={error} refetch={refetch} />
            :
            
              <div
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 '
              >
                {
                  data.map((movie)=><MovieCard movie={movie}/>)
                }
              </div>
            

      }
    </div>
  )
}

export default MainPage