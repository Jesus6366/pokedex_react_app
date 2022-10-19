import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./styles/cardPoke.css"

const CardPoke = ({ url }) => {

    const [pokemon, setPokemon] = useState()

    useEffect(() => {

        axios.get(url)
            .then(res => setPokemon(res.data))
            .catch(err => console.log(err))
    }, [])
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/pokedex/${pokemon?.id}`)
    }
    return (
        <article onClick={handleClick} className={`card-poke border-${pokemon?.types[0].type.name}`}>
            <header className={`card-poke__header bg-${pokemon?.types[0].type.name}`}>
                <img className='card-poke__sprite' src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
            </header>
            <section className='card-poke__body'>
                <h3 className={`card-poke__name letter-${pokemon?.types[0].type.name}`}>{pokemon?.name}</h3>
                <ul className='card-poke__types-container'>
                    {
                        pokemon?.types.map(type => (
                            <li key={type.slot} className='card-poke__type'>{type.type.name}</li>
                        ))
                    }
                </ul>
                <p className='card-poke__type-label'>Type</p>
            </section>
            <ul className='card-poke__stats-container'>
                {
                    pokemon?.stats.map(stat => (
                        <li key={stat.stat.name} className='card-poke__stat'>
                            <span className='card-poke__stat-label'>{stat.stat.name}</span>
                            <span className={`card-poke__stat-number letter-${pokemon?.types[0].type.name}`}>{stat.base_stat}</span>
                        </li>
                    ))
                }
            </ul>

        </article>
    )
}

export default CardPoke