import tkinter as tk
import cv2
from PIL import Image, ImageTk

width, height = 800, 600

#read webcam stream
cap = cv2.VideoCapture(0)

#modifying the frame
cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)

# Passing Root to MusicPlayer Class
root = Music_player.Tk()

# here we are binding esc with quit
root.bind('<Escape>', lambda e: root.quit())
lmain = Music_player.Label(root)
lmain.pack()

def show_frame():

    # Capture frame-by-frame
    _, frame = cap.read()

    # Using Flip code 1
    frame = cv2.flip(frame, 1)
    cv2image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGBA)
    img = Image.fromarray(cv2image)
    imgtk = ImageTk.PhotoImage(image=img)
    lmain.imgtk = imgtk
    lmain.configure(image=imgtk)
    lmain.after(10, show_frame)

show_frame()
root.mainloop()