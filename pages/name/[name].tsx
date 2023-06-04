import { Layout } from '@/components/layouts'
import React, { useState } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { PokemonListResponse, SmallPokemon } from '@/interfaces';
import { Pokemon } from '../../interfaces/pokemon-full';
import { pokeApi } from '@/api';
import Image from 'next/image';
import { getPokemonInfo, localFavorites } from '@/utils';
import confetti from 'canvas-confetti';

interface Props{
    pokemon:Pokemon
}

const PokemonByName: NextPage<Props> = ( {pokemon} ) => {

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
        <Layout title={`Pokemon #${pokemon.id} : ${pokemon.name}`} id={pokemon.id}>
            <div className='w-full min-h-screen h-auto px-4 py-2 bg-gray-900 flex flex-col md:flex-row justify-center items-start justify-items-center gap-3'>
                <div className='w-full md:w-[30%] h-[300px] border-2 border-white rounded-sm hover:rounded-md cursor-pointer flex justify-center items-center justify-items-center p-4'>
                    <Image
                        src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' }
                        alt={`Podemon #${pokemon.id}: ${pokemon.name} image`}
                        width={140}
                        height={140}
                        className='w-auto h-full'
                        priority={true}
                    />
                </div>
                <div className='w-full md:w-[70%] h-auto md:h-[300px] border-2 border-white rounded-sm hover:rounded-md  cursor-pointer text-white flex flex-col justify-center items-start justify-items-center px-4 py-4'>
                    <div className='w-full h-auto flex flex-col md:flex-row justify-between items-center justify-items-center gap-3'>
                        <h3 className=' font-bold text-3xl'> { pokemon.id } : { pokemon.name } </h3>
                        <button onClick={onToggleFavorite} className={`w-auto px-4 py-2 ${isInFavorites ? 'text-white bg-green-500 hover:bg-red-500' : 'text-black bg-white hover:bg-green-500 hover:text-white' } rounded-2 rounded-white text-black font-bold rounded-md`}> { isInFavorites ? 'En Favoritos' : 'Agregar a Favoritos' }  </button>
                    </div>
                    <div className='w-full h-full flex flex-col md:flex-row justify-center items-center justify-items-center'>
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

    const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=151`); 
    const pokemonNames: string[] = data.results.map(pokemon => pokemon.name);

    return {
        paths: pokemonNames.map( name => ({
            params: { name }
        })),
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    
    const { name } = params as { name:string };
    const pokemon = await getPokemonInfo(name);

    if(!pokemon){
        return{
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }

    return {
        props:{
            pokemon:pokemon 
        },
        revalidate:86400,
    }
}

export default PokemonByName;