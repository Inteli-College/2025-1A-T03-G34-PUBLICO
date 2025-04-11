---
title: Final Module 13 Report 
sidebar_position: 4
---

## Overview

The **SIMPATIA** project (System for Identification and Monitoring for Assured Protection of Workers using AI) was developed with the goal of automating the detection of PPE compliance using computer vision integrated into the Atvos environment. The following is a summary of the sprint work completed across Sprints 3, 4, and 5.

---

## Sprint 3 Summary

- Initiated **HikVision API integration** research.
- Temporarily **postponed model retraining** to focus on automation.
- Developed an early version of the **automated report acquisition** system.
- Faced time constraints due to **IT support responsibilities**.

---

## Sprint 4 Summary

- Developed the **video streaming interface** using **FastAPI + WebSockets**.
- Implemented display logic for **base64-encoded frames**.
- Integrated **YOLOv8** into the live feed for PPE detection.
- Used **local videos and webcams** in place of RTSP for testing.
- Delayed the HikVision integration pending access to RTSP links.

---

## Sprint 5 Summary

- Fully implemented **multi-threaded detection system** for RTSP streams.
- Added **real-time notifications** using `win11toast`.
- Captures are saved in **OneDrive**, synced with **SharePoint**.
- Power BI dashboard integrates with these images via ETL.
- Filters by date/time, displays detections and images, includes event counter chart.

---

## Technical Stack

- **YOLOv8 + OpenCV** for detection  
- **Python (multithreading + FastAPI)**  
- **win11toast** for Windows notifications  
- **OneDrive + SharePoint** for image sync  
- **Power BI** for interactive reporting  

---

## Results

- MVP working with real detection pipeline  
- Alerts and logs successfully sent to Power BI  
- Prepared for deployment in production with actual RTSP cameras  

---