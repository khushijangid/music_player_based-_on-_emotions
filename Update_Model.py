import numpy as np
import cv2
import glob
import random

#using fisherface method for face recognition
fishface=cv2.face.FisherFaceRecognizer_create()
data={}

def update(emotions):
    run_recognizer(emotions)
    print("Saving model...")
    fishface.save("model.xml")
    print("Model saved!!")

def make_sets(emotions):
    training_data=[]
    training_label=[]

    for emotion in emotions:
        training=training=sorted(glob.glob("dataset/%s/*" %emotion))
        for item in training:
            # reads frames from a camera
            image=cv2.imread(item)

            # convert to gray scale of each frames
            gray=cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

            #training the data
            training_data.append(gray)
            training_label.append(emotions.index(emotion))
    return training_data, training_label

def run_recognizer(emotions):
    training_data, training_label=make_sets(emotions)
    print("Training model...")
    print("The size of the dataset is "+str(len(training_data))+" images")
    fishface.train(training_data, np.asarray(training_label))

