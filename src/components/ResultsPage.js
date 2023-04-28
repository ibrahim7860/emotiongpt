import React from 'react';
import './ResultsPage.css'
import {useLocation} from "react-router-dom";
import angry from './images/angry.png'
import disgust from './images/disgust.png'
import fear from './images/fear.png'
import happy from './images/happy.png'
import neutral from './images/neutral.png'
import sad from './images/sad.png'
import pleasant from './images/pleasant.png'

function ResultsPage() {
    const location = useLocation();
    const emotion = new URLSearchParams(location.search).get('emotion');
    const insights = {
        angry: {
            title: 'angry',
            description: 'Practice mindfulness and deep breathing: Take a few deep breaths and count to ten before reacting.\nCommunicate effectively: Use "I" statements instead of blaming others, and listen actively to their perspective.\nPractice empathy: Try to see the situation from the other person\'s perspective and understand their feelings.\nTake a break: If you feel yourself getting too worked up, take a break and step away from the situation for a few minutes.',
            image: angry
        },
        disgust: {
            title: 'disgust',
            description: 'Practice self-care and hygiene: Take care of your body and environment to avoid triggering feelings of disgust.\nReframe negative thoughts: Try to find positive aspects in situations that may trigger feelings of disgust.\nReframe the situation: Try to find a positive aspect in the situation that may trigger feelings of disgust.\nEngage in pleasurable activities: Doing something you enjoy can help reduce feelings of disgust.',
            image: disgust
        },
        fear: {
            title: 'fear',
            description: 'Challenge negative beliefs: Identify and challenge negative beliefs that may be causing feelings of fear or anxiety.\nTake small steps: Break down goals into smaller, more manageable steps to build confidence and reduce fear.\nPractice relaxation techniques: Deep breathing, meditation, or progressive muscle relaxation can help reduce feelings of fear and anxiety.\nPractice positive self-talk: Replace negative thoughts with positive ones to reduce fear and build confidence.',
            image: fear
        },
        happy: {
            title: 'happiness',
            description: 'Practice gratitude: Write down three things you\'re grateful for each day.\nConnect with others: Spend time with friends and family, or connect with others through social activities.\nPractice mindfulness: Pay attention to the present moment and avoid distractions to fully enjoy your happiness.\nGive back: Doing something kind for others can increase feelings of happiness and satisfaction.',
            image: happy
        },
        neutral: {
            title: 'neutral',
            description: 'Practice mindfulness: Pay attention to the present moment and avoid distractions.\nTry new experiences: Challenge yourself to try new things and break out of your comfort zone.\nPractice gratitude: Take time to appreciate the good things in your life, no matter how small.\nConnect with others: Spending time with friends and loved ones can help bring a sense of purpose and meaning to life.',
            image: neutral
        },
        sad: {
            title: 'sadness',
            description: 'Practice self-care: Take care of your physical and emotional needs, such as getting enough sleep and exercise.\nSeek support: Reach out to friends, family, or a mental health professional for support.\nPractice self-compassion: Be kind and compassionate to yourself, especially during difficult times.\nEngage in physical activity: Exercise has been shown to improve mood and reduce feelings of sadness.',
            image: sad
        },
        pleasant: {
            title: 'pleasant',
            description: 'Practice self-care: Take care of your physical and emotional needs, such as getting enough sleep and exercise.\nEngage in activities you enjoy: Do things that bring you pleasure and happiness, such as hobbies or spending time with loved ones.\nPractice self-care: Take care of your physical and emotional needs, such as getting enough sleep and eating healthy foods.\nCultivate positive relationships: Surround yourself with people who bring positivity and happiness into your life.',
            image: pleasant
        }
    };

    const insight = insights[emotion];

    return (
        <div style={{ padding: '0 50px 0 50px', height: '92vh', fontFamily: 'Lato, sans-serif' }}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <h2 style={{textTransform: 'capitalize', fontSize: '45px'}}>You are feeling {insight.title}</h2>
                <img src={insight.image} alt="Emotion picture" style={{ width: '30%', height: '30%' }} />
            </div>
            <ul style={{ lineHeight: '1.5', paddingLeft: '20px', fontSize: '25px' }}>
                {insight.description.split('\n').map((line, index) => (
                    <li key={index}>{line}</li>
                ))}
            </ul>
        </div>
    );
}

export default ResultsPage;