import { pokeApi } from '@/api';
import { Pokemon } from '@/interfaces';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC } from 'react'

interface Props{
    pokemons:number[];
}

export const FavoritePokemons: FC<Props> = ({ pokemons }) => {

    const router = useRouter();

    const onFavoriteClicked = async (id:number) => {
        const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`)
        router.push(`/name/${data.name}`)
    }

    return (
        <div className='w-full min-h-screen h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-gray-900 p-4'>
            {
            pokemons.map( id => (
                <div key={id} onClick={ () => onFavoriteClicked(id) } className='cursor-pointer w-auto h-[300px] hover:bg-white hover:text-black transition duration-700 ease-out rounded-md hover:rounded-lg  flex flex-col justify-start items-center justify-items-center border-2 border-white text-white font-bold py-2'>
                    <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                        alt="pokemon image"
                        width={140}
                        height={140}
                        priority={true}
                        className='w-auto h-full'
                    />
                </div>
            ))
            }
        </div>
    )
}

export default FavoritePokemons;