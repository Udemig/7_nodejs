import React from 'react'
import { Link } from 'react-router-dom'

const MovieCard = ({ movie }) => {

    const r = movie.rating;

    const color = r > 9 ? "green" : r > 7.5 ? "greenyellow" : r > 5 ? "orange" : "red"

    return (
        <Link to={`/movie/${movie.id}`} className='flex p-4 m-4 border shadow rounded-md'>
            <div className="relative">
                <img
                    src={`https://picsum.photos/seed/${movie.id}/200/300`}
                    className='rounded-lg border border-gray-800'
                    alt='poster'
                />

                <span className={`absolute right-[-15px] top-[-15px] h-8 w-8 rounded-full bg-[${color}] flex items-center justify-center font-bold text-white`}>
                    {movie.rating}
                </span>
            </div>

            <div className="flex flex-col justify-between pl-6">
                <h3 className='text-xl font-bold'>
                    {movie.title}
                </h3>

                <div className='flex flex-col gap-5'>
                    <p>{movie.year}</p>
                    <p className='flex gap-2 flex-wrap'>
                        {
                            movie.genre.map((genre)=>(
                                <span
                                    className='bg-gray-200 py-1 px-2 rounded-md'
                                >{genre}</span>
                            ))
                        }
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default MovieCard