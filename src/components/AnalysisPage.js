import React, {useState} from 'react';
import './AnalysisPage.css'



function AnalysisPage() {
    const [audioFile, setAudioFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file)
    };

    const handleFile = (file) => {
        if (file && (file.type === 'video/mp4' || file.type === 'audio/wav')) {
            setAudioFile(file);
        } else {
            setAudioFile(null);
        }
    }

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        handleFile(file);
    };
    const handleStopButtonClick =() =>{
        //this is a sub function to stop record
    }
    const handleRecordButtonClick = () => {
        // Handle recording functionality here
    };

    return (
        <div className="container">
            <div className="audio-input-container">
                <label htmlFor="audio-file-input" style={{ margin: '45px 0 20px 0', fontSize: '25px' }}>
                    Upload or drag audio file (MP4 or WAV):
                </label>
                <div
                    className={`choose-file-button${isDragging ? ' dragging' : ''}`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                </div>
                <input
                    type="file"
                    accept="video/mp4, audio/wav"
                    onChange={handleFileInputChange}
                    className="audio-file-input"
                    id="audio-file-input"
                />
                <button className="record-audio-button" onClick={handleRecordButtonClick}>Record Audio</button>
                <button className="stop-audio-button" onClick={handleStopButtonClick}>Stop Audio</button>
            </div>
        </div>
    );
}

export default AnalysisPage;