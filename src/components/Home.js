import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home(props) {

    const [input, setInput] = useState('');
    const [submit, setSubmit] = useState(input);
    const [poke, setPoke] = useState('');
    const [pokeImg, setPokeImg] = useState('');
    const [pokeType, setPokeType] = useState('');
    const [paginate, setPaginate] = useState(1);

    useEffect(() => {
        if (submit) {
            axios.get('https://pokeapi.co/api/v2/pokemon/' + submit)
                .then(res => res)
                .then(res => {
                    setPoke(res.data.name)
                    setPokeImg(res.data.sprites.front_default)
                    setPokeType(res.data.types[0].type.name)
                })
        }
        if (!submit) {
            axios.get('https://pokeapi.co/api/v2/pokemon/' + paginate)
                .then(res => res)
                .then(res => {
                    setPoke(res.data.name)
                    setPokeImg(res.data.sprites.front_default)
                    setPokeType(res.data.types[0].type.name)
                })
        }
    }, [submit, paginate])

    const onChangeHandler = (event) => {
        setInput(event.target.value)
    }

    const submitHandler = () => {
        setSubmit(input)
    }

    return (
        <div className='home-container'>
            <div>
                <input type='text' onChange={onChangeHandler} value={input} />
                <button onClick={submitHandler}>Search</button>
                <p>Entered input : {input}</p>
                <div className='poke-card'>
                    <h2>Name - {poke.toUpperCase()}</h2>
                    <h2>Type - {pokeType.toUpperCase()}</h2>
                    <img src={pokeImg} alt='poke' className='pokemon-img-size' />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 20 }}>
                    {
                        paginate <= 1 ?
                            <button disabled>Prev</button> :
                            <button onClick={() => { setSubmit(0); setPaginate(paginate - 1) }}>Prev</button>
                    }
                    <button onClick={() => { setSubmit(0); setPaginate(paginate + 1) }}>Next</button>
                </div>
            </div>
        </div >
    );
}

export default Home;    