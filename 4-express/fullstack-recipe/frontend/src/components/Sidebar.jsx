import React from 'react'
import { NavLink } from 'react-router-dom'
import { links } from '../constants/links'

const Sidebar = () => {
    return (
        <aside className='flex flex-col h-screen justify-between items-center md:px-3 py-3 max-md:gap-20 max-md:justify-normal'>
            {/* logo */}
            <img
                src="/r_logo.jpg"
                alt="logo"
                className='max-w-[80px] md:max-w-[150px]'
            />

            {/* linkler */}
            <nav className='flex flex-col gap-20'>
                {
                    links.map(
                        (link, key) => (
                            <NavLink
                                key={key}
                                to={link.path}
                                className="flex gap-4 items-center text-lg text-gray-400"
                            >
                                <span className='max-md:text-2xl'>{link.icon}</span>
                                <span className='max-md:hidden'>{link.title}</span>
                            </NavLink>
                        )
                    )
                }
            </nav>


            <div className="flex flex-col gap-2 max-md:hidden">
                <p className='font-semibold'>Günlük Haberleri Al</p>
                <button className='bg-red-500 p-2 rounded-lg text-white hover:bg-red-400 transition'>
                    Abone Ol
                </button>

            </div>
        </aside>
    )
}

export default Sidebar