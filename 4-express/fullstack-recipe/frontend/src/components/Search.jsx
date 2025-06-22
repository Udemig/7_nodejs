import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { BiSearch } from 'react-icons/bi'
import api from '../constants/api'

const Search = ({setSearchTerm}) => {

    


  return (
    <section className='bg-white flex items-center p-3 rounded-lg gap-3 shadow-lg overflow-hidden'>
        <BiSearch className='text-xl'/>

        <input type="text"
        className='w-full outline-none text-zinc-700'
        placeholder='Tarif ismi giriniz...'
        onChange={(e)=>setSearchTerm(e.target.value)}
        />
    </section>
  )
}

export default Search