import { SmallPokemon } from "@/interfaces"
import Image from "next/image"
import { useRouter } from "next/router";
import { FC } from "react";

interface Props{
    pokemons:SmallPokemon;
}

export const PokemonCard: FC<Props> = ({ pokemons }) => {
    
    const router = useRouter();
    const onClick = () => {
        router.push(`/name/${pokemons.name}`)
    }


    return (
    <div onClick = { onClick } className='cursor-pointer hover:bg-white hover:text-black transition duration-700 ease-out rounded-md hover:rounded-lg  w-auto h-auto flex flex-col justify-start items-center justify-items-center border-2 border-white text-white font-bold py-2'>
        <div className='w-full h-[90%] flex justify-center items-center justify-items-center p-4'>
            <Image
                src={pokemons.img}
                alt={`${pokemons.name} image`}
                width={140}
                height={140}
                priority={true}
                className='w-auto h-full'
            />
        </div>
        <div className='w-full h-[10%] flex justify-center items-center justify-items-center'>
            {pokemons.id} - {pokemons.name}
        </div>
    </div>
  )
}
