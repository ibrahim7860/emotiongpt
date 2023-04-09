import React from 'react';
import './AboutPage.css'

function AboutPage() {
    return (
        <div className="container">
            <div style={{padding: '25px', fontSize: '20px',}}>
                <h2 style={{paddingBottom: '75px'}}>Value Proposition: </h2>
                <h2 style={{paddingBottom: '75px'}}>Features: </h2>
                <h2 style={{paddingBottom: '75px'}}>Missions and Values: </h2>
                <h2 style={{paddingBottom: '75px'}}>Team Members: </h2>
                <h2>Contact Info: </h2>
            </div>
        </div>
    );
}

export default AboutPage;