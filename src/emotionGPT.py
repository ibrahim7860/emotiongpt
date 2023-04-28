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
#from google.colab import drive
# need to install stuff for mia's portion
from transformers import WhisperProcessor, WhisperForConditionalGeneration
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# connect to google drive for now, won't need when proper connect
#drive.mount('/content/gdrive')


# setup directory
#path = "/content/gdrive/MyDrive/Kaggle"

#os.environ['KAGGLE_CONFIG_DIR'] = path
#os.chdir(path)

# basic setup
emotions_to_labels = {'angry':0, 'disgust':1, 'fear':2, 'happy':3, 'neutral':4, 'sad':5, 'pleasant':6}
labels_to_emot = {v: k for k, v in emotions_to_labels.items()}  # wanted bidirectional mapping, this was an easy thing to do

''' 
df: btw there is 14 subfolders for this dataset each with 200 entries.
The order is the older actress w/ each 7 emotions then the younger one.
i.e. OAF_Fear, OAF_Pleasant, ..., OAF_neutral, YAF_angry, ..., YAF_sad)
'''

# load model info
model = tf.keras.models.load_model('emotionGPT model.h5')
train_history = np.load('emotionGPT history.npy',allow_pickle='TRUE').item()


# mia's portion: speech to text
# load model and processor
processor = WhisperProcessor.from_pretrained("openai/whisper-tiny.en")
s2tmodel = WhisperForConditionalGeneration.from_pretrained("openai/whisper-tiny.en")

# S2T prediction model
tokenizer = AutoTokenizer.from_pretrained("joeddav/distilbert-base-uncased-go-emotions-student")
txt_model = AutoModelForSequenceClassification.from_pretrained("joeddav/distilbert-base-uncased-go-emotions-student")

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
    
'''
takes in wav file & sampling rate
extracts spectrogram features
outputs resized information
'''
def resize_extract(check_audio, check_sr = None):
  # Extract Mel spectrogram features
  check_mel_spec = librosa.feature.melspectrogram(y=check_audio, sr=check_sr, n_fft=2048, hop_length=512, n_mels=128)
  check_mel_spec = librosa.power_to_db(check_mel_spec, ref=np.max)
  # Resize to 128x128
  check_mel_spec.resize((128,128), refcheck=False)
  # Resize for model
  check_mel_spec = check_mel_spec.reshape(-1,128,128,1)
  return check_mel_spec


'''
takes spectrogram feature & output label information
'''
def get_label(check_mel_spec):
  result = model.predict(check_mel_spec)
  prob_arr = np.array(result)
  np.set_printoptions(precision=10, suppress=True)
  max_val = np.max(prob_arr)
  max_index = np.argmax(prob_arr)
  max_emotion = list(emotions_to_labels.keys())[list(emotions_to_labels.values()).index(max_index)]
  if(max_emotion == 'pleasant'):
    max_emotion = 'pleasant surprise'
  return max_val, max_emotion

'''
needs wav file & sampling rate
outputs transcription of speech
'''
def transcript(trans_audio, trans_sr = 16000):
    input_features = processor(trans_audio, sampling_rate=trans_sr, return_tensors="pt").input_features 

    # generate token ids
    predicted_ids = s2tmodel.generate(input_features)
    # decode token ids to text
    transcription = processor.batch_decode(predicted_ids, skip_special_tokens=False)
    transcription = processor.batch_decode(predicted_ids, skip_special_tokens=True)
    
    return transcription

def text_label(text):
  tok = tokenizer(text, return_tensors="pt")
  with torch.no_grad(): logits = txt_model(**tok)["logits"]
  choosen_emotions = ["anger", "disgust", "fear", "sadness", "surprise", "neutral", "joy"]
  choosen_emotions_ids = list(map(txt_model.config.label2id.get, choosen_emotions)); choosen_emotions_ids
  filtered_logits = logits[:, choosen_emotions_ids]; filtered_logits
  probs = torch.softmax(filtered_logits, dim=-1)
  classification = {choosen_emotions[i]: probs[0, i].item() for i in range(probs.size(-1))}
  pred = choosen_emotions[int(torch.argmax(probs).item())]
  return pred, classification


def compare_emotion(text,spec,text_acc,spec_acc):
   if text == spec :
      return spec
   if text_acc >spec_acc:
      return text 
   else:
     return spec
   
# how output & stuff works
# test is wav file path
test = 'angry.wav'   
# test_audio is a wav file, test_sr is the sampling rate (you can ignore this)
test_audio, test_sr = librosa.load(test, sr=None, mono=True)
# need both below functions
test_mel_spec = resize_extract(test_audio, test_sr)
probability, emotion_label = get_label(test_mel_spec)
# mia's s2t prediction (obviously the dataset doesn't really do anything for this)
test_text = transcript(test_audio)
test_text_label, test_text_class = text_label(test_text)
# output for s2t
print(f"Your speech was identified as: '{test_text}'")
print(f"The largest number is: {probability}")
print(f"Corresponding emotion is '{emotion_label}'")
print(f"Mia prediction: '{test_text_label}'")
print(f"Mia prediction probability: '{test_text_class[test_text_label]}'")
result = compare_emotion(test_text_label,emotion_label,test_text_class[test_text_label], probability)
print(f"the emotion is : '{result}'" )