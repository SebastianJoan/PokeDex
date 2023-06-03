
import Head from "next/head"
import { FC } from "react"
import { Navbar } from "../ui";

interface Props{
    children: JSX.Element,
    title?:string;
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
        <Head>
            <title>{ title || 'Pokemon App' }</title>
            <meta name="author" content="Joan Giraldo"/>
            <meta name="description" content={`Informacion sobre Pokemon ${title}`}/>
            <meta name="keyworkds" content={`${title} Pokemon, Pokedex`}/>
        </Head>
        <Navbar/>
        <main>
            { children }
        </main>
    </>
  )
}
