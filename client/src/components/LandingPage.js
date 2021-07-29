import React from 'react';
import { NavLink } from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage(){
    return (
        <div>
            <div className='background-image'></div>
            <div className='buttonContainer'>
                <NavLink to='/home'>
                    <button className="glow-on-hover">Welcome!</button>
                </NavLink>
            </div>
        </div>
        
    )
}