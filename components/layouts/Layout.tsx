
import Head from "next/head"
import { FC } from "react"
import { Navbar } from "../ui";

interface Props{
    children: JSX.Element,
    title?:string;
    id?:number;
}

const origin = ( typeof window === 'undefined' ) ? '' : window.location.origin;

export const Layout = (props: Props) => {

  const id = props.id || 151; 
  
  return (
    <>
        <Head>
            <title>{ props.title || 'Pokemon App' }</title>
            <meta name="author" content="Joan Giraldo"/>
            <meta name="description" content={`Informacion sobre Pokemon ${props.title}`}/>
            <meta name="keyworkds" content={`${props.title} Pokemon, Pokedex`}/>
            <meta property="og:title" content={`Informacion sobre ${props.title}`} />
            <meta property="og:description" content={`Esta es una pagina sobre ${props.title}`} />
            <meta property="og:image" content={`${origin}/img/banner.png`} />
        </Head>
        <Navbar id={id}/>
        <main>
            { props.children }
        </main>
    </>
  )
}
