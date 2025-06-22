import React from 'react'
import Form from '../components/Form'
import { useParams } from 'react-router'

const Edit = () => {

  const {id} = useParams();


  return (
    <div>
      <h1 className='title'>Tarifi Düzenle</h1>

      <Form id={id}/>
    </div>
  )
}

export default Edit