import Image from 'next/image'
import React from 'react'

export const NoFavorites = () => {
  return (
    <div className='w-full h-screen bg-gray-800 px-4 py-4 flex flex-col justify-center items-center justify-items-center gap-3'>
        <Image
            src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg'}
            alt='pokemon image'
            width={240}
            height={240}
            priority={true}
        />
        <h3 className='w-auto h-auto p-4 font-bold text-white text-2xl'> Sin favoritos </h3>
    </div>
  )
}
