# -*- coding: utf-8 -*-
"""
Created on Wed Apr 26 19:55:07 2023

@author: djjon
"""

import numpy as np
import pandas as pd
import os
import seaborn as sns
import matplotlib.pyplot as plt
import librosa
import librosa.display
import tensorflow as tf
from tqdm import tqdm
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Conv2D, MaxPooling2D, Flatten, Dropout
from sklearn.model_selection import train_test_split
from IPython.display import Audio
import warnings
# don't need maybe
from google.colab import drive


# connect to google drive for now, won't need when proper connect
drive.mount('/content/gdrive')


# setup directory
path = "/content/gdrive/MyDrive/Kaggle"

os.environ['KAGGLE_CONFIG_DIR'] = path
os.chdir(path)

# basic setup
emotions_to_labels = {'angry':0, 'disgust':1, 'fear':2, 'happy':3, 'neutral':4, 'sad':5, 'pleasant':6}
labels_to_emot = {v: k for k, v in emotions_to_labels.items()}  # wanted bidirectional mapping, this was an easy thing to do
spects_feature_np = np.load("Spectrogram Features.npy")
data_labels_np = np.load("Data Labels.npy")
df = pd.read_pickle('Dataframe.csv')

''' 
df: btw there is 14 subfolders for this dataset each with 200 entries.
The order is the older actress w/ each 7 emotions then the younger one.
i.e. OAF_Fear, OAF_Pleasant, ..., OAF_neutral, YAF_angry, ..., YAF_sad)
'''

# load model info
model = tf.keras.models.load_model('emotionGPT model.h5')
train_history = np.load('emotionGPT history.npy',allow_pickle='TRUE').item()

#


# pretty display functions using nice librosa plots
def waveplot(data, sr, emotion):
    plt.figure(figsize=(10,4))
    plt.title(emotion, size=20)
    librosa.display.waveshow(data, sr=sr)
    plt.show()
    
def spectogram(data, sr, emotion):
     x = librosa.stft(data)
     xdb = librosa.amplitude_to_db(abs(x))
     plt.figure(figsize=(11,4))
     plt.title(emotion, size=20)
     librosa.display.specshow(xdb, sr=sr, x_axis='time', y_axis='hz')
     plt.colorbar()
     
# plots training_history of model
def plot_model(train_history):
    plt.plot(train_history['val_accuracy'])
    plt.plot(train_history['accuracy'])
    plt.title('emotionGPT Accuracy')
    plt.ylabel('Accuracy')
    plt.xlabel('Epoch #')
    plt.legend(['Train', 'Test'], loc='upper left')
    plt.show()
    
# extract the feature of an audio file & resize it for the model
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


# gets label from spectrogram input
def get_label(check_mel_spec):
  result = model.predict(check_mel_spec)
  prob_arr = np.array(result)
  np.set_printoptions(precision=10, suppress=True)
  max_val = np.max(prob_arr)
  max_index = np.argmax(prob_arr)
  max_emotion = list(emotions_to_labels.keys())[list(emotions_to_labels.values()).index(max_index)]
  return max_val, max_emotion


# how output & stuff works
test = df['speech'][1200]
test_mel_spec = resize_extract(test)
probability, emotion_label = get_label(test_mel_spec)
print(f"The largest number is: {probability}")
print(f"Corresponding emotion is '{emotion_label}'")