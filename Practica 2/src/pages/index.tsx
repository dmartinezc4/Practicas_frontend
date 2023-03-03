import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Formulario from "@/components/formulario"
import Grid from "@/components/grid"
import clearConst from "@/components/formulario"
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })






export default function Home() {
  return (
    <>
    <Link href="/table"> Ir a la tabla</Link><br/>
    </>
  )
}

//El botón de Remove Top Row hace que se quite la primera fila del grid