import React, { useState, useRef } from 'react';
import './RecordButton.css'

function RecordButton(props) {
    const [recording, setRecording] = useState(false);
    const [recordedAudio, setRecordedAudio] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioRef = useRef(null);

    const startRecording = async () => {
        setRecordedAudio(false)
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
        mediaRecorderRef.current.start();
        setRecording(true);
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setRecording(false);
    };

    const handleDataAvailable = (event) => {
        const blob = new Blob([event.data], { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setRecordedAudio(url);
        props.onRecordComplete(blob);
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{flexDirection: 'column'}}>
                <button onClick={recording ? stopRecording : startRecording} className="record-button">
                    {recording ? 'Stop Recording' : 'Start Recording'}
                </button>
                {recording && <p style={{fontSize: '20px', textAlign: 'center'}}>Recording...</p>}
            </div>
            {recordedAudio && <audio style={{marginLeft: '15vh'}} controls ref={audioRef} src={recordedAudio} />}
        </div>
    );
}

export default RecordButton;


