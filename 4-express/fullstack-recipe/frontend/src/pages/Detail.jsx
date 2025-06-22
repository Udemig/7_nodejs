import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router'
import api from '../constants/api';
import { Link } from 'react-router-dom';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { BiEdit } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import DeleteButton from '../components/DeleteButton';
import { GiKnifeFork } from 'react-icons/gi';
import { BsClock } from 'react-icons/bs';

const Detail = () => {

  // şuanki sayfada olması gereken tarifin IDsini URLden al
  const { id } = useParams();

  // id'sini bildiğimiz elemanın bilgilerini api'dan al

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["recipe"],
    queryFn: () =>
      api.get(`/recipes/${id}`).then(res => res.data.data)
  });

  console.log(data)


  return (

    // isLoading ?
    //   <div>Loading</div>
    //   : error ?
    //     <div>Error</div>
    //     : (
    <div>
      <div className='flex items-center justify-between'>
        <Link to={-1} className='btn flex items-center gap-2 py-1 text-md '>
          <FaRegArrowAltCircleLeft />
          Geri
        </Link>

        <div className=" flex items-center gap-2">
          <Link
            to={`/düzenle/${data?.id}`}
            className='btn flex items-center gap-2'
          >
            <BiEdit />
            Düzenle
          </Link>


          <DeleteButton id={data?.id} />

        </div>
      </div>

      {
        isLoading ?
          (
            <div>Loading</div>
          ) :
          error ?
            (
              <div>Error</div>
            ) :
            <div>
              <h1 className='title text-3xl capitalize'>{data.recipeName}</h1>

              <div className='flex gap-2'>
                <span className='badge'>
                  <GiKnifeFork />
                  {data.category}
                </span>
                <span className='badge'>
                  <BsClock />
                  {data.recipeTime} dakika
                </span>
              </div>

              <img
                src={data.image}
                alt={data.recipeName}
                className='rounded-lg max-h-[350px] w-full object-cover my-4'
              />

              <div className='my-5'>
                <h2 className='title'>Malzemeler</h2>

                <ol className='list-decimal pl-5'>
                  {data.ingredients.map(

                    (i, key) =>

                      <li className='font-medium text-lg' key={key}>
                        {i}
                      </li>

                  )}
                </ol>
              </div>

              <div className='my-5'>
                <h2 className='title'>Hazırlanış</h2>

                <ol className='list-decimal pl-5'>
                  {data.instructions.map(

                    (i, key) =>

                      <li className='font-medium text-lg' key={key}>
                        {i}
                      </li>

                  )}
                </ol>
              </div>

              {
                data.servingSuggestion && (
                  <div className='my-5'>
                    <h2 className='title'>Sunum Önerisi</h2>

                    <p className='text-lg'>
                      {data.servingSuggestion}
                    </p>
                  </div>
                )
              }
            </div>
      }
    </div>
  )
}

export default Detail