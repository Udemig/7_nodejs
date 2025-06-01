import React from 'react'

const InputField = ({name,label,type = "text",min,max}) => {
  return (
    <div className='w-full relative'>
        <input
            className='block px-2.5 pb-2.5 border border-gray-300 text-gray-900 bg-transparent rounded-lg appearance-none
            focus:outline-none focus:ring-0 focus:border-blue-600
            w-full peer h-10 pt-2
            '
            type={type}
            id={name}
            name={name}
            required
            placeholder=' '
            min={min}
            max={max}
        />

        <label htmlFor={name}
            className='
            absolute 
            text-sm 
            text-gray-500 
            duration-300 
            transform 
            scale-75
            -top-2
            z-10 
            origin-[0] 
            bg-white 
            px-2

            peer-focus:text-blue-600
            peer-focus:top-2
            peer-focus:-translate-y-4
            peer-focus:scale-75

            peer-placeholder-shown:scale-100
            peer-placeholder-shown:-translate-y-1/2
            peer-placeholder-shown:top-1/2

            rtl:peer-focus:translate-x-1/4
            rtl:peer-focus:left-auto
            start-1
            '
        >
            {label}
        </label>

    </div>
  )
}

export default InputField