---
title: Sprint Report - S4
sidebar_position: 2
---

# Overview

This is the report for Sprint 4 of Module 13 (M13-S4), covering the progress made on the **SIMPATIA project**, specifically on the **video streaming interface** and the integration of **computer vision** for **PPE detection**. This sprint focused on testing the streaming functionality using local video files and webcams, while preparing for future integration with the HikVision API.

## Changes from Previous Sprint

### Streaming Interface Development

The previous sprint focused on the initial setup of the streaming interface, video processing pipeline and resarch for HikVision's API integration. This sprint continued this work, refining the system to send frames via WebSockets and display them on a web interface. Additionally, the use of **YOLO** for PPE detection was integrated into the flow.

### HikVision API Integration

Although the **HikVision RTSP links** were not available for testing, we explored using local test videos (`teste1.mp4`, `teste2.mp4`) and a webcam. The integration with the HikVision API is planned for a future sprint once access is granted. The test phase helped to validate the streaming functionality in the absence of live camera feeds.

## Challenges and Delays

### Testing with Local Videos

The absence of **RTSP links** from HikVision cameras led to the use of **local video files** and **webcams** for testing. While this ensured continued progress, it limited the realism of the tests and required some workarounds in the video capture setup.

### API Integration Delays

The lack of access to the **HikVision API** meant that the integration work had to be postponed. However, preparations for this integration were made by testing the streaming and processing pipeline, allowing for smoother integration when the API becomes available.

## Next Steps

The next sprint will focus on the following:

- **HikVision API Integration**: Once access to the HikVision RTSP links is obtained, the API integration will be prioritized to enable real-time camera feed processing.
- **Optimizing Streaming Performance**: Improvements will be made to enhance the video streaming performance and the display of multiple camera feeds on the web interface.
- **Model Refinement**: Further testing will be conducted to fine-tune the **YOLO model** for better accuracy in detecting PPE.

## Summary

- **Streaming Interface**: The system was successfully set up to stream local videos and webcam feeds, with base64-encoded frames sent via WebSockets to the web interface.
- **HikVision API**: Integration work was delayed due to the unavailability of RTSP links, but groundwork was laid for future integration.
- **Testing with Local Videos**: Successful tests were conducted using local files and webcams, though future tests will rely on live camera feeds.
  
---

# SIMPATIA Streaming Interface Documentation

## Introduction

This initial implementation of the **video streaming** system aims to test the display of images from three cameras in real-time and apply the **computer vision** model for **PPE detection**.

Currently, the **RTSP links from HikVision cameras** are not available, so local videos (`teste1.mp4`, `teste2.mp4`) and a **webcam** were used for testing. Integration with the HikVision API will be done in the future.

### 1. Code Functionality

The [code](https://github.com/Inteli-College/2025-1A-T03-G34-INTERNO/blob/dev/SIMPATIA/src/interface/backend/main.py) uses **FastAPI** to create a **WebSocket server** that processes the video and sends the frames encoded in **Base64** for display in a web interface.

#### **Main Components:**
- **YOLO**: Deep learning model used to identify people and PPE.
- **OpenCV**: Library used to process the frames.
- **FastAPI + WebSockets**: For transmitting the processed frames in real time.
- **HTML + JavaScript**: Web interface to display the streams from the three cameras.

#### **System Flow:**
1. The cameras (or test videos) capture the images.
2. The YOLO model processes the frames and draws bounding boxes around the detected objects.
3. The processed frames are encoded in Base64 and sent via WebSocket.
4. The web interface receives and displays the frames to the user.

#### **Benefits of the Current Implementation:**
- **Low Initial Cost**: Does not depend on external services.
- **Full Control**: Processing and detection logic is handled internally.
- **Testing Before Integration**: Allows validation of functionality before connecting to the HikVision API.

### 2. Project Presentation Plan at Atvos

The **SIMPATIA** project is being developed internally, and in the context of Atvos, its implementation can be evaluated from different perspectives of cost and benefit:

| Solution | Description | Estimated Cost |
|----------|-------------|----------------|
| **Internal Solution (CAPEX)** | In-house development with a fixed cost for implementation and maintenance. | **Initial fixed investment** |
| **Commercial Solutions** | Commercial computer vision tools that identify and notify events automatically. | **Monthly service cost** |
| **Google Vision AI (OPEX)** | Using GCP's Vision AI for object detection in images and videos. | **Monthly or annual cost** |



#### **Implementation Plan**
1. **Initial Phase**: Use **market solutions** or **Vision AI**, if necessary, to speed up deployment.
2. **Final Phase**: Migrate to an **internal solution** after validation and refinement, ensuring better control and reduced costs in the long run.

## Conclusion

This test of the streaming interface is a **crucial step** toward integrating the computer vision system into Atvos' environment. The current implementation allows for validating the **effectiveness of the YOLO model** and ensuring that the chosen architecture is viable before full integration with the HikVision API.

The strategic plan envisions a **hybrid approach**, where external solutions can be used for a quick start, while the internal solution is enhanced to be **more economical and customizable in the long term**.

---

**Next Steps:**
- Obtain access to the **HikVision API** and integrate with the system.
- Improve the interface for displaying multiple cameras with performance optimizations.
- Test different detection models to improve PPE identification.
