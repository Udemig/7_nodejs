import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { MdDeleteForever } from 'react-icons/md'
import api from '../constants/api';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';


const DeleteButton = ({ id }) => {

    const navigate = useNavigate();

    // GET isteğinin aksine, DELETE isteği bir sorgu değil, backenddeki veritabanında bir değişiklik (mutasyon / mutation) isteğidir. Dolayısıyla bu isteği atarken useQuery değil useMutation kullanılır.

    const { error, isLoading, mutate } = useMutation({

        mutationFn: () => api.delete(`/recipes/${id}`),

        onSuccess: () => {
            setTimeout(()=>navigate('/'),2000)
            toast.success('Tarif başarıyla silindi.')
        },

        onError: () => {
            toast.error('Tarif silme işlemi başarısız.')
        }
    });

    return (
        <button
            className='btn flex items-center gap-1 bg-red-400 hover:bg-red-600 px-2 rounded-lg min-w-[80px] justify-center cursor-pointer'
            onClick={()=>mutate()}
        >
            <MdDeleteForever />
            Sil
        </button>
    )
}

export default DeleteButton