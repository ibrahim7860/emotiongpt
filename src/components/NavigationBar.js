import React from 'react';
import {Link} from "react-router-dom";

function NavigationBar() {
    return (
        <div>
            <div style={{height: '8vh', width: '100%', display: 'flex', alignItems: 'center', padding: '5px 15px 0 0', backgroundColor: '#BEA9DF', fontFamily: 'Space Mono, monospace'}}>
                <Link to="/" style={{color: '#000000', textDecoration: 'none', marginRight: '10%'}}><h1 style={{margin: '0 13% 0 25px', fontSize: '50px', padding: '0 60px 10px 0'}}>EmotionGPT</h1></Link>
                <Link style={{fontSize: '25px', marginRight: '15%', color: '#000000', textDecoration: 'none'}} to="/">Home</Link>
                <Link style={{fontSize: '25px', marginRight: '15%', color: '#000000', textDecoration: 'none'}} to="/about">About</Link>
                <Link style={{fontSize: '25px', color: '#000000', textDecoration: 'none'}} to="/analysis">Analysis</Link>
            </div>
        </div>
    );
}

export default NavigationBar;