import React from 'react';
import './AboutPage.css'

function AboutPage() {
    return (
        <div className="container">
            <div>
                <div style={{ backgroundColor: '#f8f8f8', padding: '50px' }}>
                    <h2 style={{ color: '#222', fontSize: '30px', fontWeight: 'bold' }}>
                        Discover and Understand Your Emotions Like Never Before
                    </h2>
                    <p style={{ color: '#555', fontSize: '20px', margin: '20px 0' }}>
                        EmotionGPT uses state-of-the-art technology to analyze your voice and uncover the emotions hidden within. Whether you're a performer looking to improve your emotional range or someone interested in understanding your own emotions, EmotionGPT makes it easy to get insights and take action.
                    </p>
                </div>
                <div style={{ backgroundColor: '#fff', padding: '50px' }}>
                    <h2 style={{ color: '#222', fontSize: '30px', fontWeight: 'bold', marginBottom: '20px' }}>Features</h2>
                    <ul style={{ color: '#555', fontSize: '20px', margin: '20px 0' }}>
                        <li>Voice Analysis: EmotionGPT uses advanced machine learning algorithms to analyze voice recordings and identify the emotions expressed.</li>
                        <li>Emotion Categories: EmotionGPT categorizes emotions into different categories, such as happy, sad, angry, or calm, to help users understand their emotions.</li>
                        <li>User-Friendly Interface: EmotionGPT has a simple and intuitive interface that makes it easy for users to upload or record their audio recordings and view the results.</li>
                        <li>Actionable Insights: EmotionGPT provides users with actionable insights and tips on how to improve their emotional expression or performance.</li>
                    </ul>
                </div>
                <div style={{ backgroundColor: '#f8f8f8', padding: '50px' }}>
                    <h2 style={{ color: '#222', fontSize: '30px', fontWeight: 'bold', marginBottom: '20px' }}>Mission and Values</h2>
                    <p style={{ color: '#555', fontSize: '20px', margin: '20px 0' }}>
                        <strong>Mission:</strong> Our mission is to empower individuals to understand and express their emotions in a meaningful way through innovative technology and data-driven insights.
                    </p>
                    <ul style={{ color: '#555', fontSize: '20px', margin: '20px 0' }}>
                        <li><strong>Empathy:</strong> We believe in the power of empathy and emotional intelligence to create positive change in the world.</li>
                        <li><strong>Innovation:</strong> We are committed to using cutting-edge technology to create innovative solutions that help people understand and express their emotions.</li>
                        <li><strong>Accessibility:</strong> We strive to make our technology accessible to everyone, regardless of their background or circumstances.</li>
                        <li><strong>Data Privacy:</strong> We are committed to protecting the privacy and security of our users' data and using it only for the intended purposes.</li>
                    </ul>
                </div>
                <div style={{ backgroundColor: '#fff', padding: '50px' }}>
                    <h2 style={{fontSize: '30px', color: '#222'}}>Team Members: </h2>
                    <p style={{fontSize: '20px', color: '#555'}}>
                        Atmin Sheth <br/>
                        HaoChen Guo <br/>
                        Thao My Tran <br/>
                        Daniel Jones <br/>
                        Ibrahim Ahmed <br/>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;