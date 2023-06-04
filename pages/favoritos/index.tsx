import { FavoritePokemons, Navbar, NoFavorites } from '@/components/ui';
import { localFavorites } from '@/utils';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layouts/Layout';

export const FavoritosPage = () => {

  const [favoritePokemons, setfavoritePokemons] = useState<number[]>([]);
  
  useEffect( () => {
     setfavoritePokemons(localFavorites.pokemons())
  }, [] )

  return (
    <>
      <Layout title='Pokemons Favoritos'>
        {
          favoritePokemons.length === 0 
          ? (<NoFavorites/>) 
          : 
          (
            <FavoritePokemons pokemons = {favoritePokemons}/>
          )
        }
      </Layout>
    </>
  )
}

export default FavoritosPage;