import { Layout } from '@/components/layouts'
import React, { useState } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { SmallPokemon } from '@/interfaces';
import { Pokemon } from '../../interfaces/pokemon-full';
import { pokeApi } from '@/api';
import Image from 'next/image';
import { getPokemonInfo, localFavorites } from '@/utils';
import confetti from 'canvas-confetti';

interface Props{
    pokemon:Pokemon
}

const PokemonPage: NextPage<Props> = ( {pokemon} ) => {

    const [isInFavorites, setisInFavorites] = useState( localFavorites.existInFavorites(pokemon.id) );

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id);
        setisInFavorites(!isInFavorites)

        if(isInFavorites) return;
        confetti({
            zIndex:999,
            particleCount:200,
            spread:260,
            angle:-100,
            origin:{
                x:1,
                y:0
            }
        })
    }


    return (
        <Layout title={`Pokemon #${pokemon.id} : ${pokemon.name}`}>
            <div className='w-full h-screen px-4 py-2 bg-gray-900 flex flex-col md:flex-row justify-center items-start justify-items-center gap-3'>
                <div className='w-[30%] h-[50%] border-2 border-white rounded-sm hover:rounded-md cursor-pointer flex justify-center items-center justify-items-center p-4'>
                    <Image
                        src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' }
                        alt={`Podemon #${pokemon.id}: ${pokemon.name} image`}
                        width={140}
                        height={140}
                        className='w-auto h-full'
                        priority={true}
                    />
                </div>
                <div className='w-[70%] h-[50%] border-2 border-white rounded-sm hover:rounded-md  cursor-pointer text-white flex flex-col justify-center items-start justify-items-center px-4 py-4'>
                    <div className='w-full h-auto flex justify-between items-center justify-items-center'>
                        <h3 className=' font-bold text-3xl'> { pokemon.id } : { pokemon.name } </h3>
                        <button onClick={onToggleFavorite} className={`w-auto px-4 py-2 ${isInFavorites ? 'text-white bg-green-500 hover:bg-red-500' : 'text-black bg-white hover:bg-green-500 hover:text-white' } rounded-2 rounded-white text-black font-bold rounded-md`}> { isInFavorites ? 'En Favoritos' : 'Agregar a Favoritos' }  </button>
                    </div>
                    <div className='w-full h-full flex justify-center items-center justify-items-center'>
                        <Image
                            src={ pokemon.sprites.front_default }
                            alt={`Podemon #${pokemon.id}: ${pokemon.name} image`}
                            width={140}
                            height={140}
                            className='w-full h-auto'
                            priority={true}
                        />
                            <Image
                            src={ pokemon.sprites.back_default }
                            alt={`Podemon #${pokemon.id}: ${pokemon.name} image`}
                            width={140}
                            height={140}
                            className='w-full h-auto'
                            priority={true}
                        />
                        <Image
                            src={ pokemon.sprites.front_shiny }
                            alt={`Podemon #${pokemon.id}: ${pokemon.name} image`}
                            width={140}
                            height={140}
                            className='w-full h-auto'
                            priority={true}
                        />
                        <Image
                            src={ pokemon.sprites.back_shiny }
                            alt={`Podemon #${pokemon.id}: ${pokemon.name} image`}
                            width={140}
                            height={140}
                            className='w-full h-auto'
                            priority={true}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const pokemons151 = [...Array(151)].map( (value, index) => `${ index + 1 }`);
    
    return {
        paths: pokemons151.map( id => ({
            params: { id }
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    
    const { id } = params as { id:string };
    
    return {
        props:{
            pokemon: await getPokemonInfo(id)
        }
    }
}

export default PokemonPage;