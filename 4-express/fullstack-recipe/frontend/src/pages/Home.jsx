import React, { useEffect, useState } from 'react'
import Search from '../components/Search'
import { useQuery } from '@tanstack/react-query';
import api from '../constants/api';
import { useDebounce } from '@uidotdev/usehooks';
import Card from '../components/Card';

const Home = () => {

    const [searchTerm, setSearchTerm] = useState();

    // her saniye değil, belirli bir süre beklendiğine istek atan arama parametresi

    // kullanıcı searchterm'ü güncelleyip yarım saniye beklediğinde değiştiren fonksiyon
    const debouncedTerm = useDebounce(searchTerm, 500)
    const [order, setOrder] = useState();

    // API'ya gönderilecek parametreleri belirle
    const params = {
        search: debouncedTerm,
        order
    };


    // api'dan tarif verilerini getir
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["recipes", debouncedTerm, order],
        queryFn: () =>
            api.get('/recipes', { params }).then((res) => res.data.data)
    })

    return (
        <main>
            <Search setSearchTerm={setSearchTerm} />

            <section>
                {
                    isLoading ?
                        <h1>LOADING</h1>
                        : error ?
                        <h1>ERROR</h1>
                        :
                        <>
                            <div className='mt-4'>
                                <h1>{data.length} tarif bulundu</h1>

                                {/* <Sort /> */}
                            </div>

                            <div className="">
                                {
                                    data.map((i)=>(
                                        <Card recipe={i} key={i.id} />
                                    ))
                                }
                            </div>
                        
                        
                        </>
                }
            </section>
        </main>
    )
}

export default Home