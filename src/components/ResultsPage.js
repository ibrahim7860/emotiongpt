import React from 'react';
import './ResultsPage.css'
import {useLocation} from "react-router-dom";

function ResultsPage() {
    const location = useLocation();
    const emotion = new URLSearchParams(location.search).get('emotion');

    return (
        <div className="container">
            <div>
                <h1>Emotion: {emotion}</h1>
            </div>
        </div>
    );
}

export default ResultsPage;