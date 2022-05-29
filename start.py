import cv2
import argparse
import time
import os
import Update_Model
import glob
import random
import eel


frequency=2500
duration=1000

eel.init('webd')
emotions=["angry", "happy", "sad", "neutral"]
fishface = cv2.face.FisherFaceRecognizer_create()
font = cv2.FONT_HERSHEY_SIMPLEX

# constructing the argument parse and parse the arguments
parser=argparse.ArgumentParser(description="Options for emotions based music player(Updating the model)")
parser.add_argument("--update", help="Call for taking new images and retraining the model.", action="store_true")
args=parser.parse_args()
facedict={}

#read webcam stream
video_capture=cv2.VideoCapture(0)

# Load the cascade
facecascade=cv2.CascadeClassifier("haarcascade_frontalface_default.xml")
def crop(clahe_image, face):
    for (x, y, w, h) in face:
        faceslice=clahe_image[y:y+h, x:x+w]
        faceslice=cv2.resize(faceslice, (350, 350))
        facedict["face%s" %(len(facedict)+1)]=faceslice
    return faceslice

def grab_face():
    ret, frame=video_capture.read()

    # save image
    #if the imwrite() function returns the True, which means the file is successfully written in the specified file.
    cv2.imwrite('test.jpg', frame)
    cv2.imwrite("images/main%s.jpg" %count, frame)

    # read image as grey scale
    gray=cv2.imread('test.jpg',0)

    # The declaration of CLAHE
    # clipLimit -> Threshold for contrast limiting
    clahe=cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
    clahe_image=clahe.apply(gray)
    return clahe_image

def detect_face():
    clahe_image=grab_face()

    # Applying the face detection method on the grayscale image
    face=facecascade.detectMultiScale(clahe_image, scaleFactor=1.1, minNeighbors=15, minSize=(10, 10), flags=cv2.CASCADE_SCALE_IMAGE)
    if len(face)>=1:
        faceslice=crop(clahe_image, face)
        #return faceslice
    else:
        print("No multiple faces detected! Passing over the frame")

def save_face(emotion):
    print("\n\nLook "+emotion+" until the timer expires and keep the same emotion for some time.")

    print('\a')


    for i in range(0, 5):
        print(5-i)
        time.sleep(1)

    while len(facedict.keys())<16:
        detect_face()

    for i in facedict.keys():
        path, dirs, files = next(os.walk("dataset/%s" %emotion))
        file_count = len(files)+1

        # insert faces to database collection
        cv2.imwrite("dataset/%s/%s.jpg" %(emotion, (file_count)), facedict[i])
    facedict.clear()


#model updation
def update_model(emotions):
    print("Mode:Update for model is ready")
    checkForFolders(emotions)

    for i in range(0, len(emotions)):
        save_face(emotions[i])
    print("Collected the images, looking nice! Now its updating the model...")
    Update_Model.update(emotions)
    print("Model trained successful!!")

def checkForFolders(emotions):
    for emotion in emotions:
        if os.path.exists("dataset/%s" %emotion): #path
            pass
        else:
            # Create the directory
            os.makedirs("dataset/%s" %emotion)

def identify_emotions():
    prediction=[]
    confidence=[]

    for i in facedict.keys():
        pred, conf=fishface.predict(facedict[i])
        cv2.imwrite("images/%s.jpg" %i, facedict[i])
        prediction.append(pred)
        confidence.append(conf)
    output=emotions[max(set(prediction), key=prediction.count)]
    print("It looks like you're %s" %output)
    facedict.clear() #clear directory
    return output;

count=0
@eel.expose

def getEmotion():

    count=0
    while True:
        count=count+1
        detect_face()
        if args.update:
            update_model(emotions)
            break
        elif count==10:
            fishface.read("model.xml")
            return identify_emotions()
            break


eel.start('main.html')
#//webd//main.html


