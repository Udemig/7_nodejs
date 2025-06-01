import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom'
import api from '../utils/api';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Field from '../components/Field';
import ListField from '../components/ListField';
import DeleteButton from '../components/DeleteButton';
import { toast } from 'react-toastify';

const DetailPage = () => {

  const { id } = useParams();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["movie"],
    queryFn: () => api.get(`/api/movies/${id}`).then(res => res.data)
  });


  if (isLoading) return <Loader />

  if (data) console.log(data)

  if (error) return <Error info={error} refetch={refetch} />


  return (
    <div className="p-10">
      <div className="flex justify-end">
        <DeleteButton id={id}/>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">

        {/* resim divimiz */}
        <div>
          <img src={`https://picsum.photos/seed/${data.id}/200/300`}
            alt="poster"
            className='rounded-xl'
          />
        </div>

        {/* başlık divi */}
        <div className="flex flex-col gap-10">
          <div>
            <h1 className='text-3xl font-semibold mb-3'>{data.title}</h1>
            <p>{data.description}</p>
          </div>

          <div className='grid md:grid-cols-2 gap-10'>
            <Field label="Süre" value={data.duration} />

            <Field label="İzleyici Skoru" value={data.rating} />

            <Field label="Yıl" value={data.year} />

            <Field label="Dil" value={data.language} />

            <Field label="Yönetmen" value={data.director} />
          </div>

          <ListField label="Ekip" values={data.cast} />

          <ListField label="Türler" values={data.genre} />

        </div>

      </div>
    </div>
  )
}

export default DetailPage