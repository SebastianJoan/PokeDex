import Image from "next/image"
import Link from "next/link"

export const Navbar = () => {
    return (
        <nav className="flex justify-evenly justify-items-center items-center bg-gray-800 text-white px-16">
            <Link href="/" className="cursor-pointer">
                <div className="w-1/2 flex justify-start items-center justify-items-center font-bold">
                    <Image
                        src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
                        alt=''
                        width={70}
                        height={70}
                        priority = {true}
                    />
                    <h2 className="text-3xl">P</h2>
                    <h3 className="text-2xl">okémon</h3>
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
