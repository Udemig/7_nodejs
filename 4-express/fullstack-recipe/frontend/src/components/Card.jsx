import React from 'react'
import { TbClockHour10 } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const Card = ({recipe}) => {
  return (
    <Link to={`/tarif/${recipe.id}`} className='p-4 rounded-lg'>
        <div className="relative p-2">
            <img 
                src={recipe.image}
                alt={recipe.recipeName}
                className='rounded-lg h-[150px] w-full object-cover m-1'
            />

            <p className='flex items-center mt-2 font-semibold gap-2 absolute bottom-4 left-4 text-white'>
                <TbClockHour10 />
                <span>{recipe.recipeTime} dakika</span>
            </p>

            <p className='flex items-center mt-2 font-semibold gap-2 absolute bottom-4 right-4 text-white'>
                <TbClockHour10 />
                <span>{recipe.ingredients.length} malzeme</span>
            </p>

        </div>

        <h2 className='ml-4 mb-3 text-xl font-semibold capitalize'>{recipe.recipeName}</h2>
    </Link>
  )
}

export default Card