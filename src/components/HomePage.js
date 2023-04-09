import React from 'react';
import emotions from './images/emotions.png'
import { Link } from 'react-router-dom'
import './HomePage.css'

function HomePage() {

    return (
        <div className="container">
            <div style={{ padding: '25px 0 10px 0', display: 'flex', justifyContent: 'center' }}>
                <img style={{ maxWidth: '100%', width: '55%', borderRadius: '35px', border: '4px solid black'}} alt="emotion-pic" src={emotions} />
            </div>
            <div style={{padding: '10px', fontSize: '20px', textAlign: 'center'}}>
                <h2>Analyze Your Emotions With EmotionGPT - The Ultimate Emotional Analysis Tool</h2>
                <h2>Record or Upload Audio and Discover The Emotions You Express in Your Voice</h2>
            </div>
            <div style={{textAlign: 'center'}}>
                <Link to="/analysis">
                    <button className="button">Get Started</button>
                </Link>
            </div>
        </div>
    );
}

export default HomePage;