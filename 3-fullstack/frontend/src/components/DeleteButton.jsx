import React from 'react'
import { IoTrashSharp } from 'react-icons/io5';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DeleteButton = ({id}) => {

    const navigate = useNavigate();

    const handleDelete = () => {
        // filmi silme isteği at

        api
        .delete(`/api/movies/${id}`)
        .then(res=>{
            console.log(res);
            navigate('/')
            toast.warning('Film kaldırıldı.')
        })
        .catch(err=>console.log(err))
    }



    return (
        <button
            onClick={handleDelete}
            className='p-2 bg-red-700 text-white rounded-md text-xl hover:bg-red-400 transition'
        >
            <IoTrashSharp />
        </button>
    )
}

export default DeleteButton