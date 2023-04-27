import React from 'react';
import './AboutPage.css'

function AboutPage() {
    return (
        <div className="container">
            <div style={{padding: '25px', fontSize: '20px',}}>
                <h2 >Value Proposition: </h2>
                <p>
                Unique – First emotion tester for human by machine.<br/>
                Flexible – Easy to use and understand, unlimited.<br/>
                Diverse – For all human-being, all language, all group.<br/>
                </p>
                <h2 >Features: </h2>
                <p>
                Intelligent – Thinking like human, get the emotion from human by their words, speed and tone.<br/>
                Emotion Learning Machine – The beginning of machine learning emotion from human.<br/>
                Adaptive Learning – Emotion-GPT will learn by input and get more and more data by users.<br/>

                </p>
                <h2 >Missions and Values: </h2>
                <p>
                Criminology and Psychology – Get the emotion from the criminal or the patients.<br/>
                Disability – Better understand the emotion of people who has language disability.<br/>
                Future – Help Artificial Intelligent learning emotion from human and may be set up the emotion for AI.<br/>
                </p>
                <h2>Team Members: </h2>
                <p>
                   Atmin Sheth <br/>
                   HaoChen Guo <br/>
                   Thao My Tran <br/>
                   Daniel Jones <br/>
                   Ibrahim Ahmed <br/>
                </p>
            </div>
        </div>
    );
}

export default AboutPage;