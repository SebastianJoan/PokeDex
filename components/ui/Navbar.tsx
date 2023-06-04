import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

interface Props{
    id?:number
}

export const Navbar = (props:Props) => {
    return (
        <nav className="w-full h-[10vh]  flex justify-evenly justify-items-center items-center bg-gray-800 text-white px-2 md:px-16">
            <Link href="/" className="cursor-pointer w-1/2 h-full py-2">
                <div className="w-1/2 h-full flex justify-center items-center justify-items-center font-bold gap-3">
                    <div className="w-auto h-full ">
                        <Image
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.id}.svg`}
                            alt='pokemon image'
                            width={70}
                            height={70}
                            priority = {true}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex justify-center items-center justify-items-center">
                        <h2 className="text-3xl">P</h2>
                        <h3 className="text-2xl">okémon</h3>
                    </div>
                </div>
            </Link>
            <div className="w-1/2 flex justify-end items-center justify-items-center font-bold">
                <Link href="/favoritos">
                    <h4 className="text-2xl">Favoritos</h4>
                </Link>
            </div>
        </nav>
    )
}
