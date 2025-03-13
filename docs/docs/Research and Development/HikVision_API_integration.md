---
title: "HikVision API Integration"
sidebar_position: 1
---

## HikVision API Integration initial research

## Introduction
The integration of the HikVision API allows security cameras to connect to **HikCentral Professional (HCP)** and implement advanced functionalities such as automatic event detection and notification sending. This research presents a possible solution to capture images via **RTSP**, process them with a **YOLO computer vision model**, and send alerts to HikCentral when a worker without a helmet is detected.

---

## HikVision API Installation and Configuration
According to the document **[Installation and Configuration Tutorial for 'Open API' and Integration with 'HikCentral Professional'](../../static/HikVision_Api_Integration.pdf)**, the following steps are required to configure the API:

### 1. Prerequisites
Before starting the integration, ensure that:
- **HikCentral Professional (HCP)** is installed in version **1.5 or higher**.
- The HCP license includes the third-party integration feature.
- The OpenAPI is enabled in the HCP configuration panel.

### 2. OpenAPI Configuration
1. Access **HikCentral Professional** via Web Client.
2. Go to **System → Third Party Integration** and enable the **OpenAPI** option.
3. Set the service IP (default `127.0.0.1` if on the same server).
4. Access the API at `https://127.0.0.1/artemis-web` with username `admin@123` and change the password.
5. Register a partner and obtain the **AppKey** and **AppSecret** credentials.

---

## Image Capture via RTSP
The following code captures images directly from the HikVision camera RTSP stream:

```python
import cv2

rtsp_url = "rtsp://user:password@CAMERA_IP:554/Streaming/Channels/1"
cap = cv2.VideoCapture(rtsp_url)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow("Stream", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

---

## Helmet Detection with YOLO

To identify workers without helmets, we use a trained YOLO model:

```python
from ultralytics import YOLO

# Load YOLO model
model = YOLO("modelo_epi.pt")

def detect_ppe(frame):
    results = model(frame)
    for result in results:
        for box in result.boxes:
            if box.cls == "no_helmet":
                return True
    return False
```

---

## Sending Notification to HikCentral

When a worker without a helmet is identified, an alert will be sent to HikCentral via OpenAPI:

```python
import requests

HCP_URL = "https://HCP_SERVER_IP/artemis/api/v1/alarms"
APP_KEY = "your_app_key"
APP_SECRET = "your_app_secret"

def send_alert():
    headers = {
        "AppKey": APP_KEY,
        "AppSecret": APP_SECRET,
        "Content-Type": "application/json"
    }
    payload = {
        "alarmType": "No_Helmet_Detected",
        "cameraID": "CAMERA_ID",
        "timestamp": "2025-03-13T12:00:00Z",
        "description": "Worker without a helmet detected."
    }
    response = requests.post(HCP_URL, json=payload, headers=headers, verify=False)
    print("Alert sent:", response.status_code)
```

---

## Main Application Loop

```python
while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    if detect_ppe(frame):
        send_alert()
    
    cv2.imshow("Stream", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

---

## Conclusion
This research and development hypothesis will enable HikVision cameras to transmit images to an intelligent monitoring system based on **computer vision**. Upon detecting workers without helmets, the system will automatically notify **HikCentral Professional**, allowing for a quick response and improving workplace safety.