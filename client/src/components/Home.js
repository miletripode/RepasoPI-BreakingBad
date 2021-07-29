import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getAllCharacters } from '../actions/actions';
import {NavLink} from 'react-router-dom';
import { BiRefresh } from "react-icons/bi";
import Card from './Card'
import './Home.css'

export default function Home(){

    const dispatch = useDispatch();

    const allCharacters = useSelector(state => state.characters)

    const [loading, setLoading] = useState(false);

    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        dispatch(getAllCharacters(), 
        setLoading(true),
        setTimeout(()=>{setLoading(false);},5000))
    }, [])

    function handleOnClick(e){
        e.preventDefault();
        dispatch(getAllCharacters())
    }

    return (
        <div className={darkMode ? "dark-mode" : "light-mode"}>
            <div className="containerHome">
                <span style={{ color: darkMode ? "#c96dfd" : "grey" }}>☾</span>
                <div className="switch-checkbox">
                <label className="switch">
                    <input type="checkbox" onChange={() => setDarkMode(!darkMode)} />
                    <span className="slider round"> </span>
                </label>
                </div>
                <span style={{ color: darkMode ? "grey" : "yellow" }}>☀︎</span>
            </div>
            <div>
                <NavLink className='nav-link' to='/create'>Create Character</NavLink>
                <button onClick={e => handleOnClick(e)} className='btnRefresh'><BiRefresh/></button>
            <div>
            <div>
                <select>
                    <option value='az'>A-Z</option>
                    <option value='za'>Z-A</option>
                </select>
                <select>
                    <option value='status'>Status</option>
                    <option value='created'>Created</option>
                    <option value='existing'>Existing</option>
                </select>
            </div>
            </div>
                { loading ? ( <div class="loading"></div>) : 
                (allCharacters && allCharacters.map(a => 
                <Card img={a.image} name={a.name} nickname={a.nickname}/>
                ))}
            </div>
        </div>
    )
}