import React from 'react'

const Hero = () => {
  return (
    <div className="px-10 py-20 bg-gray-400 text-white">
        <h1 className='text-4xl'>Hoşgeldiniz</h1>
        <h1 className='text-xl font-semibold'>
            Milyonlarca Film, Dizi ve Aktörleri Keşfedin
        </h1>

        <div className="mt-5 flex">
            <input 
            type="text" 
            className='w-full py-2 px-4 text-black placeholder:text-gray-500
            rounded-l-md
            '
            placeholder='Film, dizi veya aktör arayın.'
            />
            <button className='bg-blue-500 px-5 font-semibold
                rounded-r-md hover:bg-blue-700 transition'>
                Ara
            </button>
        </div>
    </div>
  )
}

export default Hero