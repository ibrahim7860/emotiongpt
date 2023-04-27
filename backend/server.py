from flask import Flask, request, render_template, redirect, url_for
from keras.models import load_model
import librosa
import numpy as np
import tensorflow as tf

app = Flask(__name__, template_folder='templates')

# Load the Keras model and define the emotions_to_labels dictionary
model = load_model('model.h5')
emotions_to_labels = {'angry': 0, 'disgust': 1, 'fear': 2, 'happy': 3, 'neutral': 4, 'sad': 5, 'pleasant': 6}

def resize_extract(audio_wav):
    new_check_audio, new_check_sr = librosa.load(audio_wav, sr=None, mono=True)
    # Extract Mel spectrogram features
    check_mel_spec = librosa.feature.melspectrogram(y=new_check_audio, sr=new_check_sr, n_fft=2048, hop_length=512, n_mels=128)
    check_mel_spec = librosa.power_to_db(check_mel_spec, ref=np.max)
    # Resize to 128x128
    check_mel_spec.resize((128,128), refcheck=False)
    # Resize for model
    check_mel_spec = check_mel_spec.reshape(-1,128,128,1)
    return check_mel_spec

def get_label(check_mel_spec):
    result = model.predict(check_mel_spec)
    prob_arr = np.array(result)
    np.set_printoptions(precision=10, suppress=True)
    max_val = np.max(prob_arr)
    max_index = np.argmax(prob_arr)
    max_emotion = list(emotions_to_labels.keys())[list(emotions_to_labels.values()).index(max_index)]
    return max_val, max_emotion

@app.route('/analyze-audio', methods=['POST'])
def analyze_audio():
    audio_file = request.files['audio']
    if audio_file:
        # Preprocess the uploaded file
        check_mel_spec = resize_extract(audio_file.filename)

        # Get the predicted emotion label
        max_val, max_emotion = get_label(check_mel_spec)

        # Return the predicted emotion as JSON
        return jsonify({'emotion': max_emotion})
    else:
        return jsonify({'error': 'Audio file not uploaded'})

if __name__ == '__main__':
    app.run(debug=True)
