import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUserNameGlobal } from "../../store/slices/userName.slice"

const FormHome = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const submit = event => {
        event.preventDefault()
        dispatch(setUserNameGlobal(event.target.firstChild.value.trim()))
        navigate("./pokedex")
    }

    return (
        <form onSubmit={submit} className="pokedex__form">
            <input type="text" placeholder='Enter your name' className='pokedex__input' />
            <button className='pokedex__btn'>Catch them all!</button>
        </form>
    )
}

export default FormHome