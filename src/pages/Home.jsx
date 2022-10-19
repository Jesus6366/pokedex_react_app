import React from 'react'
import FormHome from '../components/Home/FormHome'
import "./styles/home.css"

const Home = () => {
    return (
        <article className='pokedex'>
            <img className='pokedex__img' src='/images/home/image12.png' alt="" />
            <header className='pokedex__header'>
                <h2 className='pokedex__subtitle'>Hi Trainer!</h2>
                <p className='pokedex__text'>Give me your name to start</p>
            </header>
            <FormHome />
        </article>
    )
}

export default Home