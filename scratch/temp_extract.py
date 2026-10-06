
import cv2, sys
cap = cv2.VideoCapture(r"C:/Users/BBB/Desktop/crewmind/src/assets/crewmind/videos/herovideo.mp4")
ret, frame = cap.read()
if ret:
    cv2.imwrite(r"C:/Users/BBB/Desktop/crewmind/src/assets/crewmind/hero/hero-placeholder-pc.png", frame)
    cv2.imwrite(r"C:/Users/BBB/Desktop/crewmind/src/assets/crewmind/hero/hero-placeholder-mob.jpeg", frame)
    print("Python cv2 success!")
else:
    print("Could not read frame")
    sys.exit(1)
cap.release()
