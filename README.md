## EmotionGPT
EmotionGPT is a machine learning model that predicts the emotion conveyed in an audio file using a convolutional neural network (CNN) model. The model is trained on a dataset of speech samples from the TESS dataset available on Kaggle. The application uses ReactJS for the frontend and Python with Flask for the backend.

## Requirements
To run EmotionGPT, you will need the following libraries:

- Python 3.6+  
- librosa 0.8.1  
- numpy 1.19.5  
- tensorflow 2.4.0  
- Flask 1.1.2  
- keras 2.4.0/2.4.3

## Usage
1. Clone the repository: 
```
git clone https://github.com/emotiongpt.git
```
2. Install the required libraries:
```
pip install librosa numpy tensorflow Flask keras
```
3. Install ffmpeg from their official website: https://ffmpeg.org/download.html
4. Navigate to package.json and make sure that under `````"private": "true",````` there is `````"proxy": "http://127.0.0.1:5000",`````
   1. If this does not work when inputting audio files, then change it to `````"proxy": "http://localhost:5000",`````
5. Run the React app
```
npm start
```
5. Run the Flask app:
```
cd backend
python server.py
```

## Model Training
The CNN model was trained using Keras with TensorFlow as the backend. We used the Toronto Emotional Speech Set (TESS) dataset from Kaggle, which contains audio recordings of actors speaking different emotions, which were preprocessed using the librosa library to extract Mel spectrogram features.

## Frontend
The EmotionGPT frontend was built using ReactJS, a JavaScript library for building user interfaces. The user can upload an audio file and the frontend sends a POST request to the backend with the audio file. Once the backend has processed the audio file, the predicted emotion is returned to the frontend and displayed to the user.

## Backend
The EmotionGPT backend was built using Python with Flask, a micro web framework. The backend receives the audio file from the frontend, processes the file using the Librosa library, and passes the preprocessed file to the trained CNN model. The model returns the predicted emotion, which is then sent back to the frontend.

