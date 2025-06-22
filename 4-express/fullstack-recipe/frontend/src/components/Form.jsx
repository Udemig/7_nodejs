import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../constants/api'
import { toast } from 'react-toastify'

const Form = ({ id }) => {

    const navigate = useNavigate()


    // eğer düzenleme sayfasındaysak önce inputları doldurmak için bir get isteği atarız ve inputları doldururuz
    const { data } = id ? useQuery({
        queryKey: ['recipe'],
        queryFn: () =>
            api.get(`/recipes/${id}`).then(res => res.data.data)
    }) : ''

    if (data) {
        console.log(data)
    }


    // yeni tarif oluşturma // ID değeri varsa güncelleme api isteği
    const { isLoading, mutate } = useMutation({
        mutationFn: (newRecipe) =>
            // eğer id propu varsa patch isteği at, yoksa post at
            id ?
                api.patch(`/recipes/${id}`,newRecipe)
                :
                api.post('/recipes', newRecipe),

        onSuccess: () => {
            toast.success(id ? 'Tarif başarıyla düzenlendi.' : 'Tarif başarıyla oluşturuldu.'),
                navigate('/')
        },

        onError: () => {
            toast.error('Bir sorun oluştu.')
        }
    })



    const handleSubmit = (e) => {
        e.preventDefault();
        // api isteğini vs. burada halledicez.


        // formumuzu formData formatına çevir
        const formData = new FormData(e.target);
        // formData formatından da düz JS objesi formatına çevir (ki api isteği atabilelim)
        let newRecipe = Object.fromEntries(formData.entries())

        //tarif adımlarını virgüle göre diziye çevir
        newRecipe.instructions = newRecipe.instructions.split(',')

        //malzemelri virgüle göre diziye çevir
        newRecipe.ingredients = newRecipe.ingredients.split(',')

        // api isteği atan mutate fonksiyonunu çalıştır ve parametre olarak da oluşturduğumuz tarifi ver
        mutate(newRecipe)

    }



    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            className='my-5 mx-auto max-w-[550px]'
        >
            <Field
                label='Başlık'
                name='recipeName'
                defaultValue={data?.recipeName}
            />
            <Field
                label='Kategori'
                name='category'
                defaultValue={data?.category}
            />
            <Field
                label='Süre'
                name='recipeTime'
                defaultValue={data?.recipeTime}
            />
            <Field
                label='Tarif Adımları'
                name='instructions'
                long
                comma
                defaultValue={data?.instructions.join(',')}
            />
            <Field
                label='Sunum Önerisi'
                name='servingSuggestion'
                long
                defaultValue={data?.servingSuggestion}
            />
            <Field
                label='Malzemeler'
                name='ingredients'
                long
                comma
                defaultValue={data?.ingredients.join(',')}
            />

            <div className='flex gap-4 justify-center'>
                <Link to='/' className='btn py-2.5'>
                    Geri
                </Link>

                <button
                    className='btn bg-red-400 hover:bg-red-600 cursor-pointer'
                    type='submit'
                >
                    {id ? "Düzenle" : 'Oluştur'}
                </button>
            </div>
        </form >
    )
}

export default Form


const Field = ({ label, name, long, comma, defaultValue }) => {
    return (
        <div className="flex flex-col gap-1 my-3">
            <label className='ml-1'> {label} </label>
            {
                long ?
                    <textarea
                        className='input'
                        placeholder={`${label} giriniz.` +
                            (comma ? '(Virgül ile ayırınız)' : '')}
                        name={name}
                        defaultValue={defaultValue}
                    ></textarea>
                    :
                    <input
                        className='input'
                        name={name}
                        required
                        placeholder={label + ' giriniz...'}
                        defaultValue={defaultValue}
                    />
            }
        </div>
    )
} 