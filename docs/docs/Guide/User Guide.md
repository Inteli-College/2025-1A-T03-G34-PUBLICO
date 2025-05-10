---
title: System Setup and User Guide
sidebar_position: 2
slug: /user-guide
---

# User Initialization and Operation Guide

Welcome to the SIMPATIA System User Guide. This guide is designed to assist operators, technicians, and safety managers in using the SIMPATIA system effectively, ensuring seamless setup, operation, and troubleshooting. 

## Purpose of This Guide

This document provides step-by-step instructions to install and run the system, understand its components, and take full advantage of its features, ensuring a safe working environment through automatic alerts and visual records.

---

## System Overview

The SIMPATIA system connects to **RTSP-enabled HikVision cameras**, uses **YOLOv8** to detect workers and PPE, and generates **notifications** and **captures** in case of PPE violations. The detections are visualized through annotated frames and saved locally for audit and analysis.

---

## Step-by-Step Initialization Guide

### 1. Prerequisites

- **Python 3.7+** installed
- Access to camera streams (RTSP URLs)
- Permissions to access system camera/mic (Windows)
- Model weights at `src/app/bin_model/best.pt`
- Required dependencies installed via:
- Camera with proper access permissions granted.

> Note: This system is optimized for Windows and uses native toast notifications (`win11toast`).

---

### 2. Folder Structure

Ensure the folder structure matches the following pattern:

```
Projeto_SIMPATIA
├── README.md
├── src
│ ├── annotations
│ ├── docs
│ ├── app
│ │ ├── bin_model
│ │ │ └── best.pt
│ │ ├── captures
│ │ │ └── capture_datetime.png
│ │ └── main.py
│ ├── features
│ ├── model_training
│ │ └── EPIs_yolo_detection_training.ipynb
│ ├── interface/backend
│ │ └── main.py
│ ├── M13_review
│ │ └── SIMPATIA Project.pdf
│ └── requirements.txt
```

### 3. Installing Dependencies

Navigate to the `src` folder and install dependencies with:

```bash
pip install -r requirements.txt
```

### 4. Running the system

Go to the src/app/ folder and execute:

```bash
python main.py
```

This script will:

- Load the YOLO model
- Connect to each RTSP camera stream
- Analyze frames in real-time
- Detect persons and missing helmets `(head)`
- Save annotated screenshots on detection
- Trigger clickable toast notifications

##  Features & Functionality

### Real-time Detection

Each frame from the cameras is analyzed using YOLO. Classes detected:

- `person` (worker)
- `head`(missing helmet)

### Smart Capture & Alerting

- Captures saved every 5 seconds if PPE violation is detected.
- Notifications displayed via Windows toast, opening the capture image on click.

### Storage Location

Captured frames are saved to:

```bash
C:/Users/BRA-UCP-SIMPATIA/OneDrive - Atvos/Documentos - EPAI/General/captures
```

### Logging

Detections are logged in `detections.log` (feature planned for future versions).

### Safety Notes

- Do not expose RTSP credentials in public or shared files.
- Ensure cameras are correctly connected and aligned.
- System should be shut down properly with CTRL+C to avoid data loss.
- Disable auto-sleep or power-saving options while the system is running.

### Tips for Best Use

- Calibrate camera angles for better visibility of helmets.
- Keep your YOLO model updated with new PPE samples for improved accuracy.
- Periodically clean up the captures/ folder to save disk space.

### Glossary

|Term|                                                 Definition|
|----|-----------------------------------------------------------|
|RTSP|Real-Time Streaming Protocol used for IP camera video feeds|
|YOLO|"You Only Look Once", a real-time object detection model   |
|PPE |Personal Protective Equipment (helmet, gloves, boots, etc.)|
|Toast|Small popup notification on Windows                       |

### Legal & Licensing

This project is intended for internal use within **Atvos**. All rights reserved. Do not redistribute or copy without authorization from the developers.

