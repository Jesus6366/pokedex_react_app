import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Pokemon404 from '../components/pokedexbyid/Pokemon404'
import "./styles/pokedexbyid.css"

const PokedexById = () => {

    const { id } = useParams()

    const [pokemon, setPokemon] = useState()
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
        axios.get(URL)
            .then(res => setPokemon(res.data))
            .catch(err => {
                console.log(err)
                setHasError(true)
            })
    }, [])

    console.log(pokemon)

    if (hasError) {
        return <Pokemon404 />
    }



    return (
        <article className='pokedexbyid__main'>
            <header>
                <div className='pokedex__background'>
                    <img className='pokedex__img-header' src='/images/home/image12.png' alt="" />
                    <button className='pokedexbyid__button' href='/#/pokedex'><a href='/#/pokedex'>Go Back! </a></button>
                </div>
            </header>
            <div className='pokedexbyid__section-header'>
                <section className={`pokedexbyid__header bg-${pokemon?.types[0].type.name}`}>
                    <img className='pokedexbyid__pokemon-img bg-${pokemon?.types[0].type.name}' src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
                    <h2 className={`pokedexbyid__number letter-${pokemon?.types[0].type.name}`}>#{pokemon?.order}</h2>
                    <h3 className={`card-poke__name letter-${pokemon?.types[0].type.name}`}>{pokemon?.name}</h3>
                    <div className='pokedexbyid__body'>
                        <p className='pokedexbyid__weight'>Weigth: <span>{pokemon?.weight}</span></p>
                        <p className='pokedexbyid__height'>Height: <span>{pokemon?.height}</span></p>
                    </div>
                </section>
                <section >
                    <h3 className='pokedexbyid__type '>Type </h3>
                    <ul className='card-poke__types-container '>
                        {
                            pokemon?.types.map(type => (
                                <li key={type.slot} className='card-poke__type '>{type.type.name}</li>
                            ))
                        }
                    </ul>
                    <h3 className='pokedexbyid__stats'>Stats</h3>
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
                </section>
                <h3 className='pokedexbyid__movements'>Movements:</h3>
                <div className='pokedexbyid__box'>

                    <ul className={`pokedexbyid__ul letter-${pokemon?.types[0].type.name}`}>
                        {
                            pokemon?.moves.map(move => (
                                <li className='pokedexbyid__li' key={move.move.name}>{move.move.name}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </article >

    )
}

export default PokedexById