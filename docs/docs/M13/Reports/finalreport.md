---
title: Public Report
sidebar_position: 1
---

## Public Report – SIMPATIA Project Module 13

The **SIMPATIA** project (System for Identification and Monitoring for Assured Protection of Workers using AI) was developed with the objective of automating the identification and monitoring of workers wearing Personal Protective Equipment (PPE) in industrial plants. Using computer vision techniques and real-time image processing, the system aims to increase safety and efficiency in Atvos' operations by reducing manual effort and improving the consistency of compliance monitoring.

For the development of first five project's Sprints, I focused on a different stage of research, implementation, and optimization of the solution.

During the first two sprints, the focus was on organizing the delivery plan and exploring the technical feasibility of the solution. This involved defining the scope of the system and researching the necessary technologies to make the project viable. Among the most important findings was the possibility of using **YOLOv8** for object detection, **OpenCV** for image capture and processing, and integrating cloud-based tools like **OneDrive**, **SharePoint**, and **Power BI** for storage and visualization. The architecture was drafted to include these tools, with emphasis on a flow that could operate in real time, from camera to alert.

In the third sprint, the development began to take shape through the research and early implementation of an **automated reporting system** and the **HikVision API integration**. Although the HikVision RTSP links were not yet accessible for live testing, work was done using local video files and webcam feeds to simulate camera input. During this time, efforts were also invested in supporting IT demands at Atvos, which delayed some development progress, but allowed for better alignment with internal systems. Tasks like model retraining were postponed to later stages in favor of progressing with architectural validation and testing.

The fourth sprint brought substantial advancements with the implementation of a **video streaming interface** using **FastAPI** and **WebSockets**. This allowed for real-time image transmission to a web interface by encoding frames in Base64. At this stage, the YOLOv8 model was integrated into the processing pipeline, allowing it to detect PPE-related objects (like “person” and “head”) and render bounding boxes over violations in real time. Although testing was still limited to local video sources, the system’s end-to-end pipeline — from video input to image visualization — was successfully validated.

In the final sprint, Sprint 5, the project reached its most complete form. The Python system was enhanced to support **multi-threaded execution**, with each camera feed processed independently in its own thread. This parallelization ensures scalability and allows for simultaneous monitoring of multiple locations without performance bottlenecks. When a PPE violation is detected — for instance, a person without a helmet — the system captures the corresponding frame, saves it with a timestamped filename (`capture_YYYYMMDD_HHMMSS.png`), and triggers a **desktop notification** using the `win11toast` library. Clicking on the notification opens the captured image for immediate review.

Captured frames are stored in a **OneDrive** folder that syncs with **SharePoint**, making them accessible to a **Power BI dashboard**. The dashboard was configured to read these images, extract the date and time metadata, and display the information in a user-friendly format. Users can filter events by day and time, view detection statistics on a graph, and see the corresponding image for each detection. This transforms a raw stream of camera feeds into structured, actionable insights for supervisors and safety managers.

Over five sprints, the SIMPATIA project evolved from a theoretical proposal to a working MVP capable of real-time detection, alerting, and reporting. The system has proven its capability to integrate with enterprise tools like OneDrive and Power BI, while maintaining the flexibility and performance of local computer vision processing.

It stands as a scalable and low-cost solution to increase safety monitoring, with potential to be expanded across multiple production units at Atvos. Future improvements include deeper integration with the HikVision camera system and retraining of the model to detect additional PPE classes such as gloves and safety vests.

---