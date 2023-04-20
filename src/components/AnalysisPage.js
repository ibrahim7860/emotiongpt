import React, {useState} from 'react';
import './AnalysisPage.css'
import RecordButton from "./RecordButton";
import {Link} from "react-router-dom";

function AnalysisPage() {
    const [dragActive, setDragActive] = React.useState(false);
    const [audioFile, setAudioFile] = useState(null);
    const inputRef = React.useRef(null);

    const handleDrag = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = function(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        handleFiles(file)
    };

    const handleChange = function(e) {
        e.preventDefault();
        const file = e.target.files[0];
        handleFiles(file);
    };

    const handleFiles = (file) => {
        if (file && (file.type === 'video/mp4' || file.type === 'audio/wav')) {
            setAudioFile(file);
        } else {
            setAudioFile(null);
        }
    }

    const onButtonClick = () => {
        inputRef.current.click();
    };

    const handleSetAudioFile = (blob) => {
        const file = new File([blob], 'recorded_audio.wav', { type: 'audio/wav' });
        setAudioFile(file);
    };

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                    <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} accept="audio/wav, video/mp4"/>
                    <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
                        <div>
                            <p style={{fontSize: '35px'}}>Drag and drop your file here or</p>
                            <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
                            {audioFile && <div style={{paddingTop: '20px', fontSize: '20px'}}>{audioFile.name}</div>}
                        </div>
                    </label>
                    { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
                </form>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px'}}>
                <RecordButton onRecordComplete={handleSetAudioFile}/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {audioFile && <Link to="/results"><button className="submit-button" style={{marginTop: '15px'}}>Submit Audio</button></Link>}
            </div>
        </div>
    );
}

export default AnalysisPage;