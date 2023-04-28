import React from 'react';
import './ResultsPage.css'
import {useLocation} from "react-router-dom";

function ResultsPage() {
    const location = useLocation();
    const emotion = new URLSearchParams(location.search).get('emotion');
    const insights = {
        angry: {
            title: 'angry',
            description: 'Practice mindfulness and deep breathing: Take a few deep breaths and count to ten before reacting.\nCommunicate effectively: Use "I" statements instead of blaming others, and listen actively to their perspective.',
            image: "./images/angry.png",
            audio: 'backend\angry.wav'
        },
        disgust: {
            title: 'disgust',
            description: 'Practice self-care and hygiene: Take care of your body and environment to avoid triggering feelings of disgust.\nReframe negative thoughts: Try to find positive aspects in situations that may trigger feelings of disgust.',
            image: ''
        },
        fear: {
            title: 'fear',
            description: 'Challenge negative beliefs: Identify and challenge negative beliefs that may be causing feelings of fear or anxiety.\nTake small steps: Break down goals into smaller, more manageable steps to build confidence and reduce fear.',
            image: ''
        },
        happy: {
            title: 'happiness',
            description: 'Practice gratitude: Write down three things you\'re grateful for each day.\nConnect with others: Spend time with friends and family, or connect with others through social activities.',
            image: ''
        },
        neutral: {
            title: 'neutral',
            description: 'Practice mindfulness: Pay attention to the present moment and avoid distractions.\nTry new experiences: Challenge yourself to try new things and break out of your comfort zone.',
            image: ''
        },
        sad: {
            title: 'sadness',
            description: 'Practice self-care: Take care of your physical and emotional needs, such as getting enough sleep and exercise.\nSeek support: Reach out to friends, family, or a mental health professional for support.',
            image: ''
        },
        pleasant: {
            title: 'pleasant',
            description: 'Practice self-care: Take care of your physical and emotional needs, such as getting enough sleep and exercise.\nEngage in activities you enjoy: Do things that bring you pleasure and happiness, such as hobbies or spending time with loved ones.',
            image: ''
        }
    };

    const insight = insights[emotion];

    return (
        <div style={{ padding: '50px' }}>
            <h2 style={{textTransform: 'capitalize', fontSize: '45px'}}>You are feeling {insight.title}</h2>
            <img src={insights.angry.image} alt="Angry emotion" style={{ width: '100%', height: 'auto', display: 'block' }} />
            <ul style={{ lineHeight: '1.5', paddingLeft: '20px', fontSize: '25px' }}>
                {insight.description.split('\n').map((line, index) => (
                    <li key={index}>{line}</li>
                ))}
            </ul>
            <audio controls>
                <source src={insights.angry.audio} type="audio/mpeg" />
            </audio>
        </div>
    );
}

export default ResultsPage;