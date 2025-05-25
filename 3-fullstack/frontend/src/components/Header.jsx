import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (

        <header className='flex justify-between items-center px-5 py-3 shadow border-b'>
            <Link to='/' className='flex items-center gap-2'>
                <img width={40} src='/vite.svg' />
                <h2 className='font-bold text-2xl'>Filmania</h2>
            </Link>

            <Link
                to='/create'
                className='border py-2 px-4 rounded-full bg-white hover:bg-black
        hover:text-white transition'
            >
                Film Oluştur
            </Link>
        </header>
    )
}

export default Header